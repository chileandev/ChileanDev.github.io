function toggleMenu() {
    const navbarLinks = document.getElementById("navbarLinks");
    const menuIcon = document.getElementById("menuIcon");
    navbarLinks.classList.toggle("mobile");
    menuIcon.classList.toggle("active");
}