/* =========
   Theme engine
   ========== */
const THEMES = {
  "burgundy-noir": { label: "Burgundy Noir", vars: {} },
  "elegant-desert": { label: "Elegant Desert", vars: {} },
};

function applyTheme(key) {
  if (!THEMES[key]) return;
  document.documentElement.setAttribute("data-theme", key);
  const map = THEMES[key].vars || {};
  for (const k in map) document.documentElement.style.setProperty(k, map[k]);
  localStorage.setItem("theme", key);
  const themeNameEl = document.getElementById("themeName");
  if (themeNameEl) themeNameEl.textContent = THEMES[key].label;

  // Update animated background
  const bg = document.querySelector(".animated-bg");
  if (bg) {
    bg.style.background = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--glow-bg");
  }
}

// Load saved theme
const saved = localStorage.getItem("theme");
applyTheme(saved && THEMES[saved] ? saved : "burgundy-noir");

// Floating panel toggle
const themeBtn = document.getElementById("themeToggle");
const themePanel = document.getElementById("themePanel");
if (themeBtn && themePanel) {
  themeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    themePanel.classList.toggle("open");
  });
  themePanel.querySelectorAll(".theme-item").forEach((item) => {
    item.addEventListener("click", () => {
      applyTheme(item.dataset.theme);
      themePanel.classList.remove("open");
    });
  });
  // Close panel when clicking outside
  document.addEventListener("click", (e) => {
    if (!themePanel.contains(e.target) && !themeBtn.contains(e.target)) {
      themePanel.classList.remove("open");
    }
  });
}

// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Intro screen hide
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  if (!intro) return;
  setTimeout(() => intro.classList.add("hide"), 2900);
});

/* =========
     Scroll reveal / slide
     ========= */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("show");

      // Animate skill bars inside revealed block
      const bars = e.target.querySelectorAll(".skill-progress");
      bars.forEach((bar, idx) => {
        const target =
          bar.dataset.targetWidth ||
          bar.getAttribute("data-width") ||
          bar.dataset.value ||
          bar.style.getPropertyValue("--target") ||
          bar.dataset.progress ||
          bar.dataset.pct ||
          bar.dataset.w ||
          bar.style.width ||
          "0%";
        setTimeout(() => {
          bar.style.width = target;
        }, idx * 120);
      });
    });
  },
  { threshold: 0.15 }
);
document
  .querySelectorAll(".reveal, .slide-left, .slide-right")
  .forEach((el) => io.observe(el));

/* =========
     Smooth anchor scroll
     ========= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* =========
     Scroll progress
     ========= */
const progress = document.querySelector(".scroll-progress");
function setProgress() {
  if (!progress) return;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const pct =
    h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0;
  progress.style.width = pct + "%";
}
setProgress();
window.addEventListener("scroll", setProgress, { passive: true });
window.addEventListener("resize", setProgress);

/* =========
     Keyboard focus visible tweak
     ========= */
document.addEventListener("keyup", (e) => {
  if (e.key === "Tab") document.body.classList.add("using-kb");
});

/* =========
     Hamburger menu
     ========= */
const hamburgerMenu = document.getElementById("hamburgerMenu");
const navLinks = document.getElementById("navLinks");

if (hamburgerMenu && navLinks) {
  hamburgerMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerMenu.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !hamburgerMenu.contains(e.target) &&
      !navLinks.contains(e.target) &&
      navLinks.classList.contains("active")
    ) {
      hamburgerMenu.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
}

/* =========
     PROJECTS — Filters
     ========= */
(function initProjectFilters() {
  const container = document.getElementById("projects");
  if (!container) return;

  const buttons = container.querySelectorAll(".project-filters .filter-btn");
  const cards = container.querySelectorAll(".row.g-4 [data-category]");

  if (!buttons.length || !cards.length) return;

  function applyFilter(val) {
    cards.forEach((card) => {
      const cat = card.getAttribute("data-category");
      const show = val === "all" || cat === val;
      card.style.display = show ? "" : "none";
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.filter || "all");
    });
  });

  // Init to current active
  const active = Array.from(buttons).find((b) =>
    b.classList.contains("active")
  );
  applyFilter(active ? active.dataset.filter : "all");
})();

