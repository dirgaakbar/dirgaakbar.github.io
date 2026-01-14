// Home Slider
const slides = document.querySelectorAll('.home-slide');
let currentSlide = 0;
setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
},4000);

// Skills Carousel
const skills = document.querySelectorAll('.skill-box');
let currentSkill = 0;
setInterval(() => {
  skills[currentSkill].classList.remove('active');
  currentSkill = (currentSkill + 1) % skills.length;
  skills[currentSkill].classList.add('active');
},2500);

// Dark/Light Mode Toggle
const toggleBtn = document.getElementById('modeToggle');
toggleBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark')?'Light Mode':'Dark Mode';
});
