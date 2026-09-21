// Swap between the three pages without reloading the site.
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const pageTriggers = document.querySelectorAll("[data-page]");   // nav links, logo and buttons
const validPages = ["home", "televisions", "about"];

function showPage(pageName, moveFocus) {
  if (!validPages.includes(pageName)) {
    pageName = "home";
  }

  // Show only the chosen page
  pages.forEach(page => {
    page.hidden = page.id !== "page-" + pageName;
  });

  // Feedback: highlight the nav link for the page the user is on
  navLinks.forEach(link => {
    const isCurrent = link.dataset.page === pageName;
    link.classList.toggle("active", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const current = document.getElementById("page-" + pageName);
  document.title = "Watt Watch | " + current.dataset.title;

  window.scrollTo(0, 0);
  if (moveFocus) {
    current.querySelector("h1").focus();   // helps screen reader and keyboard users
  }
}

// Nav links, the logo and the Home page button all use data-page
pageTriggers.forEach(trigger => {
  trigger.addEventListener("click", event => {
    event.preventDefault();
    const target = trigger.dataset.page;
    if (location.hash === "#" + target) {
      showPage(target, true);
    } else {
      location.hash = target;      // triggers hashchange below, so Back/Forward buttons work
    }
  });
});

window.addEventListener("hashchange", () => {
  showPage(location.hash.slice(1), true);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// First load: open the page named in the URL, or Home
showPage(location.hash.slice(1), false);
