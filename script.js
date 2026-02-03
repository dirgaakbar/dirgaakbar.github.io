function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(function () {
  // =============================
  // Year in footer
  // =============================
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // =============================
  // Smooth scroll
  // =============================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // =============================
  // Theme toggle
  // =============================
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const THEME_KEY = "portfolio-theme";

  function applyTheme(theme) {
    body.setAttribute("data-theme", theme);
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "🌙" : "🌞";
  }

  const savedTheme = window.localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const next = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      window.localStorage.setItem(THEME_KEY, next);
    });
  }

  // =============================
  // Terminal Typing Effect (FIXED)
  // =============================
  const terminalTextEl = document.getElementById("terminalText");

  if (terminalTextEl) {
    const lines = [
      "$ npm init -y",
      "$ npm install react react-dom",
      "$ git init",
      "$ git add .",
      '$ git commit -m "feat: initial setup"',
      "$ npm run dev",
      "# Deploying to production...",
      "# Done. Portfolio is live."
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentText = ""; // Menyimpan baris yang sudah selesai diketik

    function type() {
      // Jika semua baris selesai diketik
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          terminalTextEl.textContent = "";
          currentText = "";
          lineIndex = 0;
          charIndex = 0;
          type();
        }, 2000); // Tunggu sebelum reset
        return;
      }

      const currentLineContent = lines[lineIndex];

      // Animasi per karakter
      if (charIndex < currentLineContent.length) {
        terminalTextEl.textContent = currentText + currentLineContent.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, 50);
      } else {
        // Baris ini selesai, simpan ke currentText dan pindah ke baris berikutnya
        currentText += currentLineContent + "\n";
        terminalTextEl.textContent = currentText;
        lineIndex++;
        charIndex = 0;
        setTimeout(type, 600); // Jeda antar baris
      }
    }

    terminalTextEl.textContent = "";
    setTimeout(type, 500);
  }

  // =============================
  // Contact form (Formspree Integration)
  // =============================
  const contactForm = document.getElementById("contactForm");
  const feedbackEl = document.getElementById("formFeedback");

  if (contactForm && feedbackEl) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      feedbackEl.textContent = "Sedang mengirim pesan...";
      feedbackEl.className = "form-feedback"; // Reset class

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactForm.reset();
          feedbackEl.textContent = "Terima kasih! Pesanmu sudah terkirim.";
          feedbackEl.style.color = "#4caf50";
        } else {
          feedbackEl.textContent = "Oops! Ada kendala mengirim pesan.";
          feedbackEl.style.color = "#f44336";
        }
      } catch (error) {
        feedbackEl.textContent = "Gagal terhubung ke server.";
        feedbackEl.style.color = "#f44336";
      }

      setTimeout(() => { feedbackEl.textContent = ""; }, 5000);
    });
  }
});
