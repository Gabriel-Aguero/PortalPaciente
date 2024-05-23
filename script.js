const menu = document.getElementById("menu");
const navItems = document.getElementById("nav-items");

menu.addEventListener("click", (e) => {
  e.preventDefault();
  navItems.className += "menu-responsive";
});
