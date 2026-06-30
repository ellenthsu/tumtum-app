#!/bin/bash
# Usage: ./scripts/add-photos.sh /path/to/new/photo1.jpg /path/to/new/photo2.jpg ...
# Normalizes orientation (works for vertical or horizontal shots) and strips
# privacy-sensitive metadata (GPS, device info) before adding to photos/.
set -euo pipefail

cd "$(dirname "$0")/.."

existing_count=$(ls photos/tumtum*.jpg 2>/dev/null | wc -l | tr -d ' ')
next=$((existing_count + 1))

for src in "$@"; do
  dest="photos/tumtum${next}.jpg"
  cp "$src" "$dest"
  magick "$dest" -auto-orient "$dest"
  exiftool -all= -overwrite_original "$dest" >/dev/null
  echo "Added $dest"
  next=$((next + 1))
done

echo ""
echo "Now add the new filenames to photos.js, then:"
echo "  git add photos/ photos.js && git commit -m 'Add new photos' && git push"
