const btnFetch = document.querySelector("#js-get-movies");
const btnSave = document.querySelector("#js-save-pref");
const btnClear = document.querySelector("#js-clear-data");
const genreSelect = document.querySelector("#js-genre-select");
const movieFeed = document.querySelector("#movie-feed");
const loadingBar = document.querySelector("#js-loading");

let currentGenre = localStorage.getItem("preferredGenre") || "action";
genreSelect.value = currentGenre;

const OMDB_ENDPOINT = "https://www.omdbapi.com/";
const OMDB_API_KEY = "a12cda3b";

btnFetch.addEventListener("click", fetchMovies);
btnSave.addEventListener("click", savePreference);
btnClear.addEventListener("click", clearData);

function savePreference() {
  const selected = genreSelect.value;
  localStorage.setItem("preferredGenre", selected);
  alert(`Saved your genre preference: ${selected}`);
}

function clearData() {
  localStorage.removeItem("preferredGenre");
  genreSelect.value = "action";

  movieFeed.innerHTML =
    '<p class="placeholder">Your saved preferences were cleared.</p>';

  alert("Your saved data has been cleared successfully.");
}

async function fetchMovies() {
  try {
    movieFeed.innerHTML = "";
    loadingBar.classList.add("active");

    const genre = genreSelect.value;

    // OMDb cannot filter by genre directly — we use a search keyword
    const url = `${OMDB_ENDPOINT}?apikey=${OMDB_API_KEY}&type=movie&s=${encodeURIComponent(
      genre
    )}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`OMDb error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.Search || data.Search.length === 0) {
      movieFeed.innerHTML = "No movies found for this genre.";
      return;
    }

    data.Search.slice(0, 5).forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("article");

      card.innerHTML = `
        <h3>${movie.Title || "Untitled Movie"}</h3>
        <p><strong>Year:</strong> ${movie.Year || "Unknown"}</p>
        <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" 
             alt="Poster for ${movie.Title}" 
             style="max-width: 120px; border-radius: 6px; margin-bottom: 10px;" />
        <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">
          View on IMDb →
        </a>
      `;
      movieFeed.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    movieFeed.innerHTML = "Failed to fetch movies.";
  } finally {
    loadingBar.classList.remove("active");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("preferredGenre")) {
    fetchMovies();
  }
});
