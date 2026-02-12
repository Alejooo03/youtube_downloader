# YouTube Downloader - Script de Instalacion Automatica
# Este script descarga e instala todas las dependencias necesarias

$ErrorActionPreference = "Stop"
$ProgressPreference = 'SilentlyContinue'

# Colores para la consola
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success { Write-ColorOutput Green $args }
function Write-Info { Write-ColorOutput Cyan $args }
function Write-Warning { Write-ColorOutput Yellow $args }
function Write-Error { Write-ColorOutput Red $args }

# Directorio del proyecto
$ProjectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ToolsDir = Join-Path $ProjectDir "tools"

Write-Info "`n========================================="
Write-Info "YouTube Downloader - Instalador Automatico"
Write-Info "=========================================`n"

# Crear directorio de herramientas
if (-not (Test-Path $ToolsDir)) {
    New-Item -ItemType Directory -Path $ToolsDir | Out-Null
    Write-Success "✓ Directorio de herramientas creado"
}

# ============================================
# 1. VERIFICAR/INSTALAR NODE.JS
# ============================================
Write-Info "`n[1/4] Verificando Node.js..."

$nodeInstalled = $false
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Success "✓ Node.js ya esta instalado: $nodeVersion"
        $nodeInstalled = $true
    }
} catch {
    Write-Warning "✗ Node.js no encontrado"
}

if (-not $nodeInstalled) {
    Write-Info "Descargando Node.js LTS..."
    
    # Descargar Node.js LTS (versión portable)
    $nodeUrl = "https://nodejs.org/dist/v20.11.0/node-v20.11.0-win-x64.zip"
    $nodeZip = Join-Path $ToolsDir "node.zip"
    $nodeDir = Join-Path $ToolsDir "node"
    
    try {
        Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeZip -UseBasicParsing
        Write-Success "✓ Node.js descargado"
        
        Write-Info "Extrayendo Node.js..."
        Expand-Archive -Path $nodeZip -DestinationPath $ToolsDir -Force
        
        # Renombrar directorio
        $extractedDir = Get-ChildItem -Path $ToolsDir -Filter "node-v*" -Directory | Select-Object -First 1
        if ($extractedDir) {
            if (Test-Path $nodeDir) {
                Remove-Item -Path $nodeDir -Recurse -Force
            }
            Rename-Item -Path $extractedDir.FullName -NewName "node"
        }
        
        Remove-Item -Path $nodeZip -Force
        
        # Agregar a PATH temporal
        $env:Path = "$nodeDir;$env:Path"
        
        Write-Success "✓ Node.js instalado correctamente"
    } catch {
        Write-Error "✗ Error al instalar Node.js: $_"
        Write-Warning "Por favor, instala Node.js manualmente desde: https://nodejs.org/"
        exit 1
    }
}

# Verificar npm
try {
    $npmVersion = npm --version 2>$null
    Write-Success "✓ npm version: $npmVersion"
} catch {
    Write-Error "✗ npm no esta disponible"
    exit 1
}

# ============================================
# 2. DESCARGAR/INSTALAR FFMPEG
# ============================================
Write-Info "`n[2/4] Verificando ffmpeg..."

$ffmpegPath = Join-Path $ToolsDir "ffmpeg\bin\ffmpeg.exe"

if (Test-Path $ffmpegPath) {
    Write-Success "✓ ffmpeg ya esta instalado"
} else {
    Write-Info "Descargando ffmpeg..."
    
    $ffmpegUrl = "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip"
    $ffmpegZip = Join-Path $ToolsDir "ffmpeg.zip"
    $ffmpegExtractDir = Join-Path $ToolsDir "ffmpeg_temp"
    $ffmpegDir = Join-Path $ToolsDir "ffmpeg"
    
    try {
        Invoke-WebRequest -Uri $ffmpegUrl -OutFile $ffmpegZip -UseBasicParsing
        Write-Success "✓ ffmpeg descargado"
        
        Write-Info "Extrayendo ffmpeg..."
        Expand-Archive -Path $ffmpegZip -DestinationPath $ffmpegExtractDir -Force
        
        # Mover archivos a la ubicacion final
        $extractedDir = Get-ChildItem -Path $ffmpegExtractDir -Directory | Select-Object -First 1
        if ($extractedDir) {
            if (Test-Path $ffmpegDir) {
                Remove-Item -Path $ffmpegDir -Recurse -Force
            }
            Move-Item -Path $extractedDir.FullName -Destination $ffmpegDir
        }
        
        Remove-Item -Path $ffmpegZip -Force
        Remove-Item -Path $ffmpegExtractDir -Recurse -Force
        
        Write-Success "✓ ffmpeg instalado correctamente"
    } catch {
        Write-Error "✗ Error al instalar ffmpeg: $_"
        Write-Warning "Por favor, descarga ffmpeg manualmente desde: https://ffmpeg.org/download.html"
    }
}

