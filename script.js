// 🔹 Initialize Supabase
const supabaseUrl = 'https://anazgxxzlbauilhzexgi.supabase.co';
const supabaseKey = 'sb_publishable_qPErfSATKVqxKA76WhpUiQ_EpLQONJA';
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);
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

    // Replace your existing searchSong function with this:
async function searchSong(query) {
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    resultsBody.innerHTML = "";

    // 1. Search your Supabase database instead of iTunes
    // Use .ilike for case-insensitive searching (handles capitals automatically)
    const { data: songs, error } = await supabase
        .from('Songs') // Make sure this matches your table name exactly
        .select('*')
        .ilike('song_name', `%${query}%`); // Searches for the name anywhere in the text

    loading.classList.add("hidden");

    // 2. Handle Errors or No Results
    if (error) {
        console.error("Supabase error:", error);
        showError("Could not connect to database.");
        return;
    }

    if (songs.length === 0) {
        showError("No results found in your database.");
        return;
    }

    // 3. Send the data to your table
    renderResults(songs);
}

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
// 🔹 Authentication — Signup Code
const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signupMessage = document.getElementById("signupMessage");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    signupMessage.textContent = "Signing up...";

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        signupMessage.textContent = "Error: " + error.message;
        console.error(error);
    } else {
        signupMessage.textContent = "Signup successful! Check your email.";
        signupForm.reset();
    }
  async function findMusicFromDatabase(songName) {
    // This tells Supabase: "From the 'songs' table, select everything where song_title equals the user's input"
    let { data: songs, error } = await supabase
        .from('songs')
        .select('*')
        .eq('song_title', songName);

    if (error) {
        console.error("Error fetching data:", error);
        return;
    }

    // Now send the 'songs' data to your table rendering function
    renderResults(songs);
}
}
});
