document.addEventListener("DOMContentLoaded", async () => {
  const content = document.getElementById("content");
  const res = await fetch("data/data.json");
  const data = await res.json();

  content.innerHTML = `
    <section class="hero">
      <div class="hero-content">
        <h2>${data.hero.headline}</h2>
        <p>${data.hero.sub}</p>
        <div class="hero-buttons">
          <a href="Sisir_Senapati_TPM_SSM_AC_DL.pdf" class="btn-primary" download>📄 Download CV</a>
          <a href="${data.contact.linkedin}" target="_blank" class="btn-outline">🔗 LinkedIn</a>
        </div>
      </div>
      <div class="hero-photo"><img src="images/MyPhoto.png" alt="Sisir Senapati"></div>
    </section>

    <section id="about">
      <h3>About Me</h3>
      <ul>${data.about.map(a => `<li>${a}</li>`).join("")}</ul>
    </section>

    <section id="experience">
      <h3>Professional Experience</h3>
      ${data.experience.map(exp => `
        <div>
          <h4><strong>${exp.company}</strong> — ${exp.role}</h4>
          <p><em>${exp.duration}</em></p>
          <ul>${exp.points.map(p => `<li>• ${p}</li>`).join("")}</ul>
        </div>
      `).join("")}
    </section>

    <section id="skills">
      <h3>Core Competencies</h3>
      <div class="grid">${data.skills.map(s => `<div class="chip">${s}</div>`).join("")}</div>
    </section>

    <section id="certs">
      <h3>Certifications & Badges</h3>
      <div class="badges">${data.certifications.map(src => `<img src="${src}" alt="Cert">`).join("")}</div>
    </section>

    <section id="awards">
      <h3>Awards & Recognition</h3>
      <ul>${data.awards.map(a => `<li>${a}</li>`).join("")}</ul>
    </section>

    <section id="contact">
      <h3>Contact</h3>
      <ul>
        <li>📍 ${data.contact.location}</li>
        <li>📧 <a href="mailto:${data.contact.email}">${data.contact.email}</a></li>
        <li>📞 <a href="tel:${data.contact.phone}">${data.contact.phone}</a></li>
        <li>🔗 <a href="${data.contact.linkedin}" target="_blank">${data.contact.linkedin}</a></li>
      </ul>
    </section>

    <section id="aiAssistant" class="ai-assistant">
      <h3>🤖 Ask My AI Assistant</h3>
      <p>Curious about my experience or achievements? Ask below 👇</p>
      <div class="ai-box">
        <textarea id="userQuestion" placeholder="e.g. What’s Sisir’s Agile success story?"></textarea>
        <button id="micBtn" class="mic-btn">🎤</button>
        <button id="askBtn">Ask AI</button>
      </div>
      <div id="aiResponse" class="ai-response">Ask me anything about Sisir’s career or skills.</div>
    </section>
  `;

  // Theme toggle
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  });
});
