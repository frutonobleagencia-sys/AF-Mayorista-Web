const WHATSAPP_NUMBER = ""; // Ej: 549XXXXXXXXXX
const CATALOGO_DRIVE_URL = "";
const BUSINESS_ADDRESS = "";
const BUSINESS_HOURS = "";
const BUSINESS_EMAIL = "admairflowstore@gmail.com";

const BUSINESS_DATA = {
  email: BUSINESS_EMAIL,
  whatsapp: WHATSAPP_NUMBER,
  address: BUSINESS_ADDRESS,
  hours: BUSINESS_HOURS,
  instagram: "",
  retailWebsite: "https://www.airflowcf.com.ar",
  catalogDriveUrl: CATALOGO_DRIVE_URL
};

const wa = (message) => `https://wa.me/${BUSINESS_DATA.whatsapp}?text=${encodeURIComponent(message)}`;
const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const catalogStatus = document.querySelector("[data-catalog-status]");

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

document.querySelectorAll(".js-catalog").forEach((link) => {
  if (BUSINESS_DATA.catalogDriveUrl) {
    link.href = BUSINESS_DATA.catalogDriveUrl;
  }
  link.addEventListener("click", (event) => {
    if (!BUSINESS_DATA.catalogDriveUrl) {
      event.preventDefault();
      if (catalogStatus) catalogStatus.textContent = "La URL del catálogo de Drive está pendiente de completar.";
    }
  });
});

document.querySelectorAll('[data-business="address"]').forEach((el) => { el.textContent = BUSINESS_DATA.address || "Dirección pendiente de completar"; });
document.querySelectorAll('[data-business="hours"]').forEach((el) => { el.textContent = BUSINESS_DATA.hours || "Horarios pendientes de completar"; });
document.querySelectorAll('[data-business="email"]').forEach((el) => { el.textContent = BUSINESS_DATA.email; el.href = `mailto:${BUSINESS_DATA.email}`; });
document.querySelectorAll('[data-business="instagram"]').forEach((el) => {
  if (BUSINESS_DATA.instagram) {
    el.href = BUSINESS_DATA.instagram;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
    el.innerHTML = '<svg class="social-icon"><use href="#icon-instagram"></use></svg>Instagram';
  } else {
    el.removeAttribute("href");
    el.setAttribute("aria-disabled", "true");
  }
});
document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

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
  const safe = (value) => String(value || "").trim();
  const message = [
    "Hola, llegué desde la web de AF Mayorista y quiero recibir asesoramiento personalizado.",
    `Nombre y apellido: ${safe(data.nombre)}`,
    `Nombre fantasía: ${safe(data.fantasia)}`,
    `Localidad: ${safe(data.localidad)}`,
    `WhatsApp: ${safe(data.whatsapp)}`,
    `Cantidad estimada: ${safe(data.cantidad)}`,
    `Categoría de interés: ${safe(data.categoria)}`
  ].join("\n");

  formMsg.textContent = "Consulta lista. Te abrimos WhatsApp para continuar con un asesor.";
  formMsg.classList.add("show");
  window.dispatchEvent(new CustomEvent("af_form_submit", { detail: { category: safe(data.categoria) } }));
  window.open(wa(message), "_blank", "noopener,noreferrer");
  form.reset();
});

const overlay = document.querySelector("[data-diffusion-overlay]");
const modal = document.querySelector("[data-diffusion-modal]");
const closeButtons = document.querySelectorAll("[data-diffusion-close]");
const diffusionAction = document.querySelector("[data-diffusion-action]");
const popupStorageKey = "afMayoristaDiffusionClosedAt";
const popupCooldown = 7 * 24 * 60 * 60 * 1000;
let lastFocusedElement = null;

function canShowPopup() {
  const closedAt = Number(localStorage.getItem(popupStorageKey) || 0);
  return !closedAt || Date.now() - closedAt > popupCooldown;
}

function focusableElements() {
  return Array.from(modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
}

function openPopup() {
  if (!overlay || !modal || !canShowPopup()) return;
  lastFocusedElement = document.activeElement;
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("is-open"));
  document.body.classList.add("modal-open");
  modal.focus();
}

function closePopup(save = true) {
  if (!overlay || !modal || overlay.hidden) return;
  overlay.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  if (save) localStorage.setItem(popupStorageKey, String(Date.now()));
  window.setTimeout(() => { overlay.hidden = true; }, 260);
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
}

if (overlay && modal) {
  window.setTimeout(openPopup, 9000);
  closeButtons.forEach((button) => button.addEventListener("click", () => closePopup(true)));
  overlay.addEventListener("click", (event) => { if (event.target === overlay) closePopup(true); });
  diffusionAction?.addEventListener("click", () => closePopup(true));
  document.addEventListener("keydown", (event) => {
    if (overlay.hidden) return;
    if (event.key === "Escape") closePopup(true);
    if (event.key !== "Tab") return;
    const items = focusableElements();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
}

if (window.gsap && window.ScrollTrigger && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".kicker, h1, .hero-text, .actions, .hero-points", { opacity: 0, y: 28, duration: .8, stagger: .08, ease: "power3.out" });
  gsap.from(".hero-card", { opacity: 0, x: 70, duration: 1, delay: .2, ease: "power3.out" });
  gsap.from(".red-beam", { scaleX: 0, transformOrigin: "left", duration: .7, delay: .65, ease: "power2.out" });
  gsap.utils.toArray(".reveal").forEach((el) => gsap.from(el, { opacity: 0, y: 34, duration: .75, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 84%" } }));
  gsap.to(".hero-card", { y: -38, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
}