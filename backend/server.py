import asyncio
import logging
import os
import re
import uuid
from contextlib import suppress
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING, IndexModel
from pydantic import BaseModel, Field, ConfigDict
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

INDEXES: dict[str, list[IndexModel]] = {
    "waitlist": [
        IndexModel([("email", ASCENDING)], name="email", unique=True),
        IndexModel([("created_at", DESCENDING)], name="created_at_desc"),
    ],
    "events": [
        IndexModel([("id", ASCENDING)], name="event_id", unique=True),
    ],
    "bookings": [
        IndexModel([("event_id", ASCENDING), ("email", ASCENDING)], name="event_email", unique=True),
    ],
}

SEED_EVENT = {
    "id": "agentic-ai-gurugram-dec19",
    "title": "Agentic AI: Trust, Control & Scale",
    "venue": "CyberHub, Gurugram",
    "city": "Delhi NCR",
    "date_label": "Fri, 19 December",
    "time_label": "6:00 PM – 8:00 PM",
    "whatsapp_url": os.environ.get("WHATSAPP_GROUP_URL", ""),
}

VALID_ROLES = {"corporate", "speaker", "member"}
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logging.getLogger(__name__).error("ensure_indexes(%s): %s", collection, exc)


app = FastAPI()
api_router = APIRouter(prefix="/api")


class WaitlistEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    role: str = "member"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class WaitlistCreate(BaseModel):
    email: str
    role: str = "member"


class Event(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    title: str
    venue: str
    city: str
    date_label: str
    time_label: str
    whatsapp_url: str = ""


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_id: str
    name: str
    email: str
    phone: str = ""
    company: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class BookingCreate(BaseModel):
    event_id: str
    name: str
    email: str
    phone: str = ""
    company: str = ""


@api_router.get("/")
async def root():
    return {"message": "AI Taproom API"}


@api_router.post("/waitlist", response_model=WaitlistEntry)
async def join_waitlist(input: WaitlistCreate):
    email = input.email.strip().lower()
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")
    if input.role not in VALID_ROLES:
        raise HTTPException(status_code=400, detail="Please choose who you are.")

    entry = WaitlistEntry(email=email, role=input.role)
    try:
        await db.waitlist.insert_one(entry.model_dump())
    except Exception as exc:
        if "E11000" in str(exc):
            raise HTTPException(status_code=409, detail="You're already on the list — cheers!")
        raise
    return entry


@api_router.get("/waitlist/count")
async def waitlist_count():
    return {"count": await db.waitlist.count_documents({})}


@api_router.get("/events")
async def list_events():
    docs = await db.events.find({}, {"_id": 0}).sort("created_at", ASCENDING).to_list(50)
    return docs


@api_router.post("/bookings")
async def create_booking(input: BookingCreate):
    name = input.name.strip()
    email = input.email.strip().lower()
    if not name:
        raise HTTPException(status_code=400, detail="Please enter your name.")
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")

    event = await db.events.find_one({"id": input.event_id}, {"_id": 0})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")

    booking = Booking(
        event_id=input.event_id,
        name=name,
        email=email,
        phone=input.phone.strip(),
        company=input.company.strip(),
    )
    try:
        await db.bookings.insert_one(booking.model_dump())
    except Exception as exc:
        if "E11000" in str(exc):
            raise HTTPException(
                status_code=409,
                detail="You've already booked this event — see you there!",
            )
        raise

    return {"booking": booking, "whatsapp_url": (event.get("whatsapp_url") or "").strip()}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)


async def seed_events() -> None:
    seed = dict(SEED_EVENT)
    whatsapp = os.environ.get("WHATSAPP_GROUP_URL", "")
    if whatsapp:
        seed["whatsapp_url"] = whatsapp
    try:
        await db.events.update_one(
            {"id": seed["id"]},
            {
                "$setOnInsert": {k: v for k, v in seed.items() if k != "whatsapp_url"},
                "$set": {"whatsapp_url": seed["whatsapp_url"]},
            },
            upsert=True,
        )
        logging.getLogger(__name__).info("seeded event %s", seed["id"])
    except Exception as exc:
        logging.getLogger(__name__).error("seed_events: %s", exc)


@app.on_event("startup")
async def start_index_build():
    app.state.index_task = asyncio.create_task(ensure_indexes())
    app.state.seed_task = asyncio.create_task(seed_events())


@app.on_event("shutdown")
async def shutdown_db_client():
    app.state.index_task.cancel()
    with suppress(asyncio.CancelledError):
        await app.state.index_task
    client.close()
