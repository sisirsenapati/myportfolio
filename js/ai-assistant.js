document.addEventListener("DOMContentLoaded", () => {
  const askBtn = document.getElementById("askBtn");
  const micBtn = document.getElementById("micBtn");
  const userInput = document.getElementById("userQuestion");
  const responseBox = document.getElementById("aiResponse");

  let recognition = null;
  let recognizing = false;

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = e => userInput.value = e.results[0][0].transcript;
    recognition.onend = () => { recognizing = false; micBtn.textContent = '🎤'; };
  } else micBtn.disabled = true;

  micBtn.addEventListener('click', () => {
    if (!recognition) return;
    recognizing ? recognition.stop() : recognition.start();
    recognizing = !recognizing;
    micBtn.textContent = recognizing ? '🔴' : '🎤';
  });

  askBtn.addEventListener('click', async () => {
    const q = userInput.value.trim();
    if (!q) return responseBox.innerText = "Please type or speak a question first.";
    responseBox.innerHTML = "🤖 Thinking...";

    const res = await fetch('data/data.json');
    const data = await res.json();
    const answer = demoAnswer(q, data);
    setTimeout(() => responseBox.innerHTML = answer, 500);
  });

  function demoAnswer(q, data) {
    q = q.toLowerCase();
    if (q.includes('agile')) return "Sisir has led Agile transformations, boosting sprint velocity by 30% and team collaboration across global programs.";
    if (q.includes('pmp') || q.includes('cert')) return "He holds PMP, PSM I, and PMI-AI certifications — blending leadership, Scrum, and AI expertise.";
    if (q.includes('devops')) return "Sisir introduced DevOps automation in Azure, achieving 99.9% uptime and cutting release cycles by 25%.";
    if (q.includes('experience')) return "He has 18+ years in TCS and ProcessMAP managing enterprise programs and Agile delivery excellence.";
    return "I’m Sisir’s AI assistant. Ask me about his Agile, leadership, or DevOps achievements.";
 
