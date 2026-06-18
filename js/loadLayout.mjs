// loadLayout.mjs
export async function loadLayout() {
  const res = await fetch("layout.html"); // external file with header, sidebar, footer
  const html = await res.text();
  document.getElementById("layout").innerHTML = html;

  // Personalize username
  let userName = localStorage.getItem("userName") || "Guest";
  const usernameEl = document.getElementById("username");
  if (usernameEl) {
    usernameEl.innerText = userName;
  }

  // Highlight active nav link automatically
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".sidebar a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  document.getElementById("hamburger").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("active");
  });
}
