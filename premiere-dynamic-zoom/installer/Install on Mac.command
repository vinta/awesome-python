#!/bin/bash
# Dynamic Zoom for Premiere Pro - offline installer for macOS.
# Double-click this file. It copies the DynamicZoom folder that sits next to it
# into your Adobe extensions folder. No internet or Creative Cloud app needed.

finish() {
  echo
  read -n 1 -s -r -p "Press any key to close this window."
  echo
  exit "$1"
}

cd "$(dirname "$0")" || finish 1
SRC="$(pwd)/DynamicZoom"
DEST_DIR="$HOME/Library/Application Support/Adobe/CEP/extensions"
DEST="$DEST_DIR/DynamicZoom"

echo "Dynamic Zoom for Premiere Pro - installer"
echo "-----------------------------------------"

if [ ! -f "$SRC/CSXS/manifest.xml" ]; then
  echo "Can't find the \"DynamicZoom\" folder next to this installer."
  echo "Keep the installer and the DynamicZoom folder together (unzip the whole zip file)."
  finish 1
fi

if pgrep -f "Adobe Premiere Pro" >/dev/null 2>&1; then
  echo "Note: Premiere Pro is open. Quit it and open it again after this finishes."
  echo
fi

mkdir -p "$DEST_DIR" || { echo "Could not create $DEST_DIR"; finish 1; }
rm -rf "$DEST"
if ! cp -R "$SRC" "$DEST_DIR/"; then
  echo "Copying failed."
  finish 1
fi
# Files from a download or a cloud drive are flagged by macOS; the extension does not need that flag.
xattr -dr com.apple.quarantine "$DEST" 2>/dev/null

# Premiere only loads extensions that are not from the Adobe store when this is on.
for v in 9 10 11 12 13 14; do
  defaults write "com.adobe.CSXS.$v" PlayerDebugMode 1
done

echo "Installed to:"
echo "  $DEST"
echo
echo "Done! Open Premiere Pro, then: Window > Extensions > Dynamic Zoom"
finish 0