/* =========
     PROJECTS — Slider (arrows only)
     ========= */
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".project-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".slider-item"));
  const prevBtn = slider.querySelector("#prev-slide");
  const nextBtn = slider.querySelector("#next-slide");
  const titleEl = slider.querySelector("#sliderTitle");
  const descEl = slider.querySelector("#sliderDesc");

  // Verwijder dots als ze in het HTML staan (we gebruiken ze niet)
  const dotsWrap = slider.querySelector("#sliderDots");
  if (dotsWrap) dotsWrap.remove();

  const slideMeta = [
    {
      title: "Kazora — Luxury Watches",
      desc: "E-commerce design & build (PHP/MySQL + custom UI). Premium look with focus on product photography.",
    },
    {
      title: "Mario Platformer",
      desc: "Coming soon...",
    },
    {
      title: "Finance/Banking Application",
      desc: "Coming soon...",
    },
  ];

  let index = Math.max(
    0,
    slides.findIndex((s) => s.classList.contains("is-active"))
  );
  if (index === -1) index = 0;

  function updateMeta(i) {
    if (!slideMeta[i]) return;
    if (titleEl) titleEl.textContent = slideMeta[i].title;
    if (descEl) descEl.textContent = slideMeta[i].desc;
  }

  function setActive(i) {
    slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
    slider.setAttribute(
      "aria-label",
      `Project slider, slide ${i + 1} van ${slides.length}`
    );
    updateMeta(i);
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    setActive(index);
  }
  function next() {
    goTo(index + 1);
  }
  function prev() {
    goTo(index - 1);
  }

  // Init
  setActive(index);

  // Buttons
  nextBtn && nextBtn.addEventListener("click", next);
  prevBtn && prevBtn.addEventListener("click", prev);

  // Keyboard
  slider.setAttribute("tabindex", "0");
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // Swipe (touch)
  let startX = 0;
  slider.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );
  slider.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        dx < 0 ? next() : prev();
      }
    },
    { passive: true }
  );

  // Autoplay (pauzeert bij hover/focus)
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const AUTOPLAY = !reduceMotion; // respecteer reduce motion
  const INTERVAL = 5000;
  let timer = null;

  function startAutoplay() {
    if (!AUTOPLAY) return;
    stopAutoplay();
    timer = setInterval(next, INTERVAL);
  }
  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  startAutoplay();
  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);
  slider.addEventListener("focusin", stopAutoplay);
  slider.addEventListener("focusout", startAutoplay);
});

/* =========
     Skill bars — voorbereiding (breedtes netjes animeren)
     ========= */
(function prepSkillBars() {
  // Zet alle skill-bars initieel op 0 en bewaar doelbreedte in dataset
  document.querySelectorAll(".skill-progress").forEach((bar) => {
    const inline = bar.style.width || ""; // bv "85%"
    if (inline) {
      bar.dataset.targetWidth = inline;
    }
    bar.style.width = "0%";
  });
})();

/* About Page Specific JavaScript */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Dropdown functionality for passion cards
  const passionCards = document.querySelectorAll('.passion-dropdown');
  
  passionCards.forEach(card => {
    const toggle = card.querySelector('.passion-toggle');
    const header = card.querySelector('.passion-header');
    
    function toggleCard() {
      card.classList.toggle('active');
      const isActive = card.classList.contains('active');
      
      // Animate progress bars when opening
      if (isActive) {
        const progressBars = card.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      }
    }
    
    if (toggle) toggle.addEventListener('click', toggleCard);
    if (header) header.addEventListener('click', toggleCard);
  });
  
  // Culture slider functionality
  const cultureSlides = document.querySelectorAll('.culture-slide');
  const cultureDots = document.querySelectorAll('.culture-dots .dot');
  const prevBtn = document.querySelector('.culture-prev');
  const nextBtn = document.querySelector('.culture-next');
  let currentSlide = 0;
  
  function showSlide(index) {
    // Remove active class from all slides and dots
    cultureSlides.forEach(slide => slide.classList.remove('active'));
    cultureDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    cultureSlides[index].classList.add('active');
    cultureDots[index].classList.add('active');
    currentSlide = index;
  }
  
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= cultureSlides.length) nextIndex = 0;
    showSlide(nextIndex);
  }
  
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) prevIndex = cultureSlides.length - 1;
    showSlide(prevIndex);
  }
  
  // Add click events to dots
  cultureDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Add click events to navigation buttons
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Auto-rotate culture slides (every 5 seconds)
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause auto-rotation on hover
  const cultureSlider = document.querySelector('.culture-slider');
  if (cultureSlider) {
    cultureSlider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    cultureSlider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  }
  
  // Animate progress meters when they come into view
  const meters = document.querySelectorAll('.meter-fill');
  const meterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const meter = entry.target;
        const width = meter.style.width;
        meter.style.width = '0%';
        
        setTimeout(() => {
          meter.style.width = width;
        }, 300);
        
        // Unobserve after animating
        meterObserver.unobserve(meter);
      }
    });
  }, { threshold: 0.5 });
  
  meters.forEach(meter => meterObserver.observe(meter));
  
  // Animate timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });
  
  timelineItems.forEach(item => timelineObserver.observe(item));
  
  // Add click animation to trait cards
  const traitCards = document.querySelectorAll('.trait-card');
  traitCards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
  
  // Keyboard navigation for culture slider
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Initialize first passion card as open
  if (passionCards.length > 0) {
    passionCards[0].classList.add('active');
  }
});

// Make sure all scripts run after page is fully loaded
window.addEventListener('load', function() {
  // Force a reflow to trigger animations
  document.body.clientHeight;
});