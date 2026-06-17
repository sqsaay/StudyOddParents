import { loadLayout } from "./loadLayout.mjs";

async function init() {
  await loadLayout(); // inject layout first

  // Load values from localStorage or set defaults
  let dayStreak = parseInt(localStorage.getItem("dayStreak")) || 1;
  let flashcardsCount = parseInt(localStorage.getItem("flashcardsCount")) || 1;
  let cardsDone = parseInt(localStorage.getItem("cardsDone")) || 1;
  let quotesCount = parseInt(localStorage.getItem("quotesCount")) || 1;

  function updateDashboard() {
    document.getElementById("streak").innerText = `${dayStreak} Day Streak`;
    document.getElementById("flashcards").innerText = `${flashcardsCount} Flashcards`;
    document.getElementById("cardsDone").innerText = `${cardsDone} Cards Done`;
    document.getElementById("quotes").innerText = `${quotesCount} Quotes`;
  }

  updateDashboard();

  // Example functions to update stats
  window.incrementStreak = function () {
    dayStreak++;
    localStorage.setItem("dayStreak", dayStreak);
    updateDashboard();
  };

  window.addFlashcard = function () {
    flashcardsCount++;
    localStorage.setItem("flashcardsCount", flashcardsCount);
    updateDashboard();
  };

  window.markCardDone = function () {
    cardsDone++;
    localStorage.setItem("cardsDone", cardsDone);
    updateDashboard();
  };

  window.addQuote = function () {
    quotesCount++;
    localStorage.setItem("quotesCount", quotesCount);
    updateDashboard();
  };
}

init();
