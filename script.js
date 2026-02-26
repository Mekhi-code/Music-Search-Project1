const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsBody = document.getElementById("resultsBody");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const imageUpload = document.getElementById("imageUpload");

// Convert milliseconds to mm:ss format
function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Handle Search Button Click
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (!query) {
        showError("Please enter a song name or URL.");
        return;
    }

    searchSong(query);
});

// Search using iTunes API (Live working example)
function searchSong(query) {
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    resultsBody.innerHTML = "";

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`)
        .then(response => response.json())
        .then(data => {
            loading.classList.add("hidden");

            if (data.results.length === 0) {
                showError("No results found.");
                return;
            }

            data.results.forEach(song => {
                const row = document.createElement("tr");

                const artistCell = document.createElement("td");
                artistCell.textContent = song.artistName;

                const durationCell = document.createElement("td");
                durationCell.textContent = formatDuration(song.trackTimeMillis);

                row.appendChild(artistCell);
                row.appendChild(durationCell);

                resultsBody.appendChild(row);
            });
        })
        .catch(error => {
            loading.classList.add("hidden");
            showError("Something went wrong. Try again.");
        });
}

// Image Upload (Placeholder for future AI recognition integration)
imageUpload.addEventListener("change", () => {
    if (imageUpload.files.length > 0) {
        alert("Image recognition coming soon! Integrate with Google Vision or similar API.");
    }
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}
