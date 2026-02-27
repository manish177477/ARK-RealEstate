/* =========================================================
   ARK Realty Homes - script.js (CLEAN + WORKING)
   - Hero background image slider (with fade)
   - Counter animation (runs once when visible)
   - Commitment cards reveal on scroll
   - Hamburger menu toggle + close on link click
   NOTE: Remove <img id="heroSlider"> from hero if using bg slider
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO BACKGROUND IMAGE SLIDER ================= */

  const hero = document.querySelector(".hero");

  // If hero exists, run background slider
  if (hero) {
    const images = [
      "assets/images/hero1.jpg",
      "assets/images/hero 2.jpg",
      "assets/images/hero 3.jpg",
    ];

    // Preload images for smoother transition
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let index = 0;

    // Ensure base bg properties
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
    hero.style.backgroundRepeat = "no-repeat";
    hero.style.transition = "opacity 350ms ease";

    function setHeroBg(i) {
      // handles spaces in file names reliably
      const safeUrl = encodeURI(images[i]);
      hero.style.backgroundImage = `url("${safeUrl}")`;
    }

    // initial
    setHeroBg(index);

    // change
    setInterval(() => {
      hero.style.opacity = "0.92";

      setTimeout(() => {
        index = (index + 1) % images.length;
        setHeroBg(index);
        hero.style.opacity = "1";
      }, 350);
    }, 3000);
  }


  /* ================= COMMITMENT CARDS REVEAL ================= */
  const cards = document.querySelectorAll(".commitment-card");

  if (cards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    }, { threshold: 0.3 });

    cards.forEach((card) => observer.observe(card));
  }


  /* ================= HAMBURGER MENU ================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }


  /* ================= COUNTERS (RUN ONCE WHEN VISIBLE) ================= */
  const counters = document.querySelectorAll(".counter");

  if (counters.length) {
    const runCounter = (counter) => {
      const target = Number(counter.getAttribute("data-target")) || 0;
      const duration = 1200; // ms
      const start = 0;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + (target - start) * progress);
        counter.innerText = value.toLocaleString("en-IN");

        if (progress < 1) requestAnimationFrame(step);
        else counter.innerText = target.toLocaleString("en-IN");
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;

        // Run only once
        if (counter.dataset.done === "true") return;
        counter.dataset.done = "true";

        runCounter(counter);
      });
    }, { threshold: 0.35 });

    counters.forEach((counter) => counterObserver.observe(counter));
  }

});