import { loadLayout } from "./loadLayout.mjs";

const clientId = "5c545177"; // Jamendo Client ID

let tracks = [];
let currentIndex = 0;
let audio = null;

async function init() {
  await loadLayout();

  const playlistSelect = document.getElementById("playlistSelect");
  const nowPlaying = document.getElementById("nowPlaying");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Load Jamendo playlists (featured radios)
  async function loadPlaylists() {
    try {
      const res = await fetch(`https://api.jamendo.com/v3.0/playlists/?client_id=${clientId}&format=json`);
      const data = await res.json();
      console.log("Playlists:", data);

      playlistSelect.innerHTML = "";
      data.results.forEach(pl => {
        const option = document.createElement("option");
        option.value = pl.id;
        option.textContent = pl.name;
        playlistSelect.appendChild(option);
      });

      if (data.results.length > 0) {
        loadTracks(data.results[0].id);
      }
    } catch (err) {
      console.error("Error loading playlists:", err);
      nowPlaying.innerHTML = "<p>Failed to load playlists. Check console.</p>";
    }
  }

  // Load tracks from selected playlist
  async function loadTracks(playlistId) {
    try {
      const res = await fetch(`https://api.jamendo.com/v3.0/playlists/tracks/?client_id=${clientId}&id=${playlistId}&format=json`);
      const data = await res.json();
      console.log("Tracks:", data);

      tracks = data.results[0].tracks;
      currentIndex = 0;
      playTrack(currentIndex);
    } catch (err) {
      console.error("Error loading tracks:", err);
    }
  }

  function playTrack(index) {
    if (!tracks || tracks.length === 0) return;
    const track = tracks[index];
    nowPlaying.innerHTML = `<p>🎵 ${track.name} — ${track.artist_name}</p>`;

    if (audio) audio.pause();
    audio = new Audio(track.audio);
    audio.play();
  }

  playBtn.addEventListener("click", () => {
    if (audio) audio.play();
  });

  pauseBtn.addEventListener("click", () => {
    if (audio) audio.pause();
  });

  nextBtn.addEventListener("click", () => {
    if (tracks.length > 0) {
      currentIndex = (currentIndex + 1) % tracks.length;
      playTrack(currentIndex);
    }
  });

  playlistSelect.addEventListener("change", e => {
    loadTracks(e.target.value);
  });

  loadPlaylists();
}

init();
