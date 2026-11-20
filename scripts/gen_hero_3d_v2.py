"""V2: vibrant, high-resolution 3D-render cut/reveal scene for the AI Taproom hero."""
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
    "light threads floating above the bar, warm copper rim lighting, electric amber "
    "highlights on glassware. High contrast, sharp focus, crisp textures, volumetric "
    "light rays, luxurious corporate atmosphere, photoreal CGI render quality. The "
    "right third of the frame is darker, ideal for white text overlay. No people, "
    "no text, no logos. 4K resolution, ultra sharp."
)

OUT_DIR = "/app/frontend/public"


def postprocess(raw: bytes, out_path: str):
    """Boost vibrancy/sharpness, upscale to 2560w, save high-quality JPEG."""
    img = Image.open(io.BytesIO(raw)).convert("RGB")
    img = img.resize((2560, int(2560 * img.height / img.width)), Image.LANCZOS)
    img = ImageEnhance.Color(img).enhance(1.22)
    img = ImageEnhance.Contrast(img).enhance(1.06)
    img = ImageEnhance.Brightness(img).enhance(1.04)
    img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=90, threshold=2))
    img.save(out_path, "JPEG", quality=92, optimize=True)
    print(f"OK: {out_path} size={img.size}")


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        print("FAIL: EMERGENT_LLM_KEY missing")
        sys.exit(1)

    for i, model in enumerate(["gemini-3-pro-image-preview", "gemini-3.1-flash-image-preview"]):
        try:
            chat = LlmChat(
                api_key=api_key,
                session_id=f"hero-3d-vibrant-{i}",
                system_message="You generate cinematic 3D rendered scene graphics.",
            )
            chat.with_model("gemini", model).with_params(modalities=["image", "text"])
            text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
            if text:
                print(f"[{model}] note: {text[:100]}")
            if not images:
                print(f"[{model}] FAIL: no image returned")
                continue
            out = f"{OUT_DIR}/hero-3d-vibrant-{i}.jpg"
            postprocess(base64.b64decode(images[0]["data"]), out)
        except Exception as exc:
            print(f"[{model}] ERROR: {type(exc).__name__}: {str(exc)[:200]}")


asyncio.run(main())
