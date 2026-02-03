// =============================
// DOM Ready Helper
// =============================
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
  // Smooth scroll for nav links
  // =============================
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // =============================
  // Theme toggle (Dark / Light)
  // =============================
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const THEME_KEY = "portfolio-theme";

  function applyTheme(theme) {
    if (!theme) return;
    body.setAttribute("data-theme", theme);
    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "🌙" : "🌞";
    }
  }

  // Initial theme from localStorage or prefers-color-scheme
  (function initTheme() {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") {
      applyTheme(stored);
    } else {
      // default dark, but respect system if explicitly light
      const prefersDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "dark");
    }
  })();

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = body.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      window.localStorage.setItem(THEME_KEY, next);
    });
  }

  // =============================
  // =============================
  // Terminal Typing Effect
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
    let currentDisplay = ""; 

    const typingSpeed = 50; 
    const linePause = 700; 

    function type() {
      // Jika semua baris selesai, reset setelah jeda lama
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          terminalTextEl.textContent = "";
          currentDisplay = "";
          lineIndex = 0;
          charIndex = 0;
          type();
        }, 2000);
        return;
      }

      const currentLineText = lines[lineIndex];

      if (charIndex < currentLineText.length) {
        // Tambah karakter satu per satu
        terminalTextEl.textContent = currentDisplay + currentLineText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        // Baris selesai, tambahkan ke display permanen dan pindah baris
        currentDisplay += currentLineText + "\n";
        terminalTextEl.textContent = currentDisplay;
        lineIndex++;
        charIndex = 0;
        setTimeout(type, linePause);
      }
    }

    // Mulai animasi
    terminalTextEl.textContent = "";
    setTimeout(type, 800);
  }
  // =============================
  // Contact form (Formspree Integration)
  // =============================
  const contactForm = document.getElementById("contactForm");
  const feedbackEl = document.getElementById("formFeedback");

  if (contactForm && feedbackEl) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault(); // Kita tahan sebentar untuk proses AJAX agar lebih smooth

      const formData = new FormData(contactForm);
      feedbackEl.textContent = "Sedang mengirim pesan...";
      feedbackEl.style.color = "var(--text-color)"; // Sesuaikan dengan variabel CSS Anda

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Jika Berhasil
          contactForm.reset();
          feedbackEl.textContent = "Terima kasih! Pesanmu sudah berhasil terkirim.";
          feedbackEl.style.color = "#4caf50"; // Warna Hijau
        } else {
          // Jika Gagal dari server
          feedbackEl.textContent = "Oops! Ada kendala teknis. Coba lagi nanti.";
          feedbackEl.style.color = "#f44336"; // Warna Merah
        }
      } catch (error) {
        // Jika Gagal koneksi
        feedbackEl.textContent = "Gagal terhubung ke server. Periksa koneksi internet Anda.";
        feedbackEl.style.color = "#f44336";
      }

      // Hilangkan pesan feedback setelah 5 detik
      setTimeout(() => {
        feedbackEl.textContent = "";
      }, 5000);
    });
  }
