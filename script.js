// Dark Mode Toggle
const darkBtn = document.getElementById('darkModeBtn');
darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Hero Slide Animation
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 4000);

// Skill Progress Animation on Scroll
const progressBars = document.querySelectorAll('.progress-bar');
window.addEventListener('scroll', () => {
    const skillSection = document.getElementById('skill');
    const sectionTop = skillSection.offsetTop - window.innerHeight + 200;
    if (window.scrollY > sectionTop) {
        progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-percent');
        });
    }
});

// Highlight Active Menu on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
