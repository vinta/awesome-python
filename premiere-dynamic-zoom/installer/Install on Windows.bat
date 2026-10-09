@echo off
setlocal
title Dynamic Zoom for Premiere Pro - installer
rem Copies the DynamicZoom folder next to this file into your Adobe extensions
rem folder. No internet or Creative Cloud app needed.

set "SRC=%~dp0DynamicZoom"
set "DEST=%APPDATA%\Adobe\CEP\extensions\DynamicZoom"

echo Dynamic Zoom for Premiere Pro - installer
echo -----------------------------------------

if not exist "%SRC%\CSXS\manifest.xml" (
  echo Can't find the "DynamicZoom" folder next to this installer.
  echo If you opened the zip file directly, close this window, right-click the
  echo zip file, choose "Extract All", and run the installer from the new folder.
  goto :fail
)

tasklist /FI "IMAGENAME eq Adobe Premiere Pro.exe" 2>nul | find /I "Adobe Premiere Pro.exe" >nul
if not errorlevel 1 (
  echo Note: Premiere Pro is open. Close it and open it again after this finishes.
  echo.
)

if exist "%DEST%" rmdir /s /q "%DEST%"
robocopy "%SRC%" "%DEST%" /E /NFL /NDL /NJH /NJS /NP >nul
if errorlevel 8 (
  echo Copying failed.
  goto :fail
)

rem Premiere only loads extensions that are not from the Adobe store when this is on.
for %%v in (9 10 11 12 13 14) do reg add "HKCU\Software\Adobe\CSXS.%%v" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul

echo Installed to:
echo   %DEST%
echo.
echo Done! Open Premiere Pro, then: Window ^> Extensions ^> Dynamic Zoom
echo.
pause
exit /b 0

:fail
echo.
pause
exit /b 1
