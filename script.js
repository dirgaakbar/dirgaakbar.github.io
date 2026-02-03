document.addEventListener("DOMContentLoaded", () => {
  
  // =============================
  // 1. YEAR IN FOOTER
  // =============================
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // =============================
  // 2. THEME TOGGLE (Dark / Light)
  // =============================
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const THEME_KEY = "portfolio-theme";

  function applyTheme(theme) {
    body.setAttribute("data-theme", theme);
    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "🌙" : "🌞";
    }
    window.localStorage.setItem(THEME_KEY, theme);
  }

  // Cek tema sebelumnya atau gunakan default dark
  const savedTheme = window.localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = body.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  // =============================
  // 3. TERMINAL TYPING EFFECT
  // =============================
  const terminalTextEl = document.getElementById("terminalText");
  if (terminalTextEl) {
    const lines = [
      "$ npm init -y",
      "$ npm install react react-dom",
      "$ git init",
      "$ git add .",
      '$ git commit -m "feat: setup"',
      "$ npm run dev",
      "# Deploying...",
      "# Portfolio is live."
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentDisplay = "";

    function type() {
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          terminalTextEl.textContent = "";
          currentDisplay = "";
          lineIndex = 0;
          charIndex = 0;
          type();
        }, 3000);
        return;
      }

      const currentLineText = lines[lineIndex];

      if (charIndex < currentLineText.length) {
        terminalTextEl.textContent = currentDisplay + currentLineText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, 50);
      } else {
        currentDisplay += currentLineText + "\n";
        terminalTextEl.textContent = currentDisplay;
        lineIndex++;
        charIndex = 0;
        setTimeout(type, 800);
      }
    }
    type();
  }

  // =============================
  // 4. CONTACT FORM (Formspree)
  // =============================
  const contactForm = document.getElementById("contactForm");
  const feedbackEl = document.getElementById("formFeedback");

  if (contactForm && feedbackEl) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      feedbackEl.textContent = "Mengirim...";
      
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactForm.reset();
          feedbackEl.textContent = "Terkirim!";
          feedbackEl.style.color = "#4caf50";
        } else {
          feedbackEl.textContent = "Gagal kirim.";
          feedbackEl.style.color = "#f44336";
        }
      } catch (err) {
        feedbackEl.textContent = "Error koneksi.";
      }
      setTimeout(() => { feedbackEl.textContent = ""; }, 4000);
    });
  }
});
