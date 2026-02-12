# 🎵 YouTube Downloader

Una aplicación de escritorio moderna y fácil de usar para descargar videos de YouTube en formatos MP4 y MP3.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## ✨ Características

- 🎬 **Descarga videos en MP4** - Máxima calidad disponible (hasta 1080p)
- 🎵 **Extrae audio en MP3** - 320kbps con thumbnail embebido
- 🖼️ **Preview del video** - Ve thumbnail, título y duración antes de descargar
- 📊 **Barra de progreso** - Seguimiento en tiempo real de la descarga
- 🎨 **Interfaz moderna** - Diseño glassmorphism con animaciones suaves
- 💾 **Organización automática** - Archivos guardados en `Downloads/YouTube`
- 🚀 **Inicio rápido** - Un solo clic con archivo .bat

## 🚀 Instalación

### ⚡ Instalación Automática (RECOMENDADO)

**¡La forma más fácil de empezar!** Solo necesitas:

1. **Descarga o clona** este repositorio
2. **Doble clic** en `INSTALL.bat`
3. **Espera** 3-5 minutos mientras se instala todo
4. **¡Listo!** Ejecuta `YouTube Downloader.bat`

El instalador automático descarga e instala:
- ✅ Node.js (versión portable)
- ✅ ffmpeg (para conversión MP3)
- ✅ yt-dlp (motor de descarga)
- ✅ Todas las dependencias npm
- ✅ Configuración automática

**📖 Guía completa de instalación:** Ver [INSTALL_GUIDE.md](INSTALL_GUIDE.md)

### 🔧 Instalación Manual (Avanzado)

Si prefieres instalar manualmente:

1. **Instala Node.js** 18.0.0 o superior ([Descargar](https://nodejs.org/))
2. **Instala FFmpeg** (opcional, solo para MP3) - Ver [guía](FFMPEG_INSTALL_GUIDE.md)
3. **Clona el repositorio**:
   ```bash
   git clone https://github.com/TU_USUARIO/youtube-downloader.git
   cd youtube-downloader
   ```
4. **Instala dependencias**:
   ```bash
   npm install
   ```
5. **Inicia la aplicación**:
   - Doble clic en `YouTube Downloader.bat`
   - O ejecuta `npm start`

**📖 Guía completa:** Ver [USER_GUIDE.md](USER_GUIDE.md)


## 📖 Uso

### Método Rápido

1. **Doble clic** en `YouTube Downloader.bat`
2. **Pega la URL** de YouTube
3. **Click en "Obtener Info"**
4. **Selecciona formato** (MP3 o MP4)
5. **Espera** a que termine
6. **Abre la carpeta** de descargas

### Ubicación de Descargas

Los archivos se guardan en:
```
C:\Users\TU_USUARIO\Downloads\YouTube\
```

## 📂 Estructura del Proyecto

```
youtube_downloader/
├── main.js              # Proceso principal de Electron
├── preload.js           # Puente IPC seguro
├── app.js               # Lógica de la interfaz
├── index.html           # Interfaz de usuario
├── public/
│   └── styles.css       # Estilos
├── YouTube Downloader.bat  # Launcher
├── package.json         # Configuración
├── USER_GUIDE.md        # Guía de usuario
└── README.md            # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **[Electron](https://www.electronjs.org/)** - Framework para aplicaciones de escritorio
- **[yt-dlp](https://github.com/yt-dlp/yt-dlp)** - Descargador de YouTube
- **[FFmpeg](https://ffmpeg.org/)** - Conversión de audio/video
- **HTML/CSS/JavaScript** - Interfaz de usuario

## 🔧 Solución de Problemas

### "No se reconoce npm"
**Solución**: Instala Node.js desde https://nodejs.org/

### "FFmpeg not found" al descargar MP3
**Solución**: 
- Instala FFmpeg (ver [guía](FFMPEG_INSTALL_GUIDE.md))
- O descarga solo MP4 (no requiere FFmpeg)

### "Error getting video info"
**Posibles causas**:
- URL inválida
- Video privado o eliminado
- Restricción por región

**Más soluciones:** Ver [USER_GUIDE.md](USER_GUIDE.md)

## 🤝 Contribuir

Las contribuciones son bienvenidas! Si quieres mejorar el proyecto:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## ⚖️ Consideraciones Legales

### Uso Permitido
✅ Descarga de videos para **uso personal**  
✅ Backup de tu propio contenido  
✅ Uso educativo y de investigación  

### Uso NO Permitido
❌ Redistribución de contenido con derechos de autor  
❌ Uso comercial sin permiso  
❌ Violación de términos de servicio de YouTube  

**Disclaimer**: Esta herramienta es solo para uso personal. Los usuarios son responsables de cumplir con las leyes de derechos de autor y los términos de servicio de YouTube.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Por la increíble herramienta de descarga
- [Electron](https://www.electronjs.org/) - Por hacer posibles las apps de escritorio con web tech
- [FFmpeg](https://ffmpeg.org/) - Por el procesamiento de audio/video

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias:

- 🐛 [Reportar un bug](https://github.com/TU_USUARIO/youtube-downloader/issues)
- 💡 [Solicitar una característica](https://github.com/TU_USUARIO/youtube-downloader/issues)
- 📖 [Ver guía de usuario](USER_GUIDE.md)

## 🌟 ¿Te gusta el proyecto?

Si este proyecto te fue útil, considera:
- ⭐ Darle una estrella en GitHub
- 🍴 Hacer un fork y mejorarlo
- 📢 Compartirlo con otros

---

**Hecho con ❤️ para la comunidad**
