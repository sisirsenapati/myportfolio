// Wait until page fully loads (after main.js finishes)
window.addEventListener("load", () => {
  // Wait a short moment to ensure content is rendered
  setTimeout(initAssistant, 800);
});

function initAssistant() {
  const askBtn = document.getElementById("askBtn");
  const micBtn = document.getElementById("micBtn");
  const userInput = document.getElementById("userQuestion");
  const responseBox = document.getElementById("aiResponse");

  if (!askBtn || !micBtn || !userInput || !responseBox) {
    console.warn("AI Assistant elements not found yet. Retrying...");
    setTimeout(initAssistant, 1000);
    return;
  }

  let recognition = null;
  let recognizing = false;

  // 🎤 Setup speech recognition (browser native)
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = (event) => {
      userInput.value = event.results[0][0].transcript;
    };
    recognition.onend = () => {
      recognizing = false;
      micBtn.textContent = "🎤";
    };
  } else {
    micBtn.disabled = true;
    micBtn.title = "Speech recognition not supported in this browser.";
  }

  // 🎙️ Mic button toggles speech recognition
  micBtn.addEventListener("click", () => {
    if (!recognition) return;
    if (!recognizing) {
      recognition.start();
      micBtn.textContent = "🔴";
      recognizing = true;
    } else {
      recognition.stop();
      micBtn.textContent = "🎤";
      recognizing = false;
    }
  });

  // 🤖 Handle Ask AI button
  askBtn.addEventListener("click", async () => {
    const q = userInput.value.trim();
    if (!q) {
      responseBox.innerText = "Please type or speak a question first.";
      return;
    }

    responseBox.innerHTML = "🤖 Thinking...";

    try {
      const res = await fetch("data/data.json");
      const data = await res.json();
      const answer = getAIResponse(q, data);
      responseBox.innerHTML = answer;
    } catch (err) {
      console.error("Error fetching data:", err);
      responseBox.innerHTML = "⚠️ Sorry, something went wrong fetching the data.";
    }
  });
}

// 🧩 Local AI (rule-based responses)
function getAIResponse(q, data) {
  q = q.toLowerCase();

  if (q.includes("agile"))
    return "Sisir has led Agile transformations, boosting sprint velocity by 30% and driving team collaboration globally.";
  if (q.includes("pmp") || q.includes("cert"))
    return "He holds PMP, PSM I, and PMI-AI certifications — blending leadership, Scrum, and AI expertise.";
  if (q.includes("devops"))
    return "Sisir introduced DevOps automation in Azure, achieving 99.9% uptime and cutting release cycles by 25%.";
  if (q.includes("experience"))
    return "He has 18+ years of experience leading enterprise Agile delivery across TCS and ProcessMAP.";
  if (q.includes("tcs"))
    return "At TCS, Sisir led 20+ global teams improving delivery speed and governance transparency.";
  if (q.includes("processmap"))
    return "At ProcessMAP, he managed SaaS delivery for Fortune 500 clients, achieving 95% customer satisfaction.";
  if (q.includes("ai"))
    return "He integrates AI tools like GitHub Copilot and Microsoft Copilot to accelerate project delivery.";

  return "I’m Sisir’s AI assistant 🤖. Ask me about his Agile experience, leadership, or certifications!";
}
