// ====== NAV móvil ======
const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector("[data-nav]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// ====== Año footer ======
const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

// ====== Tema oscuro/claro ======
const root = document.documentElement;
const themeBtn = document.querySelector("[data-theme-toggle]");

function setTheme(mode) {
  root.dataset.theme = mode;
  localStorage.setItem("theme", mode);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) setTheme(savedTheme);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const current = root.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

// ====== Animación reveal (scroll) ======
const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => io.observe(el));
