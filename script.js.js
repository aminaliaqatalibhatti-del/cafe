const loader = document.querySelector(".loader-wrapper");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-target]");
const reviewCards = document.querySelectorAll(".review-card");
const reservationForm = document.querySelector(".reservation-form");

if (loader) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }, 1000);
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      let started = false;

      const updateCounter = () => {
        const value = Number(counter.dataset.value || 0);
        const increment = target / 100;
        const nextValue = Math.min(value + increment, target);
        counter.dataset.value = String(nextValue);
        counter.textContent = `${Math.ceil(nextValue)}`;

        if (nextValue < target) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.dataset.value = String(target);
        }
      };

      if (!started) {
        started = true;
        counter.dataset.value = "0";
        updateCounter();
      }

      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

let activeReviewIndex = 0;

function showReview(index) {
  reviewCards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
}

if (reviewCards.length > 0) {
  showReview(0);
  setInterval(() => {
    activeReviewIndex = (activeReviewIndex + 1) % reviewCards.length;
    showReview(activeReviewIndex);
  }, 4200);
}

const heroSection = document.querySelector(".hero");

if (heroSection) {
  heroSection.addEventListener("pointermove", (event) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    heroSection.style.setProperty("--pointer-x", `${x}%`);
    heroSection.style.setProperty("--pointer-y", `${y}%`);
  });
}

if (reservationForm) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Your reservation request has been received. We will contact you soon.");
    reservationForm.reset();
  });
}
