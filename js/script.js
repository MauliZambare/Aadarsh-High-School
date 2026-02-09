document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("whatsappForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let message = document.getElementById("message").value;

      let whatsappMessage =
        `Hello Aadarsh High School,%0A%0A` +
        `Name: ${name}%0A` +
        `Email: ${email}%0A` +
        `Message: ${message}`;

      let phoneNumber = "919960308870";

      let whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

      window.open(whatsappURL, "_blank");
    });
  }

  const slider = document.querySelector(".slider");
  const track = document.querySelector(".slides");
  if (!slider || !track) return;

  const originals = Array.from(track.children);
  if (originals.length === 0) return;

  const firstClone = originals[0].cloneNode(true);
  const lastClone = originals[originals.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, originals[0]);

  let index = 1;
  let slideWidth = slider.clientWidth;

  const setPosition = (withTransition) => {
    track.style.transition = withTransition ? "transform 0.8s ease" : "none";
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  };

  setPosition(false);

  window.addEventListener("resize", () => {
    slideWidth = slider.clientWidth;
    setPosition(false);
  });

  const moveNext = () => {
    index += 1;
    setPosition(true);
  };

  setInterval(moveNext, 4000);

  track.addEventListener("transitionend", () => {
    const total = track.children.length;
    if (index === total - 1) {
      index = 1;
      setPosition(false);
    } else if (index === 0) {
      index = total - 2;
      setPosition(false);
    }
  });

  const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const teacherCards = Array.from(document.querySelectorAll(".teacher-card"));

  const applyFilter = (subject) => {
    teacherCards.forEach((card) => {
      const cardSubject = card.dataset.subject;
      const show = subject === "all" || cardSubject === subject;
      card.style.display = show ? "" : "none";
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.subject);
    });
  });

  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      if (themeToggle) themeToggle.textContent = "☀️ Light";
    } else {
      document.body.removeAttribute("data-theme");
      if (themeToggle) themeToggle.textContent = "🌙 Dark";
    }
  };

  applyTheme(savedTheme || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.getAttribute("data-theme") === "dark";
      const nextTheme = isDark ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
  if (testimonialCards.length > 0) {
    let activeIndex = 0;

    const showTestimonial = (nextIndex) => {
      testimonialCards[activeIndex].classList.remove("active");
      activeIndex = nextIndex;
      testimonialCards[activeIndex].classList.add("active");
    };

    setInterval(() => {
      const nextIndex = (activeIndex + 1) % testimonialCards.length;
      showTestimonial(nextIndex);
    }, 5000);
  }
});
