"""Build the local OpenStreetMap snapshot used by the contact section."""

from io import BytesIO
from math import cos, floor, log, pi, radians, tan
from pathlib import Path
from subprocess import run
from tempfile import TemporaryDirectory
from urllib.request import Request, urlopen

from PIL import Image, ImageEnhance, ImageFilter


LATITUDE = 23.3415
LONGITUDE = 113.3016
ZOOM = 16
TILES_WIDE = 8
TILES_HIGH = 4
TILE_SIZE = 256
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "images" / "openstreetmap-guangzhou-renhe.png"


def point_to_tile(latitude: float, longitude: float, zoom: int) -> tuple[float, float]:
    scale = 2**zoom
    latitude_rad = radians(latitude)
    x = (longitude + 180) / 360 * scale
    y = (1 - log(tan(latitude_rad) + 1 / cos(latitude_rad)) / pi) / 2 * scale
    return x, y


def fetch_tile(tile_url: str) -> Image.Image:
    request = Request(tile_url, headers={"User-Agent": "BESDERWILL website contact map"})
    try:
        with urlopen(request, timeout=20) as response:
            return Image.open(BytesIO(response.read())).convert("RGB")
    except OSError:
        # Some Windows networks terminate Python/OpenSSL handshakes while curl
        # continues to work with the system TLS stack.
        with TemporaryDirectory() as temporary_directory:
            temporary_file = Path(temporary_directory) / "tile.png"
            result = run(
                ["curl.exe", "-L", "--retry", "2", "--max-time", "20", "-sS", "-o", str(temporary_file), tile_url],
                check=False,
            )
            if result.returncode != 0:
                raise RuntimeError(f"Unable to download map tile: {tile_url}")
            return Image.open(temporary_file).convert("RGB")


center_x, center_y = point_to_tile(LATITUDE, LONGITUDE, ZOOM)
start_x = floor(center_x) - TILES_WIDE // 2
start_y = floor(center_y) - TILES_HIGH // 2
mosaic = Image.new("RGB", (TILES_WIDE * TILE_SIZE, TILES_HIGH * TILE_SIZE), "#e9eef2")

for column in range(TILES_WIDE):
    for row in range(TILES_HIGH):
        tile_x = start_x + column
        tile_y = start_y + row
        tile_url = f"https://tile.openstreetmap.de/{ZOOM}/{tile_x}/{tile_y}.png"
        tile = fetch_tile(tile_url)
        mosaic.paste(tile, (column * TILE_SIZE, row * TILE_SIZE))

# Centre the supplied office location rather than the centre of its source tile.
pixel_x = (center_x - start_x) * TILE_SIZE
pixel_y = (center_y - start_y) * TILE_SIZE
crop_width, crop_height = 1800, 880
left = round(pixel_x - crop_width / 2)
top = round(pixel_y - crop_height / 2)
snapshot = mosaic.crop((left, top, left + crop_width, top + crop_height))

# A restrained treatment gives the map the same cool editorial tone as the site.
snapshot = ImageEnhance.Color(snapshot).enhance(0.72)
snapshot = ImageEnhance.Contrast(snapshot).enhance(1.04)
snapshot = snapshot.filter(ImageFilter.UnsharpMask(radius=1.1, percent=80, threshold=3))
snapshot.save(OUTPUT, optimize=True)
print(f"Saved {OUTPUT} ({snapshot.width}x{snapshot.height})")
