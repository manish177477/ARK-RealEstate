document.addEventListener("DOMContentLoaded", function () {

  /* ================= IMAGE SLIDER ================= */

  const images = [
    "assets/images/welcome section.png",
     "assets/images/hero.jpg" ,
     "assets/images/welcome 21.jpg" ,
  ];

  const slider = document.getElementById("heroSlider");
  let index = 0;

  function changeImage() {
    index++;

    if (index >= images.length) {
      index = 0;
    }

    slider.style.opacity = "0";

    setTimeout(() => {
      slider.src = images[index];
      slider.style.opacity = "1";
    }, 400);
  }

  setInterval(changeImage, 3000);


  /* ================= HERO BACKGROUND ANIMATION ================= */

  const hero = document.querySelector(".hero");
  let angle = 0;

  function animateBackground() {
    angle += 0.5;

    hero.style.background = `
      linear-gradient(
        ${angle}deg,
        #cec8c8,
        #f8f6f1,
        #2557a8
      )
    `;

    requestAnimationFrame(animateBackground);
  }

  animateBackground();

});

/* ================= COUNTER ANIMATION ================= */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;

    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});

/* ================= SCROLL ANIMATION ================= */
const cards = document.querySelectorAll('.commitment-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.3 });

cards.forEach(card => observer.observe(card));

/* ================= HAMBURGER MENU ================= */
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close when clicking link
document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});
