const WHATSAPP_NUMBER = ""; // Ej: 549XXXXXXXXXX
const wa = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const mobileNav = document.querySelector("[data-mobile-nav]");

window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 18), { passive: true });
menu.addEventListener("click", () => { header.classList.toggle("open"); mobileNav.classList.toggle("open"); });
mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { header.classList.remove("open"); mobileNav.classList.remove("open"); }));

document.querySelectorAll(".js-wa").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const message = link.dataset.message || "Hola, llegué desde la web de AF Mayorista y quisiera hablar con un asesor.";
    window.dispatchEvent(new CustomEvent("af_whatsapp_click", { detail: { event: link.dataset.event || "whatsapp" } }));
    window.open(wa(message), "_blank", "noopener,noreferrer");
  });
});

const faqButtons = document.querySelectorAll(".faq button");
faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = answer.classList.contains("open");
    document.querySelectorAll(".faq div").forEach((item) => item.classList.remove("open"));
    faqButtons.forEach((item) => item.querySelector("span").textContent = "+");
    if (!isOpen) { answer.classList.add("open"); button.querySelector("span").textContent = "−"; }
  });
});

const form = document.getElementById("leadForm");
const formMsg = document.querySelector("[data-form-msg]");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const data = Object.fromEntries(new FormData(form));
  formMsg.textContent = "Consulta lista. Te abrimos WhatsApp para continuar con un asesor.";
  formMsg.classList.add("show");
  const message = `Hola, llegué desde la web de AF Mayorista. Soy ${data.nombre} de ${data.negocio}, ${data.localidad}. Me interesa ${data.categoria} por una cantidad estimada de ${data.cantidad}. ${data.mensaje || ""}`;
  window.open(wa(message), "_blank", "noopener,noreferrer");
  form.reset();
});

if (window.gsap && window.ScrollTrigger && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".kicker, h1, .hero-text, .actions, .hero-points", { opacity: 0, y: 28, duration: .8, stagger: .08, ease: "power3.out" });
  gsap.from(".hero-card", { opacity: 0, x: 70, duration: 1, delay: .2, ease: "power3.out" });
  gsap.from(".red-beam", { scaleX: 0, transformOrigin: "left", duration: .7, delay: .65, ease: "power2.out" });
  gsap.utils.toArray(".reveal").forEach((el) => gsap.from(el, { opacity: 0, y: 34, duration: .75, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 84%" } }));
  gsap.to(".hero-card", { y: -38, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
}