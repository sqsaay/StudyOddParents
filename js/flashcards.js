import { loadLayout } from "./loadLayout.mjs";

let flashcards = [];
let currentIndex = 0;

async function init() {
  await loadLayout();

  const display = document.getElementById("flashcardDisplay");
  const searchBtn = document.getElementById("searchBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const newTopicBtn = document.getElementById("newTopicBtn");

  // Render current flashcard
  function renderFlashcard() {
    display.innerHTML = "";
    if (flashcards.length === 0) {
      display.innerHTML = "<p>No flashcards yet. Search a topic!</p>";
      return;
    }

    const cardData = flashcards[currentIndex];
    const flashcard = document.createElement("div");
    flashcard.className = "flashcard";

    const inner = document.createElement("div");
    inner.className = "flashcard-inner";

    const front = document.createElement("div");
    front.className = "front";
    front.innerText = cardData.front;

    const back = document.createElement("div");
    back.className = "back";
    back.innerText = cardData.back;

    inner.appendChild(front);
    inner.appendChild(back);
    flashcard.appendChild(inner);

    // Flip on click
    flashcard.addEventListener("click", () => {
      flashcard.classList.toggle("flipped");
    });

    display.appendChild(flashcard);
  }

  // Fetch flashcards from OpenAI API
  async function fetchFlashcards(topic) {
    flashcards = [];
    currentIndex = 0;

    try {
      const res = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk-...YOUR_KEY..." // replace with your key
        },
        body: JSON.stringify({
          model: "gpt-5.4-mini",
          input: `Generate 5 simple Q&A flashcards about ${topic}. Format each as "Question: ..." and "Answer: ..."`,
          store: false
        })
      });

      const data = await res.json();
      console.log("API response:", data);

      const text = data.output?.[0]?.content?.[0]?.text || "";
      const lines = text.split("\n").filter(l => l.trim() !== "");

      for (let i = 0; i < lines.length; i += 2) {
        flashcards.push({
          front: lines[i]?.replace("Question:", "").trim() || "Question",
          back: lines[i+1]?.replace("Answer:", "").trim() || "Answer"
        });
      }

      renderFlashcard();
    } catch (err) {
      console.error("Error fetching flashcards:", err);
      display.innerHTML = "<p>Failed to load flashcards. Check console.</p>";
    }
  }

  // Event listeners
  searchBtn.addEventListener("click", () => {
    const topic = document.getElementById("topicInput").value.trim();
    if (topic) fetchFlashcards(topic);
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderFlashcard();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < flashcards.length - 1) {
      currentIndex++;
      renderFlashcard();
    }
  });

  newTopicBtn.addEventListener("click", () => {
    flashcards = [];
    currentIndex = 0;
    document.getElementById("topicInput").value = "";
    renderFlashcard();
  });

  // Initial render
  renderFlashcard();
}

init();
