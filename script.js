// 🔹 1. Initialize Supabase
const supabaseUrl = 'https://anazgxxzlbauilhzexgi.supabase.co';
const supabaseKey = 'sb_publishable_qPErfSATKVqxKA76WhpUiQ_EpLQONJA';
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// 🔹 2. Select HTML Elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsBody = document.getElementById("resultsBody");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const signupForm = document.getElementById('signupForm');
const signupMessage = document.getElementById('signupMessage');
const imageUpload = document.getElementById("imageUpload");

// 🔹 3. Authentication - Handle Signup
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Grabbing IDs from your index.html
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signupMessage.innerText = "Signing up...";
    signupMessage.classList.remove("hidden");

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        signupMessage.innerText = "Error: " + error.message;
    } else {
        signupMessage.innerText = "Success! Please check your email for a link.";
        signupForm.reset();
    }
});

// 🔹 4. Search - Handle Search Button Click
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) {
        showError("Please enter a song name.");
        return;
    }
    searchSong(query);
});

// 🔹 5. Database Logic - Fetch from Supabase
async function searchSong(query) { 
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    resultsBody.innerHTML = "";

    // Queries the 'Songs' table (Note the capital 'S' to match your DB)
    const { data: songs, error } = await supabase
        .from('Songs') 
        .select('*')
        .ilike('song_title', `%${query}%`); 

    loading.classList.add("hidden");

    if (error) {
        console.error("Database error:", error);
        showError("Could not fetch from database.");
        return;
    }

    if (!songs || songs.length === 0) {
        showError("No artists found with that song name.");
        return;
    }

    renderResults(songs);
}

// 🔹 6. UI Logic - Render Results to Table
function renderResults(songs) {
    resultsBody.innerHTML = ""; 
    songs.forEach(song => {
        const row = document.createElement("tr");

        // Uses exact column names from your database: 'artist_name' and 'duration'
        row.innerHTML = `
            <td>${song.artist_name}</td>
            <td>${song.duration}</td>
        `;

        resultsBody.appendChild(row);
// Add this right after renderResults(songs);
document.querySelector(".results-section").classList.remove("hidden");
    });
}

// 🔹 7. Helpers
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

// Image upload placeholder
imageUpload.addEventListener("change", () => {
    if (imageUpload.files.length > 0) {
        alert("Image recognition coming soon!");
    }
});
