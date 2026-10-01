/* ========================================
   MOBILE MENU
======================================== */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

if (menuToggle && mobileMenu) {

  menuToggle.addEventListener("click", () => {

    const isOpen =
      menuToggle.classList.toggle("active");

    mobileMenu.classList.toggle("active");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

  });


  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open menu"
      );

    });

  });

}


/* ========================================
   SMOOTH SCROLL NAVIGATION
======================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function (e) {

    const targetId =
      this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target =
      document.querySelector(targetId);

    if (!target) {
      return;
    }

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    /* CLOSE MOBILE MENU */

    if (mobileMenu && menuToggle) {

      mobileMenu.classList.remove("active");
      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open menu"
      );

    }

  });

});


/* ========================================
   SCROLL REVEAL
======================================== */

const revealElements =
  document.querySelectorAll(
    ".about-heading, .about-content, " +
    ".skills-heading, .skill-card, " +
    ".projects-heading, .project-card, " +
    ".journey-heading, .journey-item, " +
    ".certificates-heading, .certificate-group, " +
    ".beyond-heading, .beyond-card, " +
    ".contact-heading, .contact-action, .contact-socials"
  );


revealElements.forEach(element => {

  element.classList.add("reveal");

});


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15
      }
    );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });

} else {

  revealElements.forEach(element => {

    element.classList.add("active");

  });

}


/* ========================================
   ACTIVE NAVIGATION
======================================== */

const navLinks =
  document.querySelectorAll(
    '.nav a[href^="#"]'
  );

const sections =
  document.querySelectorAll(
    "section[id]"
  );


function setActiveNav(id) {

  navLinks.forEach(link => {

    const linkTarget =
      link.getAttribute("href");

    if (linkTarget === "#" + id) {

      link.classList.add("active");

    } else {

      link.classList.remove("active");

    }

  });

}


function updateActiveNav() {

  const scrollPosition =
    window.scrollY + 200;

  let currentSection = "home";


  sections.forEach(section => {

    const sectionTop =
      section.offsetTop;

    if (scrollPosition >= sectionTop) {

      currentSection =
        section.getAttribute("id");

    }

  });


  setActiveNav(currentSection);

}


window.addEventListener(
  "scroll",
  updateActiveNav,
  { passive: true }
);


window.addEventListener(
  "load",
  updateActiveNav
);


navLinks.forEach(link => {

  link.addEventListener("click", function () {

    const target =
      this.getAttribute("href");

    if (!target || target === "#") {
      return;
    }

    const section =
      document.querySelector(target);

    if (!section) {
      return;
    }

    setActiveNav(
      section.getAttribute("id")
    );

  });

});


/* ========================================
   DARK MODE
======================================== */

const themeToggle =
  document.getElementById("themeToggle");

const themeIcon =
  document.querySelector(".theme-icon");


function applyTheme(theme) {

  if (theme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeIcon) {
      themeIcon.textContent = "☀";
    }

  } else {

    document.body.classList.remove("dark-mode");

    if (themeIcon) {
      themeIcon.textContent = "☾";
    }

  }

}


/* LOAD SAVED THEME */

const savedTheme =
  localStorage.getItem("theme");


if (savedTheme) {

  applyTheme(savedTheme);

} else {

  applyTheme("light");

}


/* TOGGLE */

if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    function () {

      const isDark =
        document.body.classList.contains(
          "dark-mode"
        );


      if (isDark) {

        applyTheme("light");

        localStorage.setItem(
          "theme",
          "light"
        );

      } else {

        applyTheme("dark");

        localStorage.setItem(
          "theme",
          "dark"
        );

      }

    }
  );

}


/* ========================================
   HEADER REAL-TIME CLOCK
======================================== */

const headerTime =
  document.getElementById("headerTime");


function updateHeaderTime() {

  if (!headerTime) {
    return;
  }


  const now = new Date();


  const time =
    new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).formatToParts(now);


  const hours =
    time.find(
      part => part.type === "hour"
    ).value;

  const minutes =
    time.find(
      part => part.type === "minute"
    ).value;

  const seconds =
    time.find(
      part => part.type === "second"
    ).value;


  headerTime.innerHTML = `
    <span class="clock-time">
      ${hours}:${minutes}:<span class="clock-seconds">${seconds}</span>
    </span>
    <small>WIB</small>
  `;


  const secondsElement =
    headerTime.querySelector(
      ".clock-seconds"
    );


  if (secondsElement) {

    secondsElement.classList.remove("tick");

    void secondsElement.offsetWidth;

    secondsElement.classList.add("tick");

  }

}


updateHeaderTime();

setInterval(
  updateHeaderTime,
  1000
);


/* ========================================
   LUCIDE ICONS
======================================== */

if (typeof lucide !== "undefined") {

  lucide.createIcons();

}


/* ========================================
   PROJECT FADE IN
======================================== */

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


if ("IntersectionObserver" in window) {

  const projectObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "project-active"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
      }
    );


  projectCards.forEach(card => {

    projectObserver.observe(card);

  });


} else {

  projectCards.forEach(card => {

    card.classList.add(
      "project-active"
    );

  });

}


/* ========================================
   ABOUT STATS COUNT UP
======================================== */

const statNumbers =
  document.querySelectorAll(
    ".stat-number[data-target]"
  );


if ("IntersectionObserver" in window) {

  const statsObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          const element =
            entry.target;

          const target =
            Number(element.dataset.target);

          const suffix =
            element.dataset.suffix || "";


          const duration = 1200;

          const startTime =
            performance.now();


          function updateCount(currentTime) {

            const progress =
              Math.min(
                (currentTime - startTime) /
                duration,
                1
              );


            const easedProgress =
              1 -
              Math.pow(
                1 - progress,
                3
              );


            const currentValue =
              Math.floor(
                easedProgress * target
              );


            element.textContent =
              currentValue + suffix;


            if (progress < 1) {

              requestAnimationFrame(
                updateCount
              );

            } else {

              element.textContent =
                target + suffix;

            }

          }


          requestAnimationFrame(
            updateCount
          );


          observer.unobserve(element);

        });

      },
      {
        threshold: 0.5
      }
    );


  statNumbers.forEach(stat => {

    statsObserver.observe(stat);

  });


} else {

  /* FALLBACK */

  statNumbers.forEach(stat => {

    const target =
      stat.dataset.target;

    const suffix =
      stat.dataset.suffix || "";

    stat.textContent =
      target + suffix;

  });

}