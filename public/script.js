const urlInput = document.getElementById('urlInput');
const fetchInfoBtn = document.getElementById('fetchInfoBtn');
const videoPreview = document.getElementById('videoPreview');
const downloadSection = document.getElementById('downloadSection');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const downloadMp3 = document.getElementById('downloadMp3');
const downloadMp4 = document.getElementById('downloadMp4');

let currentUrl = '';

// Fetch video info
fetchInfoBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();

    if (!url) {
        showError('Por favor ingresa una URL de YouTube');
        return;
    }

    hideMessages();
    showLoading(true);
    hidePreview();

    try {
        const response = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener información del video');
        }

        currentUrl = url;
        displayVideoInfo(data);
        showDownloadSection();
        showLoading(false);

    } catch (error) {
        showError(error.message);
        showLoading(false);
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
    downloadFile('audio', 'MP3');
});

// Download MP4
downloadMp4.addEventListener('click', () => {
    if (!currentUrl) return;
    downloadFile('video', 'MP4');
});

function downloadFile(type, formatName) {
    hideMessages();
    showLoading(true);

    const downloadUrl = `/api/download/${type}?url=${encodeURIComponent(currentUrl)}`;

    // Create a hidden link and trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success message after a short delay
    setTimeout(() => {
        showLoading(false);
        showSuccess(`¡Descarga de ${formatName} iniciada! Revisa tu carpeta de descargas.`);
    }, 1500);
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
    const secs = seconds % 60;

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
}

function showLoading(show) {
    if (show) {
        loadingIndicator.classList.remove('hidden');
    } else {
        loadingIndicator.classList.add('hidden');
    }
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
