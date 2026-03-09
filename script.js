
const supabaseUrl = 'https://anazgxxzlbauilhzexgi.supabase.co';
const supabaseKey = 'sb_publishable_qPErfSATKVqxKA76WhpUiQ_EpLQONJA';
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);


const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsBody = document.getElementById("resultsBody");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const signupForm = document.getElementById('signupForm');
const signupMessage = document.getElementById('signupMessage');


searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchSong(query);
    } else {
        showError("Please enter a song name.");
    }
});

async function searchSong(query) { 
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    resultsBody.innerHTML = "";

    // Queries your 'Songs' table
    const { data: songs, error } = await supabase
        .from('Songs') 
        .select('*')
        .ilike('song_title', `%${query}%`); // Matches your table column

    loading.classList.add("hidden");

    if (error) {
        console.error("Database error:", error);
        showError("Could not fetch from database.");
        return;
    }

    if (!songs || songs.length === 0) {
        showError("No artists found in your database.");
        return;
    }

    renderResults(songs);
}


function renderResults(songs) {
    resultsBody.innerHTML = ""; 
    songs.forEach(song => {
        const row = document.createElement("tr");
        // Ensure these match your Supabase column names exactly
        row.innerHTML = `
            <td>${song.artist_name}</td>
            <td>${song.duration}</td>
        `;
        resultsBody.appendChild(row);
    });
}


signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
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
        signupMessage.innerText = "Success! Please check your email.";
        signupForm.reset();
    }
});


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}
