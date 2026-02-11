let currentUrl = '';

// Get downloads path on load
window.electronAPI.getDownloadsPath().then(downloadsPath => {
    document.getElementById('downloadsPath').textContent = `Descargas: ${downloadsPath}`;
});

// Elements
const urlInput = document.getElementById('urlInput');
const fetchInfoBtn = document.getElementById('fetchInfoBtn');
const videoPreview = document.getElementById('videoPreview');
const downloadSection = document.getElementById('downloadSection');
const progressSection = document.getElementById('progressSection');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const downloadMp3 = document.getElementById('downloadMp3');
const downloadMp4 = document.getElementById('downloadMp4');
const openFolderBtn = document.getElementById('openFolderBtn');

// Fetch video info
fetchInfoBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();

    if (!url) {
        showError('Por favor ingresa una URL de YouTube');
        return;
    }

    hideMessages();
    hidePreview();
    fetchInfoBtn.disabled = true;
    fetchInfoBtn.textContent = 'Obteniendo...';

    try {
        const videoInfo = await window.electronAPI.getVideoInfo(url);

        currentUrl = url;
        displayVideoInfo(videoInfo);
        showDownloadSection();
        fetchInfoBtn.disabled = false;
        fetchInfoBtn.innerHTML = '<span class="btn-text">Obtener Info</span><span class="btn-icon">🔍</span>';

    } catch (error) {
        showError(error.message || 'Error al obtener información del video');
        fetchInfoBtn.disabled = false;
        fetchInfoBtn.innerHTML = '<span class="btn-text">Obtener Info</span><span class="btn-icon">🔍</span>';
    }
});

// Allow Enter key to fetch info
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchInfoBtn.click();
    }
});

// Download MP3
downloadMp3.addEventListener('click', () => {
    if (!currentUrl) return;
    downloadFile('mp3');
});

// Download MP4
downloadMp4.addEventListener('click', () => {
    if (!currentUrl) return;
    downloadFile('mp4');
});

// Open downloads folder
openFolderBtn.addEventListener('click', () => {
    window.electronAPI.openDownloadsFolder();
});

// Listen for download progress
window.electronAPI.onDownloadProgress((progress) => {
    updateProgress(progress);
});

async function downloadFile(format) {
    hideMessages();
    showProgress();
    disableDownloadButtons();

    try {
        const result = await window.electronAPI.downloadVideo(currentUrl, format);

        hideProgress();
        showSuccess(`¡Descarga completada! Archivo guardado en: ${result.path}`);
        openFolderBtn.classList.remove('hidden');
        enableDownloadButtons();

    } catch (error) {
        hideProgress();
        showError(error.message || 'Error al descargar');
        enableDownloadButtons();
    }
}

function displayVideoInfo(data) {
    document.getElementById('thumbnail').src = data.thumbnail;
    document.getElementById('videoTitle').textContent = data.title;
    document.getElementById('videoAuthor').textContent = `Canal: ${data.author}`;

    const duration = formatDuration(data.duration);
    document.getElementById('videoDuration').textContent = `Duración: ${duration}`;

    videoPreview.classList.remove('hidden');
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
}

function showDownloadSection() {
    downloadSection.classList.remove('hidden');
}

function hidePreview() {
    videoPreview.classList.add('hidden');
    downloadSection.classList.add('hidden');
    openFolderBtn.classList.add('hidden');
}

function showProgress() {
    progressSection.classList.remove('hidden');
    updateProgress(0);
}

function hideProgress() {
    progressSection.classList.add('hidden');
}

function updateProgress(progress) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
}

function disableDownloadButtons() {
    downloadMp3.disabled = true;
    downloadMp4.disabled = true;
}

function enableDownloadButtons() {
    downloadMp3.disabled = false;
    downloadMp4.disabled = false;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function hideMessages() {
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
}
