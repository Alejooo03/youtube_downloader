const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;
const ytDlpPath = path.join(__dirname, 'yt-dlp.exe');
const ffmpegPath = path.join(os.homedir(), 'ffmpeg', 'ffmpeg.exe');
const ffprobePath = path.join(os.homedir(), 'ffmpeg', 'ffprobe.exe');
const nodePath = 'C:\\Program Files\\nodejs\\node.exe';
const downloadsPath = path.join(os.homedir(), 'Downloads', 'YouTube');

// Create downloads folder if it doesn't exist
if (!fs.existsSync(downloadsPath)) {
    fs.mkdirSync(downloadsPath, { recursive: true });
}

console.log('yt-dlp path:', ytDlpPath);
console.log('FFmpeg path:', ffmpegPath);
console.log('Node.js path:', nodePath);
console.log('Downloads path:', downloadsPath);

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'icon.png')
    });

    mainWindow.loadFile('index.html');

    // Open DevTools in development
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Get video info
ipcMain.handle('get-video-info', async (event, url) => {
    return new Promise((resolve, reject) => {
        const ytDlp = spawn(ytDlpPath, [
            '--dump-json',
            '--no-playlist',
            url
        ]);

        let output = '';
        let errorOutput = '';

        ytDlp.stdout.on('data', (data) => {
            output += data.toString();
        });

        ytDlp.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        ytDlp.on('close', (code) => {
            if (code === 0) {
                try {
                    const info = JSON.parse(output);
                    resolve({
                        title: info.title,
                        duration: info.duration,
                        thumbnail: info.thumbnail,
                        author: info.uploader || info.channel
                    });
                } catch (error) {
                    reject(new Error('Error parsing video info'));
                }
            } else {
                reject(new Error(errorOutput || 'Error getting video info'));
            }
        });
    });
});

// Download video
ipcMain.handle('download-video', async (event, url, format) => {
    return new Promise((resolve, reject) => {
        const args = [
            url,
            '--no-playlist',
            '--ffmpeg-location', ffmpegPath,
            '--js-runtimes', `node:${nodePath}`,
            '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            '-o', path.join(downloadsPath, '%(title)s.%(ext)s')
        ];

        if (format === 'mp3') {
            args.push(
                '-x',
                '--audio-format', 'mp3',
                '--audio-quality', '0',
                '--embed-thumbnail'
            );
        } else {
            args.push(
                '-f', 'bestvideo[ext=mp4][height<=1080]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                '--merge-output-format', 'mp4'
            );
        }

        console.log('Ejecutando yt-dlp con args:', args);
        const ytDlp = spawn(ytDlpPath, args);

        let errorOutput = '';

        ytDlp.stdout.on('data', (data) => {
            const output = data.toString();

            // Parse progress
            const downloadMatch = output.match(/\[download\]\s+(\d+\.?\d*)%/);
            if (downloadMatch) {
                const progress = parseFloat(downloadMatch[1]);
                mainWindow.webContents.send('download-progress', progress);
            }

            console.log(output);
        });

        ytDlp.stderr.on('data', (data) => {
            const error = data.toString();
            errorOutput += error;
            console.error('yt-dlp stderr:', error);
        });

        ytDlp.on('close', (code) => {
            console.log('yt-dlp cerrado con código:', code);
            if (code === 0) {
                resolve({ success: true, path: downloadsPath });
            } else {
                console.error('Error completo:', errorOutput);
                reject(new Error(errorOutput || 'Download failed'));
            }
        });
    });
});

// Open downloads folder
ipcMain.handle('open-downloads-folder', async () => {
    const { shell } = require('electron');
    shell.openPath(downloadsPath);
});

// Get downloads path
ipcMain.handle('get-downloads-path', async () => {
    return downloadsPath;
});
