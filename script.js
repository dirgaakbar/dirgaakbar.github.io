// 1. Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// 2. Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuIcon.querySelector('i').classList.toggle('fa-times');
});

// Tutup menu saat link diklik (untuk mobile)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuIcon.querySelector('i').classList.remove('fa-times');
    });
});

// 3. Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
const scrollHandler = () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < window.innerHeight / 1.2){
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', scrollHandler);
window.addEventListener('load', scrollHandler); // Jalankan saat pertama load

// 4. Typing Effect
const roles = [
    "Backend Developer",
    "Web Developer",
    "Networking Specialist",
    "Electrical & AC Technician"
];
let i = 0, j = 0, isDeleting = false;
const typingEl = document.querySelector(".typing");

function typeEffect(){
    let current = roles[i];
    if(!isDeleting){
        typingEl.textContent = current.slice(0, ++j);
        if(j === current.length){
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        typingEl.textContent = current.slice(0, --j);
        if(j === 0){
            isDeleting = false;
            i = (i + 1) % roles.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// 5. Auto Year
document.getElementById('year').textContent = new Date().getFullYear();
