"""Backend API tests for AI Taproom: waitlist, bookings, events."""
import os
import uuid
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fallback to frontend/.env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL"):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


def test_events_list(client):
    r = client.get(f"{API}/events")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)


def test_waitlist_success(client):
    unique = uuid.uuid4().hex[:8]
    payload = {
        "name": f"TEST_User_{unique}",
        "email": f"TEST_{unique}@example.com",
        "company": "TestCo",
        "bio": "testing scroll cut hero",
    }
    r = client.post(f"{API}/waitlist", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["email"] == payload["email"].lower()
    assert data["name"] == payload["name"]
    assert "id" in data


def test_waitlist_invalid_email(client):
    r = client.post(f"{API}/waitlist", json={"name": "TEST_x", "email": "notanemail"})
    assert r.status_code == 400


def test_waitlist_missing_name(client):
    r = client.post(f"{API}/waitlist", json={"name": "   ", "email": f"TEST_{uuid.uuid4().hex[:6]}@example.com"})
    assert r.status_code == 400


def test_waitlist_count(client):
    r = client.get(f"{API}/waitlist/count")
    assert r.status_code == 200
    assert isinstance(r.json().get("count"), int)


def test_booking_success(client):
    # find an event
    events = client.get(f"{API}/events").json()
    if not events:
        pytest.skip("No events seeded")
    event_id = events[0]["id"]
    unique = uuid.uuid4().hex[:8]
    payload = {
        "event_id": event_id,
        "name": f"TEST_Booker_{unique}",
        "email": f"TEST_book_{unique}@example.com",
        "company": "TestCo",
        "bio": "",
    }
    r = client.post(f"{API}/bookings", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "booking" in data
    assert data["booking"]["email"] == payload["email"].lower()
    assert "whatsapp_url" in data


def test_booking_event_not_found(client):
    r = client.post(f"{API}/bookings", json={
        "event_id": "nonexistent-xyz",
        "name": "TEST_x",
        "email": "TEST_a@example.com",
    })
    assert r.status_code == 404


def test_booking_invalid_email(client):
    events = client.get(f"{API}/events").json()
    if not events:
        pytest.skip("No events seeded")
    r = client.post(f"{API}/bookings", json={
        "event_id": events[0]["id"],
        "name": "TEST_x",
        "email": "bademail",
    })
    assert r.status_code == 400
