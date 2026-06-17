let isPlaying = false;

document.getElementById("playBtn").addEventListener("click", () => {
  isPlaying = !isPlaying;
  document.getElementById("playBtn").innerText = isPlaying ? "⏸️" : "▶️";
  // Later: integrate Spotify playback here
});

document.getElementById("prevBtn").addEventListener("click", () => {
  console.log("Previous track");
});

document.getElementById("nextBtn").addEventListener("click", () => {
  console.log("Next track");
});

document.getElementById("playlistSelect").addEventListener("change", (e) => {
  const selected = e.target.options[e.target.selectedIndex].text;
  document.getElementById("nowPlaying").innerText = selected;
});
