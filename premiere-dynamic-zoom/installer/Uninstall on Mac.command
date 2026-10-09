#!/bin/bash
# Dynamic Zoom for Premiere Pro - removes the extension on macOS.
DEST="$HOME/Library/Application Support/Adobe/CEP/extensions/DynamicZoom"
if [ -d "$DEST" ]; then
  rm -rf "$DEST" && echo "Dynamic Zoom was removed. Restart Premiere Pro."
else
  echo "Dynamic Zoom is not installed."
fi
echo
read -n 1 -s -r -p "Press any key to close this window."
echo
