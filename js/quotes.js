import { loadLayout } from "./loadLayout.mjs";

async function init() {
  await loadLayout();

  const display = document.getElementById("quoteDisplay");
  const surpriseBtn = document.getElementById("surpriseBtn");

  function renderQuote(quoteText) {
    display.innerHTML = `<p>${quoteText}</p>`;
  }

  async function fetchRandomQuote() {
    try {
      const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": "KVcQm1MUp5wotYB74WcfqmmzBwxzZma3BQl3jut9" }
      });

      const data = await res.json();
      // API Ninjas returns an array of quotes
      const quoteObj = data[0];
      const quoteText = `"${quoteObj.quote}" — ${quoteObj.author}`;
      renderQuote(quoteText);
    } catch (err) {
      console.error("Error fetching random quote:", err);
      display.innerHTML = "<p>Failed to load random quote. Check console.</p>";
    }
  }

  surpriseBtn.addEventListener("click", fetchRandomQuote);

  // Initial message
  display.innerHTML = "<p>Click 'Surprise Me 🎲' to get a random quote!</p>";
}

init();
