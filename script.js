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

  // Terminal Typing Effect

  // =============================

  const terminalTextEl = document.getElementById("terminalText");

  const terminalCursorEl = document.getElementById("terminalCursor");


  if (terminalTextEl && terminalCursorEl) {

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


    const typingSpeed = 55; // ms per char

    const linePause = 600; // pause between lines


    function type() {

      if (lineIndex >= lines.length) {

        // Loop effect: small delay, then reset text

        setTimeout(() => {

          terminalTextEl.textContent = "";

          lineIndex = 0;

          charIndex = 0;

          type();

        }, 1300);

        return;

      }


      const currentLine = lines[lineIndex];


      if (charIndex <= currentLine.length) {

        const visible = currentLine.slice(0, charIndex);

        // Keep existing previous lines, only update last

        const prev = terminalTextEl.textContent.split("\n");

        prev[prev.length - 1] = visible;

        terminalTextEl.textContent = prev.join("\n");

        charIndex++;

        setTimeout(type, typingSpeed);

      } else {

        // Finish line and go to next

        terminalTextEl.textContent +=

          (terminalTextEl.textContent ? "\n" : "") + currentLine;

        terminalTextEl.textContent = terminalTextEl.textContent

          .split("\n")

          .slice(0, lineIndex + 1)

          .join("\n");

        lineIndex++;

        charIndex = 0;


        // Prepare next line placeholder

        if (lineIndex < lines.length) {

          terminalTextEl.textContent += "\n";

        }


        setTimeout(type, linePause);

      }

    }


    // Initialize first line placeholder so splitting works

    terminalTextEl.textContent = "";

    setTimeout(type, 500); // run after small delay on load

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
