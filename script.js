const darkElements = document.querySelectorAll(".dark");

document.querySelector(".theme-icon").addEventListener("click", themeSwitcher);

function themeSwitcher() {
  darkElements.forEach((element) => {
    element.classList.toggle("dark");
    element.classList.toggle("light");
  });
};