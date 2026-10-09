#!/bin/bash
# Installs the Dynamic Zoom extension for Premiere Pro on macOS.
# Does not need the Creative Cloud app.
#
#   curl -fsSL https://raw.githubusercontent.com/ArtyzAudio/awesome-python/claude/amazing-faraday-d3odj2/premiere-dynamic-zoom/install-mac.sh | bash
set -euo pipefail

ZIP_URL="https://github.com/ArtyzAudio/awesome-python/raw/claude/amazing-faraday-d3odj2/premiere-dynamic-zoom/dist/DynamicZoom-CEP.zip"
EXT_DIR="$HOME/Library/Application Support/Adobe/CEP/extensions"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Downloading Dynamic Zoom..."
curl -fsSL "$ZIP_URL" -o "$TMP/DynamicZoom-CEP.zip"

echo "Installing into $EXT_DIR/DynamicZoom"
mkdir -p "$EXT_DIR"
rm -rf "$EXT_DIR/DynamicZoom"
unzip -q "$TMP/DynamicZoom-CEP.zip" -d "$EXT_DIR"

# Premiere only loads extensions that are not signed by Adobe when this is on.
for v in 9 10 11 12 13 14; do
  defaults write "com.adobe.CSXS.$v" PlayerDebugMode 1
done

echo
echo "Done. Quit and reopen Premiere Pro, then open:"
echo "  Window > Extensions > Dynamic Zoom"
