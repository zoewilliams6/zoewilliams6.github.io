// Nav Toggle 
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

function showMenu() {
  const shown = navMenu.classList.toggle("show");
  navMenu.classList.toggle("hide");
  navToggle.setAttribute("aria-expanded", shown ? "true" : "false");
}

navToggle.addEventListener("click", showMenu);

navToggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    showMenu();
  }
});

document.addEventListener("click", (e) => {
  if (
    !navToggle.contains(e.target) &&
    !navMenu.contains(e.target) &&
    navMenu.classList.contains("show")
  ) {
    navMenu.classList.remove("show");
    navMenu.classList.add("hide");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

//    Resource Filter  - I used AI to help me build this out 

const categoryFilter = document.querySelector("#category");
const typeFilter = document.querySelector("#type");
const resourceItems = document.querySelectorAll(".content article");

function filterResources() {
  const categoryValue = categoryFilter ? categoryFilter.value : "all";
  const typeValue = typeFilter ? typeFilter.value : "all";

  resourceItems.forEach((item) => {
    const category = item.getAttribute("data-category");
    const type = item.getAttribute("data-type");

    const categoryMatch = categoryValue === "all" || category === categoryValue;
    const typeMatch = typeValue === "all" || type === typeValue;

    if (categoryMatch && typeMatch) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// I used AI to help me build this out
if (categoryFilter && typeFilter) {
  categoryFilter.addEventListener("input", filterResources);
  typeFilter.addEventListener("input", filterResources);
}


//    Form Validation - I used AI to help me build this out 

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const nameInput = contactForm.querySelector("#name");
    const emailInput = contactForm.querySelector("#email");
    let valid = true;
    let errorMessage = "";

    if (!nameInput.value.trim()) {
      valid = false;
      errorMessage += "Name is required. ";
    }

    if (!emailInput.value.trim()) {
      valid = false;
      errorMessage += "Email is required. ";
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
      valid = false;
      errorMessage += "Email is not valid. ";
    }

    if (!valid) {
      e.preventDefault();
      alert(errorMessage);
    } else {
      alert("Thank you! Your message has been sent.");
    }
  });
}
