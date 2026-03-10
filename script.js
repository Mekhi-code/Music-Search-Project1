
const supabaseUrl = 'https://anazgxxzlbauilhzexgi.supabase.co';
const supabaseKey = 'sb_publishable_qPErfSATKVqxKA76WhpUiQ_EpLQONJA';

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);


const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsBody = document.getElementById("resultsBody");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const signupForm = document.getElementById('signupForm');
const signupMessage = document.getElementById('signupMessage');


// 🔹 3. Search Logic
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    console.log("Search button clicked! Query entered:", query); // 🔍 Diagnostic line
    
    if (query) {
        searchSong(query);
    } else {
        console.warn("Search attempted with empty input."); // 🔍 Diagnostic line
        showError("Please enter a song name.");
    }
});

async function searchSong(query) { 
    console.log("Starting Supabase query for:", query); // 🔍 Diagnostic line
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    resultsBody.innerHTML = "";

    const { data: songs, error } = await supabaseClient
    .from('Songs') 
    .select('*')
    .ilike('song_title', `%${query}%`);
    
    if (error) {
        console.error("Supabase Error details:", error); // 🔍 This will show the exact DB error
        showError("Could not fetch from database.");
        loading.classList.add("hidden");
        return;
    }

    console.log("Data received from Supabase:", songs); // 🔍 Diagnostic line
    loading.classList.add("hidden");

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

        row.innerHTML = `
            <td>${song.artist_name}</td>
            <td>${song.duration}</td>
        `;

        resultsBody.appendChild(row);
    });

    resultsSection.classList.remove("hidden");
}


signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signupMessage.innerText = "Signing up...";
    signupMessage.classList.remove("hidden");

    const { data, error } = await supabaseClient.auth.signUp({
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