# ============================================
# 3. DESCARGAR/INSTALAR YT-DLP
# ============================================
Write-Info "`n[3/4] Verificando yt-dlp..."

$ytdlpPath = Join-Path $ProjectDir "yt-dlp.exe"

if (Test-Path $ytdlpPath) {
    Write-Success "✓ yt-dlp ya esta instalado"
    Write-Info "Actualizando yt-dlp a la ultima version..."
    try {
        & $ytdlpPath -U
        Write-Success "✓ yt-dlp actualizado"
    } catch {
        Write-Warning "No se pudo actualizar yt-dlp automaticamente"
    }
} else {
    Write-Info "Descargando yt-dlp..."
    
    $ytdlpUrl = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe"
    
    try {
        Invoke-WebRequest -Uri $ytdlpUrl -OutFile $ytdlpPath -UseBasicParsing
        Write-Success "✓ yt-dlp descargado e instalado"
    } catch {
        Write-Error "✗ Error al descargar yt-dlp: $_"
        exit 1
    }
}

# ============================================
# 4. INSTALAR DEPENDENCIAS DEL PROYECTO
# ============================================
Write-Info "`n[4/4] Instalando dependencias del proyecto..."

try {
    Set-Location $ProjectDir
    
    # Instalar dependencias
    Write-Info "Ejecutando npm install..."
    npm install
    
    Write-Success "✓ Dependencias instaladas correctamente"
} catch {
    Write-Error "✗ Error al instalar dependencias: $_"
    exit 1
}

# ============================================
# 5. CREAR ARCHIVO .ENV
# ============================================
Write-Info "`nConfigurando variables de entorno..."

$envFile = Join-Path $ProjectDir ".env"
$envExampleFile = Join-Path $ProjectDir ".env.example"

if (-not (Test-Path $envFile)) {
    if (Test-Path $envExampleFile) {
        Copy-Item -Path $envExampleFile -Destination $envFile
        Write-Success "✓ Archivo .env creado desde .env.example"
    } else {
        # Crear .env con rutas detectadas
        $ffmpegBinPath = Join-Path $ToolsDir "ffmpeg\bin"
        $ytdlpExePath = $ytdlpPath
        
        $envContent = @"
# YouTube Downloader Configuration

# Path to ffmpeg binary directory
FFMPEG_PATH=$ffmpegBinPath

# Path to yt-dlp executable
YTDLP_PATH=$ytdlpExePath

# Default download directory (leave empty to use system Downloads folder)
DOWNLOAD_DIR=

# Server port (default: 3000)
PORT=3000
"@
        
        Set-Content -Path $envFile -Value $envContent
        Write-Success "✓ Archivo .env creado con rutas detectadas"
    }
} else {
    Write-Success "✓ Archivo .env ya existe"
}

# ============================================
# 6. CREAR SCRIPT DE INICIO MEJORADO
# ============================================
Write-Info "`nCreando script de inicio..."

$startBatContent = @"
@echo off
:: YouTube Downloader - Launcher
setlocal

:: Agregar Node.js y ffmpeg al PATH
set "PATH=%~dp0tools\node;%~dp0tools\ffmpeg\bin;%PATH%"

:: Cambiar al directorio del proyecto
cd /d "%~dp0"

:: Iniciar la aplicacion
echo Iniciando YouTube Downloader...
npm start

endlocal
"@

$startBatPath = Join-Path $ProjectDir "YouTube Downloader.bat"
Set-Content -Path $startBatPath -Value $startBatContent
Write-Success "✓ Script de inicio actualizado"

# ============================================
# RESUMEN FINAL
# ============================================
Write-Info "`n========================================="
Write-Success "INSTALACION COMPLETADA EXITOSAMENTE!"
Write-Info "=========================================`n"

Write-Info "Componentes instalados:"
Write-Success "  ✓ Node.js y npm"
Write-Success "  ✓ ffmpeg"
Write-Success "  ✓ yt-dlp"
Write-Success "  ✓ Dependencias del proyecto"
Write-Success "  ✓ Configuracion de entorno"

Write-Info "`nPara ejecutar la aplicacion:"
Write-Success "  1. Haz doble clic en 'YouTube Downloader.bat'"
Write-Success "  2. O ejecuta: npm start"

Write-Info "`nUbicacion de las herramientas:"
Write-Info "  Node.js: $ToolsDir\node"
Write-Info "  ffmpeg: $ToolsDir\ffmpeg"
Write-Info "  yt-dlp: $ytdlpPath"

Write-Info "`nPresiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
