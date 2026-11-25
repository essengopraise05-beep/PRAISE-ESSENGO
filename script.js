// Update this address to your real professional email before publishing.
const PORTFOLIO_EMAIL = "essengopraise05@gmail.com";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("praise-portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light");
themeToggle.textContent = document.body.classList.contains("light") ? "☀" : "☾";
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("praise-portfolio-theme", theme);
  themeToggle.textContent = theme === "light" ? "☀" : "☾";
});

document.getElementById("year").textContent = new Date().getFullYear();
const emailLink = document.getElementById("emailLink");
emailLink.textContent = PORTFOLIO_EMAIL;
emailLink.href = `mailto:${PORTFOLIO_EMAIL}`;

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!PORTFOLIO_EMAIL || PORTFOLIO_EMAIL === "your.email@example.com") {
    alert("Please update PORTFOLIO_EMAIL in script.js with your real email address first.");
    return;
  }
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Portfolio enquiry from ${form.get("name")}`);
  const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`);
  window.location.href = `mailto:${PORTFOLIO_EMAIL}?subject=${subject}&body=${body}`;
});

const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
