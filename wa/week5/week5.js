const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function showMenu() {
    var shown = navMenu.classList.toggle("show");
    navMenu.classList.toggle("hide");

    navToggle.setAttribute("aria-expanded", shown ? "true" : "false");
}

navToggle.addEventListener('click', showMenu);

// Keyboard support (Enter/Space)
navToggle.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navMenu.classList.add('hide');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});
