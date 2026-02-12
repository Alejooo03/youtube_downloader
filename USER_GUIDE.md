# 🚀 Guía de Uso - YouTube Downloader

Una guía simple para usar la aplicación y descargar tus videos favoritos de YouTube.

---

## 📥 Instalación

### 1. Descarga el Proyecto

Descarga el proyecto desde GitHub:
- Click en el botón verde **"Code"**
- Selecciona **"Download ZIP"**
- Extrae el ZIP en cualquier carpeta de tu computadora

### 2. Instala Node.js

Si no lo tienes instalado:
- Descarga desde: https://nodejs.org/
- Instala la versión LTS (recomendada)
- Reinicia tu computadora

### 3. Instala Dependencias

1. Abre la carpeta del proyecto
2. Haz **Shift + Click derecho** en un espacio vacío
3. Selecciona **"Abrir ventana de PowerShell aquí"**
4. Ejecuta:
   ```bash
   npm install
   ```
5. Espera a que termine (1-2 minutos)

### 4. Instala FFmpeg (Opcional - Solo para MP3)

**Si solo descargas MP4, puedes saltarte este paso.**

Para descargar audio en MP3, necesitas FFmpeg:

#### Opción A: Instalación Automática (Recomendado)
```bash
# Usando Chocolatey
choco install ffmpeg
```

#### Opción B: Instalación Manual
1. Descarga desde: https://ffmpeg.org/download.html
2. Extrae en `C:\Users\TU_USUARIO\ffmpeg\`
3. El archivo debe quedar en: `C:\Users\TU_USUARIO\ffmpeg\ffmpeg.exe`

**Guía detallada:** Ver `FFMPEG_INSTALL_GUIDE.md`

---

## 🎯 Cómo Usar la Aplicación

### Método Rápido (Recomendado)

1. **Doble clic** en `YouTube Downloader.bat`
2. ¡La aplicación se abre automáticamente!

### Método Alternativo (Línea de Comandos)

1. Abre PowerShell en la carpeta del proyecto
2. Ejecuta:
   ```bash
   npm start
   ```

---

## 📺 Descargar Videos

### Paso a Paso

1. **Copia la URL** del video de YouTube
   - Ejemplo: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

2. **Pega la URL** en el campo de texto de la aplicación

3. **Click en "Obtener Info"**
   - Verás el título del video
   - Verás la miniatura
   - Verás la duración

4. **Selecciona el formato**:
   - 🎵 **MP3** - Solo audio (320kbps, requiere FFmpeg)
   - 🎬 **MP4** - Video completo (mejor calidad disponible)

5. **Espera** a que termine la descarga
   - Verás una barra de progreso
   - Puede tardar 1-5 minutos dependiendo del video

6. **Abre la carpeta** de descargas
   - Click en el botón **"Abrir Carpeta de Descargas"**
   - O ve manualmente a: `C:\Users\TU_USUARIO\Downloads\YouTube\`

---

## 💡 Consejos y Trucos

### Crear Acceso Directo en el Escritorio

1. Click derecho en `YouTube Downloader.bat`
2. **Enviar a** → **Escritorio (crear acceso directo)**
3. Ahora puedes iniciar la app desde el escritorio

### Anclar al Menú de Inicio

1. Click derecho en `YouTube Downloader.bat`
2. **Anclar a Inicio**
3. Busca "YouTube Downloader" en el menú de Windows

### Cambiar Carpeta de Descargas

Si quieres cambiar dónde se guardan los archivos:

1. Abre `main.js` con un editor de texto
2. Busca la línea 12:
   ```javascript
   const downloadsPath = path.join(os.homedir(), 'Downloads', 'YouTube');
   ```
3. Cámbiala por tu carpeta preferida:
   ```javascript
   const downloadsPath = 'C:\\MisVideos\\YouTube';
   ```

---

## ❓ Solución de Problemas

### "No se reconoce npm"

**Problema:** Node.js no está instalado o no está en el PATH.

**Solución:**
1. Instala Node.js desde https://nodejs.org/
2. Reinicia tu computadora
3. Intenta de nuevo

---

### "FFmpeg not found" al descargar MP3

**Problema:** FFmpeg no está instalado o no está en la ubicación correcta.

**Solución:**
- **Opción 1:** Instala FFmpeg (ver sección de instalación arriba)
- **Opción 2:** Descarga solo MP4 (no requiere FFmpeg)

---

### "Error getting video info"

**Posibles causas:**
- ❌ URL inválida o incorrecta
- ❌ Video privado o eliminado
- ❌ Video bloqueado por región
- ❌ Problemas de conexión a internet

**Solución:**
1. Verifica que la URL sea correcta
2. Prueba con otro video
3. Verifica tu conexión a internet

---

### La descarga falla o se queda en 0%

**Problema:** yt-dlp puede estar desactualizado.

**Solución:**
1. Cierra la aplicación
2. Elimina el archivo `yt-dlp.exe` de la carpeta del proyecto
3. Vuelve a abrir la aplicación
4. Se descargará la versión más reciente automáticamente

---

### La aplicación no inicia

**Solución:**
1. Asegúrate de haber ejecutado `npm install`
2. Verifica que Node.js esté instalado
3. Intenta ejecutar `npm start` desde PowerShell para ver el error

---

## 🎨 Características de la Interfaz

### Preview del Video
Antes de descargar, puedes ver:
- 🖼️ Miniatura del video
- 📝 Título completo
- ⏱️ Duración
- 👤 Nombre del canal

### Barra de Progreso
Durante la descarga verás:
- 📊 Porcentaje completado
- ⚡ Velocidad de descarga
- ⏳ Tiempo estimado restante

### Notificaciones
La app te avisará cuando:
- ✅ La descarga se complete exitosamente
- ❌ Ocurra algún error
- 📥 El archivo esté listo para usar

---

## 📂 Ubicación de Archivos

### Archivos Descargados
Por defecto se guardan en:
```
C:\Users\TU_USUARIO\Downloads\YouTube\
```

### Formato de Nombres
Los archivos se nombran automáticamente:
- Videos: `Nombre del Video.mp4`
- Audio: `Nombre del Video.mp3`

---

## ⚖️ Uso Responsable

### ✅ Uso Permitido
- Descargar videos para uso personal
- Backup de tu propio contenido
- Uso educativo y de investigación

### ❌ Uso NO Permitido
- Redistribuir contenido con derechos de autor
- Uso comercial sin permiso
- Violar términos de servicio de YouTube

**Recuerda:** Respeta los derechos de autor y usa esta herramienta de manera responsable.

---

## 🆘 Obtener Ayuda

Si tienes problemas:

1. **Revisa esta guía** - La mayoría de problemas están resueltos aquí
2. **Lee el README.md** - Información técnica adicional
3. **Reporta un bug** - Abre un issue en GitHub
4. **Documentación adicional:**
   - `FFMPEG_INSTALL_GUIDE.md` - Guía detallada de FFmpeg
   - `QUICK_START.md` - Inicio rápido
   - `docs/` - Documentación técnica

---

## 🎉 ¡Disfruta!

Ya estás listo para descargar tus videos favoritos de YouTube.

**Recuerda:**
- 🎵 MP3 requiere FFmpeg
- 🎬 MP4 funciona sin configuración adicional
- 📂 Los archivos se guardan en `Downloads\YouTube\`
- 🚀 Usa el archivo `.bat` para inicio rápido

**¡Felices descargas!** 🎊
