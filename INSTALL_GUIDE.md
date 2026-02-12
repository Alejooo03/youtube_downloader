# 🚀 INSTALACION RAPIDA - YouTube Downloader

Este proyecto incluye un instalador automatico que configura todo lo necesario para ejecutar la aplicacion.

## ✨ Instalacion Automatica (Recomendado)

### Opcion 1: Instalador Simple
1. Haz doble clic en **`INSTALL.bat`**
2. Espera a que se descarguen e instalen todas las dependencias
3. ¡Listo! Ejecuta **`YouTube Downloader.bat`** para iniciar la aplicacion

### ¿Que hace el instalador?
El instalador automatico se encarga de:
- ✅ Descargar e instalar **Node.js** (version portable, no afecta tu sistema)
- ✅ Descargar e instalar **ffmpeg** (para conversion de audio/video)
- ✅ Descargar e instalar **yt-dlp** (motor de descarga)
- ✅ Instalar todas las dependencias npm del proyecto
- ✅ Configurar automaticamente las rutas en el archivo `.env`
- ✅ Crear un acceso directo para ejecutar la aplicacion

**Tiempo estimado:** 3-5 minutos (dependiendo de tu conexion a internet)

---

## 📋 Instalacion Manual (Avanzado)

Si prefieres instalar manualmente o el instalador automatico no funciona:

### Requisitos Previos
1. **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
2. **ffmpeg** - [Descargar](https://ffmpeg.org/download.html)
3. **yt-dlp** - Se descarga automaticamente o [descarga manual](https://github.com/yt-dlp/yt-dlp/releases)

### Pasos
1. Instala Node.js desde el sitio oficial
2. Descarga ffmpeg y agrega su carpeta `bin` al PATH de Windows
3. Clona o descarga este repositorio
4. Abre una terminal en la carpeta del proyecto
5. Ejecuta: `npm install`
6. Copia `.env.example` a `.env` y configura las rutas
7. Ejecuta: `npm start`

---

## 🎮 Como Usar

### Iniciar la Aplicacion
- **Metodo 1:** Doble clic en **`YouTube Downloader.bat`**
- **Metodo 2:** Ejecuta `npm start` en la terminal

### Descargar Videos/Audio
1. Pega la URL del video de YouTube
2. Selecciona el formato (MP3 para audio, MP4 para video)
3. Elige la calidad deseada
4. Haz clic en "Descargar"
5. Los archivos se guardaran en tu carpeta de Descargas

---

## 🔧 Solucion de Problemas

### El instalador no funciona
- Ejecuta PowerShell como administrador
- Ejecuta: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Vuelve a ejecutar `INSTALL.bat`

### Error "ffmpeg no encontrado"
- Verifica que el archivo `.env` tenga la ruta correcta a ffmpeg
- O reinstala usando `INSTALL.bat`

### Error "yt-dlp no encontrado"
- El archivo `yt-dlp.exe` debe estar en la carpeta raiz del proyecto
- O reinstala usando `INSTALL.bat`

### La aplicacion no inicia
- Asegurate de que Node.js este instalado: `node --version`
- Verifica que las dependencias esten instaladas: `npm install`

---

## 📁 Estructura del Proyecto

```
youtube_downloader/
├── INSTALL.bat              # Instalador automatico (EJECUTA ESTO PRIMERO)
├── install.ps1              # Script de instalacion PowerShell
├── YouTube Downloader.bat   # Ejecuta la aplicacion
├── tools/                   # Herramientas descargadas automaticamente
│   ├── node/               # Node.js portable
│   └── ffmpeg/             # ffmpeg
├── yt-dlp.exe              # Motor de descarga
├── .env                    # Configuracion (creado automaticamente)
└── ...
```

---

## 📝 Notas Importantes

- **Instalacion Portable:** El instalador automatico descarga versiones portables que no afectan tu sistema
- **Sin Permisos de Admin:** No se requieren permisos de administrador
- **Actualizaciones:** Ejecuta `INSTALL.bat` nuevamente para actualizar yt-dlp y dependencias
- **Desinstalacion:** Simplemente elimina la carpeta del proyecto

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa la seccion de "Solucion de Problemas" arriba
2. Verifica que tu antivirus no este bloqueando las descargas
3. Asegurate de tener conexion a internet durante la instalacion

---

**¡Disfruta descargando tus videos favoritos! 🎉**
