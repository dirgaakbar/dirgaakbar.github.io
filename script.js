// THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// MOBILE MENU
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

menuIcon.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// CLOSE MENU ON CLICK
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  reveals.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.85) {
      el.style.transitionDelay = ${i * 80}ms;
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// TYPING EFFECT
const roles = [
  "Backend Developer",
  "Web Developer",
  "Networking Specialist",
  "Electrical & AC Technician"
];

let i = 0, j = 0, isDeleting = false;
const typingEl = document.querySelector('.typing');

function typeEffect() {
  const current = roles[i];
  typingEl.textContent = current.slice(0, isDeleting ? --j : ++j);

  if (!isDeleting && j === current.length) {
    setTimeout(() => isDeleting = true, 1500);
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

// YEAR
document.getElementById('year').textContent = new Date().getFullYear();
