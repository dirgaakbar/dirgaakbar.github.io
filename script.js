// === Scroll Reveal with debounce ===
const reveals = document.querySelectorAll('.reveal');

let scrollTimeout;
window.addEventListener('scroll', () => {
  if(scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if(top < window.innerHeight / 1.15){
        el.classList.add('active');
      }
    });
  }, 20);
});

// === Typing Effect ===
const roles = [
  "Backend Developer",
  "Web Developer",
  "Networking Specialist",
  "Electrical & AC Technician"
];

let i = 0, j = 0;
let current = "";
let isDeleting = false;
const typing = document.querySelector(".typing");

function typeEffect(){
  if(i === roles.length) i = 0;
  current = roles[i];

  if(!isDeleting){
    typing.textContent = current.slice(0, ++j);
    if(j === current.length){
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typing.textContent = current.slice(0, --j);
    if(j === 0){
      isDeleting = false;
      i++;
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

// === Dark/Light Mode Toggle ===
const toggle = document.querySelector("#theme-toggle");
toggle.addEventListener("click", () => {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === "light" ? "dark" : "light";
});
