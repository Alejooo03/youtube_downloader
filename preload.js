const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getVideoInfo: (url) => ipcRenderer.invoke('get-video-info', url),
    downloadVideo: (url, format) => ipcRenderer.invoke('download-video', url, format),
    openDownloadsFolder: () => ipcRenderer.invoke('open-downloads-folder'),
    getDownloadsPath: () => ipcRenderer.invoke('get-downloads-path'),
    onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (event, progress) => callback(progress))
});
