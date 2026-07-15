const grid = document.querySelector("[data-projects-grid]");
const filtersWrap = document.querySelector("[data-filters]");
const searchInput = document.querySelector("[data-search]");
const empty = document.querySelector("[data-empty]");

let projects = [];
let activeTag = "all";
let query = "";

function normalize(str) {
  return (str || "").toLowerCase().trim();
}

function createTagButton(tag) {
  const btn = document.createElement("button");
  btn.className = "filter";
  btn.type = "button";
  btn.textContent = tag === "all" ? "Todo" : tag;

  if (tag === activeTag) btn.classList.add("is-active");

  btn.addEventListener("click", () => {
    activeTag = tag;
    render();
    renderFilters();
  });

  return btn;
}

function renderFilters() {
  if (!filtersWrap) return;
  filtersWrap.innerHTML = "";

  const tags = new Set(["all"]);
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));

  [...tags].forEach((tag) => {
    filtersWrap.appendChild(createTagButton(tag));
  });
}

function projectCard(p) {
  const el = document.createElement("article");
  el.className = "project reveal";
  el.innerHTML = `
    <div class="project__media">
      <img src="${p.cover}" alt="Portada del proyecto ${p.title}" loading="lazy" />
    </div>
    <div class="project__body">
      <div class="project__top">
        <h3 class="project__title">${p.title}</h3>
        <span class="project__year">${p.year || ""}</span>
      </div>
      <p class="project__desc">${p.desc}</p>
      <div class="project__tags">
        ${p.tags.map(t => `<span class="pill">${t}</span>`).join("")}
      </div>
    </div>
  `;
  return el;
}

function render() {
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = projects.filter((p) => {
    const matchesTag = activeTag === "all" || p.tags.includes(activeTag);

    const text = normalize(`${p.title} ${p.desc} ${p.tags.join(" ")}`);
    const matchesQuery = !query || text.includes(normalize(query));

    return matchesTag && matchesQuery;
  });

  if (empty) empty.hidden = filtered.length !== 0;

  filtered.forEach((p) => {
    grid.appendChild(projectCard(p));
  });

  // Re-enganchar animación reveal a nuevos elementos
  const newReveals = document.querySelectorAll(".reveal:not(.is-visible)");
  if (window.IntersectionObserver) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 }
    );
    newReveals.forEach((el) => io.observe(el));
  }
}

async function init() {
  try {
    const res = await fetch("data/projects.json");
    projects = await res.json();
    renderFilters();
    render();
  } catch (e) {
    console.error("Error cargando projects.json", e);
  }
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    query = e.target.value;
    render();
  });
}

init();
