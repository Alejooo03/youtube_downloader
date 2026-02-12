@echo off
:: YouTube Downloader - Instalador Automatico
:: Este script instala todas las dependencias necesarias

echo ========================================
echo YouTube Downloader - Instalador
echo ========================================
echo.
echo Este instalador configurara automaticamente:
echo - Node.js y npm
echo - ffmpeg
echo - yt-dlp
echo - Dependencias del proyecto
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

:: Ejecutar el script de PowerShell con privilegios
powershell -ExecutionPolicy Bypass -File "%~dp0install.ps1"

echo.
echo ========================================
echo Instalacion completada!
echo ========================================
echo.
echo Para ejecutar el programa, usa: "YouTube Downloader.bat"
echo.
pause
