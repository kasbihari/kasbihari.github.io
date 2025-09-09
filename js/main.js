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
        for (const k in map)
          document.documentElement.style.setProperty(k, map[k]);
        localStorage.setItem("theme", key);
        document.getElementById("themeName").textContent = THEMES[key].label;

        // Update animated background
        document.querySelector(".animated-bg").style.background =
          getComputedStyle(document.documentElement).getPropertyValue(
            "--glow-bg"
          );
      }

      // Load saved theme
      const saved = localStorage.getItem("theme");
      applyTheme(saved && THEMES[saved] ? saved : "burgundy-noir");

      // Floating panel toggle
      const themeBtn = document.getElementById("themeToggle");
      const themePanel = document.getElementById("themePanel");
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

      // Year
      document.getElementById("year").textContent = new Date().getFullYear();

      // Intro screen hide (2 seconds longer)
      window.addEventListener("load", () => {
        setTimeout(
          () => document.getElementById("intro").classList.add("hide"),
          2900
        );
      });

      // Scroll reveal / slide
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("show");
              // Add staggered animation for chips
              if (e.target.classList.contains("badge-chips")) {
                const chips = e.target.querySelectorAll(".chip");
                chips.forEach((chip, index) => {
                  chip.style.animationDelay = `${index * 0.1}s`;
                });
              }
              // Animate skill bars
              if (e.target.querySelector(".skill-progress")) {
                const skills = e.target.querySelectorAll(".skill-progress");
                skills.forEach((skill, index) => {
                  setTimeout(() => {
                    skill.style.width = skill.style.width;
                  }, index * 200);
                });
              }
            }
          });
        },
        { threshold: 0.15 }
      );
      document
        .querySelectorAll(".reveal, .slide-left, .slide-right")
        .forEach((el) => io.observe(el));

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Scroll progress
      const progress = document.querySelector(".scroll-progress");
      const setProgress = () => {
        const h = document.documentElement.scrollHeight - innerHeight;
        const pct = Math.min(100, Math.max(0, (scrollY / h) * 100));
        progress.style.width = pct + "%";
      };
      setProgress();
      window.addEventListener("scroll", setProgress, { passive: true });
      window.addEventListener("resize", setProgress);

      // Keyboard focus visible tweak
      document.addEventListener("keyup", (e) => {
        if (e.key === "Tab") document.body.classList.add("using-kb");
      });

      // Hamburger menu functionality
      const hamburgerMenu = document.getElementById("hamburgerMenu");
      const navLinks = document.getElementById("navLinks");

      hamburgerMenu.addEventListener("click", function () {
        this.classList.toggle("active");
        navLinks.classList.toggle("active");
      });

      // Close menu when clicking on a link
      document.querySelectorAll(".nav-link").forEach((link) => {
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

       // Simple slider functionality
       document.addEventListener('DOMContentLoaded', function() {
        const slider = document.querySelector('.project-slider');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        
        // In a real implementation, you would have multiple slides and navigation
        // For this example, we'll just show the navigation buttons
        prevBtn.addEventListener('click', function() {
            alert('Previous project slide');
        });
        
        nextBtn.addEventListener('click', function() {
            alert('Next project slide');
        });

        // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('[data-category]');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    });