document.addEventListener("DOMContentLoaded", function(){

document.querySelectorAll(".zoom").forEach(img => {
  img.addEventListener("click", () => {

    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    const largeImg = document.createElement("img");
    largeImg.src = img.src;

    lightbox.appendChild(largeImg);
    document.body.appendChild(lightbox);

    lightbox.addEventListener("click", () => {
      lightbox.remove();
    });

  });
});

});