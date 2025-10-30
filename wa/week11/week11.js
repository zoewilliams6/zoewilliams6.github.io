const btnFetch = document.querySelector("#js-get-news");
const btnSave = document.querySelector("#js-save-pref");
const btnClear = document.querySelector("#js-clear-data");
const topicSelect = document.querySelector("#js-topic-select");
const newsFeed = document.querySelector("#news-feed");
const loadingBar = document.querySelector("#js-loading");

let currentTopic = localStorage.getItem("preferredTopic") || "general";
topicSelect.value = currentTopic;

const NEWS_API_ENDPOINT = "https://newsapi.org/v2/top-headlines";
const NEWS_API_KEY = "782f4eaddd1449678261905b7bbc1a45";

btnFetch.addEventListener("click", fetchNews);
btnSave.addEventListener("click", savePreference);
btnClear.addEventListener("click", clearData);

function savePreference() {
  const selected = topicSelect.value;
  localStorage.setItem("preferredTopic", selected);
  alert(`Saved your topic preference: ${selected}`);
}

function clearData() {
  localStorage.removeItem("preferredTopic");
  topicSelect.value = "general";

  newsFeed.innerHTML =
    '<p class="placeholder">Your saved preferences were cleared.</p>';

  alert("Your saved data has been cleared successfully.");
}

async function fetchNews() {
  try {
    newsFeed.innerHTML = "";
    loadingBar.classList.add("active");

    const topic = topicSelect.value;
    const url = `${NEWS_API_ENDPOINT}?category=${encodeURIComponent(
      topic
    )}&country=us&pageSize=5&apiKey=${NEWS_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsFeed.innerHTML = "No articles found for this topic.";
      return;
    }

    data.articles.forEach((article) => {
      const card = document.createElement("div");
      card.classList.add("article");

      card.innerHTML = `
        <h3>${article.title || "Untitled Article"}</h3>
        ${article.description || "No description available."}
        <a href="${article.url}" target="_blank">Read full article →</a>
      `;
      newsFeed.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    newsFeed.innerHTML = "Failed to fetch news."
    ;
  } finally {
    loadingBar.classList.remove("active");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("preferredTopic")) {
    fetchNews();
  }
});
