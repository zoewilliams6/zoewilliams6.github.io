function pretty(g) {
  return g ? g[0].toUpperCase() + g.slice(1).toLowerCase() : "";
}

const btnFetch = document.querySelector("#js-get-movies");
const btnSave = document.querySelector("#js-save-pref");
const btnClear = document.querySelector("#js-clear-data");
const genreSelect = document.querySelector("#js-genre-select");
const movieList = document.querySelector("#movie-list");
const rowTitle = document.querySelector("#row-title");
const statusText = document.querySelector("#js-status-text");
const savedPrefText = document.querySelector("#js-saved-pref");
const cardTemplate = document.querySelector("#movie-card-template");

const ENDPOINT = "https://www.omdbapi.com/";
const API_KEY = "a12cda3b";

let current = {
  genre: localStorage.getItem("preferredGenre") || "action",
  movies: [],
};

genreSelect.value = current.genre;
updateSavedPref();

btnFetch.addEventListener("click", () => fetchMovies("manual"));
btnSave.addEventListener("click", savePreference);
btnClear.addEventListener("click", clearPreference);

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("preferredGenre");
  if (saved) fetchMovies("saved");
});

function updateSavedPref() {
  const saved = localStorage.getItem("preferredGenre");
  savedPrefText.textContent = saved
    ? `Saved genre: ${pretty(saved)}`
    : "No saved genre yet";
}

function savePreference() {
  const selected = genreSelect.value;
  localStorage.setItem("preferredGenre", selected);
  current.genre = selected;
  updateSavedPref();
  alert(`Saved genre: ${pretty(selected)}`);
}

function clearPreference() {
  localStorage.removeItem("preferredGenre");
  current.genre = "action";
  genreSelect.value = "action";
  movieList.innerHTML = "";
  updateSavedPref();
  alert("Your saved data has been cleared.");
}

async function fetchMovies(source = "manual") {
  const genre = genreSelect.value;
  const prettyGenre = pretty(genre);

  movieList.innerHTML = "";
  statusText.textContent = `Loading movies for ${prettyGenre}...`;

  try {
    const response = await fetch(
      `${ENDPOINT}?apikey=${API_KEY}&type=movie&s=${encodeURIComponent(genre)}`
    );

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    current.movies = data.Search || [];

    if (current.movies.length === 0) {
      statusText.textContent = `No movies found for ${prettyGenre}.`;
      return;
    }

    displayMovies(source);
  } catch (err) {
    console.error(err);
    statusText.textContent = "Failed to load movies.";
  }
}

function displayMovies(source) {
  const genreName = pretty(current.genre);

  rowTitle.textContent =
    source === "saved"
      ? `Because you saved ${genreName}`
      : `Because you chose ${genreName}`;

  movieList.innerHTML = "";

  current.movies.slice(0, 10).forEach((movie) => {
    const clone = cardTemplate.content.cloneNode(true);

    const poster = clone.querySelector(".movie-poster");
    const title = clone.querySelector(".movie-title");
    const year = clone.querySelector(".movie-year");

    if (movie.Poster && movie.Poster !== "N/A") {
      poster.src = movie.Poster;
      poster.alt = `Poster for ${movie.Title}`;
    } else {
      poster.src = "";
      poster.alt = "No image available";
      poster.classList.add("no-poster");
    }

    title.textContent = movie.Title || "Untitled";
    year.textContent = movie.Year || "Unknown";

    movieList.appendChild(clone);
  });

  statusText.textContent = `Showing ${current.movies.length} results for ${genreName}`;
}
