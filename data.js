function loadVideos() {
    return JSON.parse(localStorage.getItem('videos')) || [];
}

function saveVideos(videos) {
    localStorage.setItem('videos', JSON.stringify(videos));
}
