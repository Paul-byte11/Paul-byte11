document.addEventListener("DOMContentLoaded", displayHomeVideos);

function loadVideos() {
    return JSON.parse(localStorage.getItem('videos')) || [];
}

function saveVideos(videos) {
    localStorage.setItem('videos', JSON.stringify(videos));
}

function uploadVideo() {
    const fileInput = document.getElementById('videoUpload');
    const titleInput = document.getElementById('videoTitle');
    const descInput = document.getElementById('videoDescription');
    const thumbInput = document.getElementById('thumbnailUpload');

    const file = fileInput.files[0];
    const thumbnailFile = thumbInput.files[0];
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const uploadDate = new Date().toLocaleDateString();

    if (!file || !thumbnailFile || !title || !description) {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }

    const videoURL = URL.createObjectURL(file);
    const reader = new FileReader();

    reader.onload = function (e) {
        const thumbnailURL = e.target.result;
        const newVideo = { title, description, src: videoURL, thumbnail: thumbnailURL, uploadDate };

        let videos = loadVideos();
        videos.push(newVideo);
        saveVideos(videos);

        alert("Video erfolgreich hochgeladen!");
        window.location.href = "index.html";
    };

    reader.readAsDataURL(thumbnailFile);
}

function displayHomeVideos() {
    const videoList = document.getElementById("videoList");

    if (!videoList) return;

    const videos = loadVideos();
    videoList.innerHTML = videos.length ? videos.map((video, index) =>
        `<div class="video-card" onclick="openVideo(${index})">
            <img src="${video.thumbnail}" alt="Thumbnail" class="thumbnail">
            <h3>${video.title}</h3>
            <p><strong>Hochgeladen am:</strong> ${video.uploadDate}</p>
        </div>`).join('') : "<p>Keine Videos gefunden!</p>";
}

function openVideo(index) {
    localStorage.setItem("currentVideo", index);
    window.location.href = "video.html";
}

function displayVideoPage() {
    const index = localStorage.getItem("currentVideo");
    if (index === null) {
        window.location.href = "index.html";
        return;
    }

    const video = loadVideos()[index];
    document.getElementById("videoTitle").innerText = video.title;
    document.getElementById("videoPlayer").src = video.src;
    document.getElementById("videoDescription").innerText = video.description;
    document.getElementById("uploadDate").innerText = "Hochgeladen am: " + video.uploadDate;
}
const searchInput = document.getElementById("searchInput");
const suggestionsDiv = document.getElementById("suggestions");
const trendingHashtags = ["#Gaming", "#Vlog", "#Tech", "#Tutorial", "#Reisen"];

// Suchfunktion für Hashtags mit Unterstützung für mehrere Hashtags
searchInput.addEventListener("input", function() {
    let searchQuery = this.value.toLowerCase().split(" ");
    let videos = document.querySelectorAll(".video-card");

    videos.forEach(video => {
        let hashtags = video.getAttribute("data-hashtags").toLowerCase();
        let match = searchQuery.every(tag => hashtags.includes(tag) || tag === "");
        video.style.display = match ? "block" : "none";
    });

    showSuggestions();
});

// Vorschläge für Hashtags anzeigen
function showSuggestions() {
    let inputValue = searchInput.value.toLowerCase();
    let filtered = trendingHashtags.filter(tag => tag.toLowerCase().includes(inputValue));
    
    suggestionsDiv.innerHTML = "";
    filtered.forEach(tag => {
        let suggestion = document.createElement("div");
        suggestion.className = "suggestion";
        suggestion.textContent = tag;
        suggestion.onclick = function() {
            searchInput.value = tag;
            searchInput.dispatchEvent(new Event("input"));
            suggestionsDiv.innerHTML = "";
        };
        suggestionsDiv.appendChild(suggestion);
    });
}

// Direkt nach einem Trending Hashtag suchen
function searchHashtag(tag) {
    searchInput.value = tag;
    searchInput.dispatchEvent(new Event("input"));
}

