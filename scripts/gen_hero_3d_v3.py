"""V3: vibrant high-res 3D-render scene, strictly NO text in frame."""
import asyncio
import base64
import io
import os
import sys

from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage
from PIL import Image, ImageEnhance, ImageFilter

load_dotenv("/app/backend/.env")

PROMPT = (
    "Ultra-detailed cinematic 3D octane render, vibrant 16:9 widescreen shot of a "
    "premium craft-beer taproom at night. Rich saturated colors: deep espresso-brown "
    "and charcoal interior glowing with brilliant amber and gold neon light strips, "
    "a luminous golden pint of beer with thick foam on a dark walnut bar counter in "
    "the foreground, a vivid golden constellation of neural-network nodes and glowing "
    "light threads floating in the air above the bar, warm copper pendant lamps, "
    "electric amber highlights on glassware, dark leather and wood lounge seating in "
    "the soft-blurred background. High contrast, sharp focus, crisp textures, "
    "volumetric light rays, luxurious atmosphere, photoreal CGI render quality. "
    "Absolutely no text, no letters, no words, no signs, no chalkboards, no menus, "
    "no typography, no watermarks, no logos, no people anywhere in the scene."
)


def postprocess(raw: bytes, out_path: str):
    img = Image.open(io.BytesIO(raw)).convert("RGB")
    img = img.resize((2560, int(2560 * img.height / img.width)), Image.LANCZOS)
    img = ImageEnhance.Color(img).enhance(1.2)
    img = ImageEnhance.Contrast(img).enhance(1.06)
    img = ImageEnhance.Brightness(img).enhance(1.04)
    img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=85, threshold=2))
    img.save(out_path, "JPEG", quality=92, optimize=True)
    print(f"OK: {out_path} size={img.size}")


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        print("FAIL: EMERGENT_LLM_KEY missing")
        sys.exit(1)

    for i in range(2):
        try:
            chat = LlmChat(
                api_key=api_key,
                session_id=f"hero-3d-vibrant-v3-{i}",
                system_message="You generate cinematic 3D rendered scene graphics.",
            )
            chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
                modalities=["image", "text"]
            )
            _, images = await chat.send_message_multimodal_response(
                UserMessage(text=PROMPT)
            )
            if not images:
                print(f"[{i}] FAIL: no image returned")
                continue
            postprocess(base64.b64decode(images[0]["data"]), f"/app/frontend/public/hero-3d-v3-{i}.jpg")
        except Exception as exc:
            print(f"[{i}] ERROR: {type(exc).__name__}: {str(exc)[:200]}")


asyncio.run(main())
