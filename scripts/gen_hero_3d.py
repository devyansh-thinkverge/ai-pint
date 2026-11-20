"""Generate the cinematic 3D-render cut/reveal scene for the AI Taproom hero."""
import asyncio
import base64
import os
import sys

from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

OUT = "/app/frontend/public/hero-3d-render.png"

PROMPT = (
    "Cinematic 3D octane render, wide 16:9 composition of a moody premium craft-beer "
    "taproom at night before guests arrive. Dark espresso-brown and charcoal interior, "
    "warm amber and gold neon light strips along shelves of bottles, a single glossy "
    "amber beer pint glowing on a dark walnut bar counter in the foreground. Soft "
    "holographic neural-network nodes and faint golden data threads hover in the air "
    "above the bar like a constellation. Shallow depth of field, volumetric light rays, "
    "deep black shadows, subtle film grain, luxurious corporate atmosphere, photoreal "
    "CGI render quality. The right side of the frame is darker and empty, ideal for "
    "white text overlay. No people, no text, no logos."
)


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        print("FAIL: EMERGENT_LLM_KEY missing")
        sys.exit(1)

    chat = LlmChat(
        api_key=api_key,
        session_id="hero-3d-render-gen",
        system_message="You generate cinematic 3D rendered scene graphics.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"]
    )

    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if text:
        print(f"Model note: {text[:120]}")
    if not images:
        print("FAIL: no images returned")
        sys.exit(1)

    image_bytes = base64.b64decode(images[0]["data"])
    with open(OUT, "wb") as f:
        f.write(image_bytes)
    print(f"OK: saved {len(image_bytes)} bytes -> {OUT} ({images[0]['mime_type']})")


asyncio.run(main())
