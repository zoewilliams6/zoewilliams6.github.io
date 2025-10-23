document.querySelector("#js-new-quote").addEventListener("click", newTrivia);
document.querySelector("#js-tweet").addEventListener("click", newAnswer);

let current = {
  question: "",
  answer: "",
};

const triviaEndpoint = "https://api.api-ninjas.com/v1/trivia";
const apiKey = "wSVVnVnDOYbK2xdn6k/U/Q==nEgAvSEutq5s05vj";

document.querySelector("#js-new-quote").addEventListener("click", newTrivia);
document.querySelector("#js-tweet").addEventListener("click", newAnswer);

async function newTrivia() {
  try {
    const response = await fetch(triviaEndpoint, {
      headers: { "X-Api-Key": apiKey },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const trivia = data[0];

    current.question = trivia.question;
    current.answer = trivia.answer;

    document.getElementById("js-quote-text").textContent = trivia.question;
    document.getElementById("js-answer-text").textContent = "";
  } catch (error) {
    console.error(error);
    alert("Failed to fetch trivia.");
  }
}

function newAnswer() {
  const loadingBar = document.getElementById("loading-bar");
  const answerText = document.getElementById("js-answer-text");
  
  answerText.textContent = "";

  loadingBar.classList.add("active");

  setTimeout(() => {
    loadingBar.classList.remove("active");
    if (current.answer) {
      answerText.textContent = current.answer;
    } else {
      answerText.textContent = "Click 'Generate a new bit of trivia!' first!";
    }
  }, 1000);
}

