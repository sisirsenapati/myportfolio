const COUNTER_API_BASE = "https://api.counterapi.dev/v1";
const NAMESPACE = "sisir-senapati-portfolio";
const VIEWS_KEY = "views";
const LIKES_KEY = "likes";

window.addEventListener("load", () => {
  fetch(`${COUNTER_API_BASE}/${NAMESPACE}/${VIEWS_KEY}/up`)
    .then(r => r.json()).then(d => document.getElementById("viewCount").textContent = d.count);
  fetch(`${COUNTER_API_BASE}/${NAMESPACE}/${LIKES_KEY}/`)
    .then(r => r.json()).then(d => document.getElementById("likeCount").textContent = d.count);

  document.getElementById("likeButton").addEventListener("click", () => {
    fetch(`${COUNTER_API_BASE}/${NAMESPACE}/${LIKES_KEY}/up`)
      .then(r => r.json())
      .then(d => {
        document.getElementById("likeCount").textContent = d.count;
        document.getElementById("likeButton").textContent = "❤️ Liked!";
      });
  });
});
