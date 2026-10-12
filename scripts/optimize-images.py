"""Build responsive derivatives for referenced designer photos.

Run `python3 -m pip install -r scripts/requirements-images.txt` once, then
`npm run images:build`. Originals in public/assets/figma are never modified.
"""

from __future__ import annotations

import csv
import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src"
PUBLIC = ROOT / "public"
OUTPUT = PUBLIC / "assets" / "optimized"
MANIFEST = SOURCE / "data" / "optimizedImages.json"
AUDIT = ROOT / "docs" / "image-delivery-audit.csv"
CATEGORIES = {"Personas", "Tech", "Finanzas", "Creatividad", "Construccio\u0301n"}
PATTERN = re.compile(r"/assets/figma/[^'\"]+?\.(?:jpe?g|png)")
WIDTHS = (160, 480, 960, 1600)


def referenced_photos() -> list[str]:
    paths = set()
    for file in SOURCE.rglob("*"):
        if file.suffix not in {".ts", ".tsx", ".css"} or file == MANIFEST:
            continue
        text = file.read_text()
        for raw in PATTERN.findall(text):
            path = raw.replace("\\u0301", "\u0301")
            if path.split("/")[3] in CATEGORIES:
                paths.add(path)
    return sorted(paths)


def filename_for(path: str) -> str:
    category = path.split("/")[3].replace("Construccio\u0301n", "construccion").lower()
    stem = re.sub(r"[^a-z0-9]+", "-", Path(path).stem.lower()).strip("-")[:42]
    digest = hashlib.sha256(path.encode()).hexdigest()[:8]
    return f"{category}/{stem}-{digest}"


def save_variant(image: Image.Image, target: Path, format_name: str) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    if format_name == "WEBP":
        image.save(target, format="WEBP", quality=88, method=6, exact=True)
    else:
        image.convert("RGB").save(
            target, format="JPEG", quality=88, subsampling=0, optimize=True, progressive=True
        )


def main() -> None:
    manifest = {}
    rows = []
    paths = referenced_photos()
    content = (SOURCE / "data" / "siteContent.ts").read_text()
    wide_images = {
        value.replace("\\u0301", "\u0301")
        for value in re.findall(r"statementImage:\s*'(/assets/figma/[^']+)'", content)
    }
    if not paths:
        raise SystemExit("No referenced designer photos found")
    for index, path in enumerate(paths, 1):
        original = PUBLIC / path.lstrip("/")
        if not original.is_file():
            raise FileNotFoundError(original)
        with Image.open(original) as opened:
            image = ImageOps.exif_transpose(opened)
            original_width, original_height = image.size
            widths = tuple(width for width in WIDTHS if width < original_width) + (min(original_width, WIDTHS[-1]),)
            widths = tuple(sorted(set(widths)))
            if path in wide_images:
                widths = tuple(sorted(set((*widths, min(original_width, 1920)))))
            base = filename_for(path)
            variants = []
            for width in widths:
                resized = image.copy()
                resized.thumbnail((width, original_height), Image.Resampling.LANCZOS)
                output = OUTPUT / f"{base}-{resized.width}.webp"
                save_variant(resized, output, "WEBP")
                variants.append({"width": resized.width, "src": "/" + str(output.relative_to(PUBLIC))})
            fallback_width = widths[-1]
            fallback = image.copy()
            fallback.thumbnail((fallback_width, original_height), Image.Resampling.LANCZOS)
            fallback_path = OUTPUT / f"{base}-{fallback.width}.jpg"
            save_variant(fallback, fallback_path, "JPEG")
            manifest[path] = {
                "width": original_width,
                "height": original_height,
                "webp": variants,
                "fallback": "/" + str(fallback_path.relative_to(PUBLIC)),
            }
            rows.append({
                "source": path,
                "original_dimensions": f"{original_width}x{original_height}",
                "original_bytes": original.stat().st_size,
                "webp_widths": ",".join(str(item["width"]) for item in variants),
                "largest_webp_bytes": (PUBLIC / variants[-1]["src"].lstrip("/")).stat().st_size,
                "fallback_jpeg_bytes": fallback_path.stat().st_size,
            })
        print(f"{index:02}/{len(paths)} {path}", flush=True)
    with AUDIT.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    for name in ("portrait", "construction", "developer"):
        original_path = f"/assets/figma/home-hero-{name}.png"
        original = PUBLIC / original_path.lstrip("/")
        output = OUTPUT / "home-hero" / f"{name}.webp"
        with Image.open(original) as image:
            output.parent.mkdir(parents=True, exist_ok=True)
            image.save(output, format="WEBP", quality=92, method=6, exact=True)
            manifest[original_path] = {
                "width": image.width,
                "height": image.height,
                "webp": [{"width": image.width, "src": "/" + str(output.relative_to(PUBLIC))}],
                "fallback": original_path,
            }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    original_total = sum(row["original_bytes"] for row in rows)
    webp_total = sum(row["largest_webp_bytes"] for row in rows)
    print(f"Largest WebP set: {webp_total / 1048576:.1f} MiB versus {original_total / 1048576:.1f} MiB originals")


if __name__ == "__main__":
    main()
