@echo off
setlocal
title Dynamic Zoom for Premiere Pro - uninstall
set "DEST=%APPDATA%\Adobe\CEP\extensions\DynamicZoom"
if exist "%DEST%" (
  rmdir /s /q "%DEST%"
  echo Dynamic Zoom was removed. Restart Premiere Pro.
) else (
  echo Dynamic Zoom is not installed.
)
echo.
pause
