// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight / 1.15){
      el.classList.add('active');
    }
  });
});

// Typing Effect
const roles = [
  "Junior Backend Developer",
  "Web Developer",
  "Web Design Wordpress",
  "Network Technician",
  "Electrician & AC Technician"
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
