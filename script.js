
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const currentYear = document.getElementById("currentYear");

  // Automatic copyright year
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Accessible mobile navigation
  if (navToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        navToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("is-open") &&
        !navLinks.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // Highlight the current section in navigation
  const sections = document.querySelectorAll("main section[id]");
  const sectionLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          sectionLinks.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") === `#${entry.target.id}`;

            if (isCurrent) {
              link.classList.add("active");
              link.setAttribute("aria-current", "location");
            } else {
              link.classList.remove("active");
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
