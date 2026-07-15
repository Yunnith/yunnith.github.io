const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    projects.forEach(project => {

      const category = project.dataset.category;

      if (filter === "all" || category === filter) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }

    });

  });
});