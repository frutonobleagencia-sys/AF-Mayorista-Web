"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BadgePercent,
  Boxes,
  Check,
  ChevronDown,
  ClipboardList,
  Headset,
  Menu,
  MessageCircle,
  PackageCheck,
  Palette,
  Repeat2,
  Route,
  Send,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { siteContent } from "@/src/data/siteContent";
import { createWhatsAppLink, trackEvent } from "@/src/lib/whatsapp";

type IconKey = "boxes" | "badge" | "truck" | "headset" | "repeat";

const benefitIcons: Record<IconKey, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  boxes: Boxes,
  badge: BadgePercent,
  truck: Truck,
  headset: Headset,
  repeat: Repeat2,
};

function WhatsAppButton({ message, event, label, className = "btn-primary" }: { message: string; event: Parameters<typeof trackEvent>[0]; label: string; className?: string }) {
  return (
    <a
      className={`btn ${className}`}
      href={createWhatsAppLink(message)}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onClick={() => trackEvent(event)}
    >
      <MessageCircle size={18} strokeWidth={2.4} />
      <span>{label}</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand-logo" href="#inicio" aria-label="AF Mayorista inicio" onClick={close}>
          <Image src="/assets/af-logo.png" alt="AF Mayorista" fill priority sizes="160px" />
        </a>
        <nav className="desktop-nav" aria-label="Navegacion principal">
          {siteContent.nav.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <WhatsAppButton message={siteContent.whatsappMessages.hero} event="catalog_request" label="Solicitar catalogo" />
          <button className="icon-btn menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Cerrar menu" : "Abrir menu"} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <nav className={`mobile-panel ${open ? "is-open" : ""}`} aria-label="Menu mobile">
        {siteContent.nav.map((item) => (
          <a key={item.href} href={item.href} onClick={close}>{item.label}</a>
        ))}
        <WhatsAppButton message={siteContent.whatsappMessages.advisor} event="advisor_click" label="Hablar por WhatsApp" />
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-kicker">{siteContent.hero.eyebrow}</span>
          <h1 className="display-title hero-title"><span className="line">Todo para</span><span className="line">impulsar</span><span className="line">tu negocio.</span></h1>
          <p className="lead">{siteContent.hero.copy}</p>
          <div className="hero-actions">
            <WhatsAppButton message={siteContent.whatsappMessages.hero} event="catalog_request" label="Solicitar catalogo" />
            <WhatsAppButton message={siteContent.whatsappMessages.advisor} event="advisor_click" label="Hablar con un asesor" className="btn-secondary" />
          </div>
          <div className="hero-stats">
            {siteContent.hero.stats.map((stat) => <div className="hero-stat" key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="visual-stack"><div className="red-slice" /><div className="product-block" /><div className="speed-lines"><i /><i /><i /></div></div>
        </div>
      </div>
      <div className="scroll-indicator" aria-hidden="true"><span /></div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="benefits-strip" id="beneficios">
      <div className="container benefits-grid" data-reveal>
        {siteContent.benefits.map((benefit) => {
          const Icon = benefitIcons[benefit.icon as IconKey];
          return <article className="benefit-card" key={benefit.title}><div className="card-icon"><Icon size={22} /></div><h3>{benefit.title}</h3><p>{benefit.text}</p></article>;
        })}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="section" id="productos">
      <div className="container">
        <div className="section-heading" data-reveal><span className="eyebrow">Categorias mayoristas</span><h2 className="section-title">Productos para reventa, equipos e instituciones.</h2><p className="section-copy">Las categorias se presentan sin precios publicos: el catalogo y las condiciones se envian por canal mayorista.</p></div>
        <div className="categories-grid">
          {siteContent.categories.map((category) => {
            const message = siteContent.whatsappMessages.category.replace("[CATEGORIA]", category.title);
            return (
              <article className={`category-card ${category.art}`} key={category.slug} data-reveal>
                <div className="category-meta"><h3>{category.title}</h3><p>{category.text}</p><a className="category-link" href={createWhatsAppLink(message)} target="_blank" rel="noreferrer" onClick={() => trackEvent("category_click", { category: category.title })}>Consultar categoria <ArrowRight size={16} /></a></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Catalog() {
  return (
    <section className="section catalog-section" id="catalogo">
      <div className="container catalog-grid">
        <div data-reveal><span className="eyebrow">Catalogo actualizado</span><h2 className="section-title">Encontra el producto ideal para tu negocio.</h2><p className="section-copy">Recibi nuestro catalogo actualizado con categorias, disponibilidad y condiciones mayoristas.</p><div className="catalog-actions"><WhatsAppButton message={siteContent.whatsappMessages.hero} event="catalog_request" label="Recibir catalogo por WhatsApp" /><WhatsAppButton message={siteContent.whatsappMessages.quote} event="advisor_click" label="Solicitar cotizacion" className="btn-secondary" /></div></div>
        <div className="catalog-visual" data-reveal aria-hidden="true"><div className="phone-frame"><div className="phone-screen" /></div><div className="catalog-pack" /></div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section" id="como-comprar">
      <div className="container"><div className="section-heading" data-reveal><span className="eyebrow">Como comprar</span><h2 className="section-title">Un proceso simple, claro y mayorista.</h2></div><div className="process-grid">{siteContent.process.map((step, index) => <article className="process-card" key={step.title} data-reveal><div className="process-number"><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div>
    </section>
  );
}

function Personalization() {
  return (
    <section className="section section-dark" id="personalizacion">
      <div className="container personal-grid">
        <div data-reveal><span className="eyebrow">Personalizacion</span><h2 className="section-title">{siteContent.personalization.title}</h2><p className="section-copy">{siteContent.personalization.copy}</p><div className="catalog-actions"><WhatsAppButton message={siteContent.whatsappMessages.customization} event="customization_click" label="Consultar personalizados" /></div></div>
        <article className="personal-card" data-reveal><div className="card-icon"><Palette size={22} /></div><h3>Servicios posibles</h3><ul className="check-list">{siteContent.personalization.services.map((service) => <li key={service}><Check size={17} />{service}</li>)}</ul></article>
      </div>
    </section>
  );
}

function Institutional() {
  return (
    <section className="section section-tight" id="institucional">
      <div className="container institutional-grid">
        <article className="institutional-panel" data-reveal><span className="eyebrow">Institucional</span><h2 className="section-title">{siteContent.institutional.title}</h2><p>{siteContent.institutional.copy}</p><ul className="check-list">{siteContent.institutional.points.map((point) => <li key={point}><ShieldCheck size={17} />{point}</li>)}</ul></article>
        <div className="institutional-panel" data-reveal><div className="metric"><PackageCheck /><strong>Disponibilidad</strong><span>Catalogo y alternativas segun operacion.</span></div><div className="metric"><Route /><strong>Logistica</strong><span>Coordinacion de envios nacionales.</span></div><div className="metric"><ClipboardList /><strong>Cotizacion</strong><span>Condiciones por cantidad y categoria.</span></div></div>
      </div>
    </section>
  );
}

function Faqs() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="preguntas">
      <div className="container"><div className="section-heading" data-reveal><span className="eyebrow">Preguntas frecuentes</span><h2 className="section-title">Informacion clara antes de pedir catalogo.</h2></div><div className="faq-grid">{siteContent.faqs.map((faq, index) => <article className={`faq-item ${open === index ? "is-open" : ""}`} key={faq.q} data-reveal><button className="faq-button" type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span className="faq-question">{faq.q}</span><ChevronDown size={20} /></button><div className="faq-answer"><div><p>{faq.a}</p></div></div></article>)}</div></div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "error" | "sent">("idle");
  const [message, setMessage] = useState("");
  const contactLink = useMemo(() => createWhatsAppLink(siteContent.whatsappMessages.advisor), []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const required = ["name", "business", "city", "whatsapp", "category", "quantity"];
    const missing = required.some((key) => !String(form.get(key) ?? "").trim());
    if (missing) { setStatus("error"); setMessage("Completá los campos obligatorios para preparar mejor la consulta mayorista."); return; }
    trackEvent("lead_form_submit");
    setStatus("sent");
    setMessage("Consulta registrada. Podés continuar por WhatsApp para acelerar el envío del catálogo o la cotización.");
    event.currentTarget.reset();
  }

  return (
    <section className="section contact-section" id="contacto">
      <div className="container contact-grid">
        <div data-reveal><span className="eyebrow">Contacto mayorista</span><h2 className="section-title">Hablemos de tu proxima compra por cantidad.</h2><p className="section-copy">Completá tus datos para orientar la consulta. La estructura queda preparada para conectar API, correo, CRM o Google Sheets.</p><div className="contact-actions"><WhatsAppButton message={siteContent.whatsappMessages.advisor} event="advisor_click" label="Hablar con un asesor" /></div></div>
        <article className="contact-card" data-reveal><form className="lead-form" onSubmit={onSubmit} noValidate><div className="form-grid"><Field name="name" label="Nombre y apellido" /><Field name="business" label="Nombre del negocio" /><Field name="city" label="Localidad" /><Field name="whatsapp" label="WhatsApp" type="tel" /><label className="field"><span>Categoria de interes</span><select name="category" required defaultValue=""><option value="" disabled>Seleccionar categoria</option>{siteContent.contact.categories.map((category) => <option key={category}>{category}</option>)}</select></label><Field name="quantity" label="Cantidad estimada" /><label className="field full"><span>Mensaje</span><textarea name="message" placeholder="Contanos que productos buscás, destino y cualquier detalle importante." /></label></div><p className="form-note">No publicamos precios en la web. La informacion comercial se confirma por catalogo o cotizacion.</p>{status !== "idle" ? <div className="form-status"><p>{message}</p>{status === "sent" ? <a className="category-link" href={contactLink} target="_blank" rel="noreferrer">Continuar por WhatsApp <ArrowRight size={16} /></a> : null}</div> : null}<button className="btn btn-primary" type="submit"><Send size={18} /><span>Enviar consulta</span></button></form></article>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return <label className="field"><span>{label}</span><input name={name} type={type} required /></label>;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid"><div><a className="brand-logo" href="#inicio" aria-label="AF Mayorista inicio"><Image src="/assets/af-logo.png" alt="AF Mayorista" fill sizes="150px" /></a><p>Abastecimiento mayorista para negocios, revendedores, clubes, empresas e instituciones.</p></div><div className="footer-links">{siteContent.nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div></div>
    </footer>
  );
}

export function AfMayoristaSite() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".hero-kicker, .hero-title .line, .hero-copy .lead, .hero-actions, .hero-stats", { opacity: 0, y: 28, duration: 0.85, ease: "power3.out", stagger: 0.08 });
      gsap.from(".hero-visual", { opacity: 0, x: 60, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.from(".red-slice", { scaleX: 0, duration: 0.7, ease: "power2.out", delay: 0.65 });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { opacity: 0, y: 34, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 84%" } });
      });
      gsap.to(".hero-visual", { y: -42, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="site-shell" ref={root}>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Categories />
        <Catalog />
        <Process />
        <Personalization />
        <Institutional />
        <Faqs />
        <Contact />
      </main>
      <Footer />
      <a className="whatsapp-floating" href={createWhatsAppLink(siteContent.whatsappMessages.floating)} target="_blank" rel="noreferrer" aria-label="Solicitar asesoramiento por WhatsApp" onClick={() => trackEvent("floating_whatsapp_click")}><MessageCircle size={20} /><span>WhatsApp</span></a>
      <a className="mobile-whatsapp-bar" href={createWhatsAppLink(siteContent.whatsappMessages.floating)} target="_blank" rel="noreferrer" aria-label="Solicitar asesoramiento por WhatsApp" onClick={() => trackEvent("floating_whatsapp_click")}><MessageCircle size={20} /> Asesoramiento mayorista</a>
    </div>
  );
}
