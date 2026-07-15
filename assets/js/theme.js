function toggleTheme() {
  const body = document.body;
  body.dataset.theme =
    body.dataset.theme === "light" ? "dark" : "light";
}