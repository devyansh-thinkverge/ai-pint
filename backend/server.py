import asyncio
import logging
import os
import re
import uuid
from contextlib import suppress
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING, IndexModel
from pydantic import BaseModel, Field, ConfigDict
from starlette.middleware.cors import CORSMiddleware

try:
    import razorpay
except ImportError:
    razorpay = None

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
    "payments": [
        IndexModel([("order_id", ASCENDING)], name="order_id", unique=True),
    ],
}

SEED_EVENT = {
    "id": "agentic-ai-gurugram-dec19",
    "title": "Agentic AI: Trust, Control & Scale",
    "venue": "Diablo, CyberHub Gurugram",
    "city": "Delhi NCR",
    "date_label": "Fri, 19 December",
    "time_label": "6:00 PM – 8:00 PM",
    "price": 0,
    "speaker": {
        "name": "Sachin Arora",
        "role": "Partner & Head of iDAC — Intelligent Data, Agents & Cloud",
        "company": "PwC India",
        "bio": (
            "23+ years across Yahoo, Oracle, AWS and KPMG — and now Partner at "
            "PwC India, where he heads iDAC: Intelligent Data, Agents & Cloud. "
            "Sachin helps India's largest enterprises move from AI pilots to "
            "agentic systems that actually run the business — with the context "
            "engineering, architecture and governance to keep them trustworthy. "
            "Exactly the ground tonight's talk covers."
        ),
        "image": "/speaker-sachin-arora.jpg",
        "linkedin_url": "https://www.linkedin.com/in/sacarora/",
    },
    "venue_details": {
        "name": "Diablo",
        "tagline": "Mediterranean rooftop restobar at DLF CyberHub",
        "address": (
            "Units 209B–210, 2nd Floor, DLF Cyber Hub, DLF Cyber City, "
            "Sector 24, Gurugram, Haryana 122002"
        ),
        "description": (
            "A Mediterranean-inspired rooftop restobar overlooking the DLF "
            "CyberHub plaza — warm wood, glowing lights and Bent Chair décor, "
            "with globally-inspired plates, signature cocktails and live music "
            "after dark. Our evening takes over the terrace: doors at 6 PM, "
            "the first pint is on us."
        ),
        "image": "/venue-diablo-cyberhub.jpg",
        "instagram_url": "https://www.instagram.com/diablocyberhub/",
        "maps_url": "https://www.google.com/maps/search/?api=1&query=Diablo%20CyberHub%20Gurugram",
    },
}

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

_rzp_client = None


def rzp_client():
    global _rzp_client
    key_id = os.environ.get("RAZORPAY_KEY_ID", "")
    key_secret = os.environ.get("RAZORPAY_KEY_SECRET", "")
    if not key_id or not key_secret or razorpay is None:
        return None
    if _rzp_client is None:
        _rzp_client = razorpay.Client(auth=(key_id, key_secret))
    return _rzp_client


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logging.getLogger(__name__).error("ensure_indexes(%s): %s", collection, exc)


async def seed_events() -> None:
    seed = dict(SEED_EVENT)
    seed["whatsapp_url"] = os.environ.get("WHATSAPP_GROUP_URL", "")
    try:
        await db.events.update_one(
            {"id": seed["id"]},
            {"$set": {k: v for k, v in seed.items()}},
            upsert=True,
        )
        logging.getLogger(__name__).info("seeded event %s", seed["id"])
    except Exception as exc:
        logging.getLogger(__name__).error("seed_events: %s", exc)


app = FastAPI()
api_router = APIRouter(prefix="/api")


class WaitlistEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str = ""
    bio: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class WaitlistCreate(BaseModel):
    name: str
    email: str
    company: str = ""
    bio: str = ""


class Event(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    title: str
    venue: str
    city: str
    date_label: str
    time_label: str
    price: int = 0
    whatsapp_url: str = ""
    speaker: Optional[dict] = None
    venue_details: Optional[dict] = None


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_id: str
    name: str
    email: str
    company: str = ""
    bio: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class BookingCreate(BaseModel):
    event_id: str
    name: str
    email: str
    company: str = ""
    bio: str = ""


class PaymentOrderCreate(BaseModel):
    event_id: str
    name: str = ""
    email: str


class PaymentVerify(BaseModel):
    order_id: str
    payment_id: str
    signature: str


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


@api_router.get("/")
async def root():
    return {"message": "AI Taproom API"}


@api_router.post("/waitlist", response_model=WaitlistEntry)
async def join_waitlist(input: WaitlistCreate):
    name = input.name.strip()
    email = input.email.strip().lower()
    if not name:
        raise HTTPException(status_code=400, detail="Please enter your name.")
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")

    entry = WaitlistEntry(name=name, email=email, company=input.company.strip(), bio=input.bio.strip())
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
    return await db.events.find({}, {"_id": 0}).sort("created_at", ASCENDING).to_list(50)


@api_router.get("/events/{event_id}")
async def get_event(event_id: str):
    doc = await db.events.find_one({"id": event_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Event not found.")
    return doc


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
        company=input.company.strip(),
        bio=input.bio.strip(),
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


@api_router.post("/payments/order")
async def create_payment_order(input: PaymentOrderCreate):
    client = rzp_client()
    if not client:
        raise HTTPException(status_code=503, detail="Payments are not configured yet.")

    email = input.email.strip().lower()
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")

    event = await db.events.find_one({"id": input.event_id}, {"_id": 0})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")

    price = int(event.get("price") or 0)
    if price <= 0:
        raise HTTPException(status_code=400, detail="This event is free — no payment needed.")

    order = client.order.create({
        "amount": price,
        "currency": "INR",
        "receipt": f"{input.event_id[:24]}-{uuid.uuid4().hex[:8]}",
        "payment_capture": 1,
    })
    await db.payments.insert_one({
        "order_id": order["id"],
        "event_id": input.event_id,
        "name": input.name.strip(),
        "email": email,
        "amount": price,
        "status": "created",
        "created_at": now_iso(),
    })
    return {
        "order_id": order["id"],
        "amount": order["amount"],
        "currency": "INR",
        "key_id": os.environ.get("RAZORPAY_KEY_ID", ""),
        "event": event,
    }


@api_router.post("/payments/verify")
async def verify_payment(input: PaymentVerify):
    client = rzp_client()
    if not client:
        raise HTTPException(status_code=503, detail="Payments are not configured yet.")
    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": input.order_id,
            "razorpay_payment_id": input.payment_id,
            "razorpay_signature": input.signature,
        })
    except Exception:
        raise HTTPException(status_code=400, detail="Payment signature verification failed.")

    await db.payments.update_one(
        {"order_id": input.order_id},
        {"$set": {"status": "paid", "payment_id": input.payment_id}},
    )
    return {"status": "paid"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)


@app.on_event("startup")
async def start_index_build():
    app.state.index_task = asyncio.create_task(ensure_indexes())
    app.state.seed_task = asyncio.create_task(seed_events())


@app.on_event("shutdown")
async def shutdown_db_client():
    app.state.index_task.cancel()
    app.state.seed_task.cancel()
    with suppress(asyncio.CancelledError):
        await app.state.index_task
        await app.state.seed_task
    client.close()
