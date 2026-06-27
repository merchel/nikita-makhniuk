const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const estimateForm = document.querySelector("[data-estimate-form]");

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("is-open"));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

estimateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(estimateForm);
  const name = data.get("name");
  const phone = data.get("phone");
  const message = data.get("message");
  const subject = encodeURIComponent("Free estimate request");
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\n\nVehicle / damage:\n${message}`
  );

  window.location.href = `mailto:estimate@federalwaybodypaint.com?subject=${subject}&body=${body}`;
});
