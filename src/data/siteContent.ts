export const siteContent = {
  brand: {
    name: "AF Mayorista",
    tagline: "Todo para impulsar tu negocio.",
    descriptor: "Abastecimiento mayorista para negocios, revendedores, clubes, empresas e instituciones.",
  },
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://afmayorista.com.ar",
    title: "AF Mayorista | Abastecimiento B2B premium",
    description: "Indumentaria, accesorios y productos mayoristas con atencion personalizada, disponibilidad y envios a todo el pais de Argentina de Argentina.",
  },
  nav: [
    { label: "Inicio", href: "#inicio" },
    { label: "Productos", href: "#productos" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "Como comprar", href: "#como-comprar" },
    { label: "Personalizacion", href: "#personalizacion" },
    { label: "Preguntas frecuentes", href: "#preguntas" },
    { label: "Contacto", href: "#contacto" },
  ],
  hero: {
    eyebrow: "Importacion y distribucion mayorista",
    title: "Todo para impulsar tu negocio.",
    copy: "Indumentaria, accesorios y productos mayoristas con atencion personalizada, disponibilidad y envios a todo el pais de Argentina de Argentina.",
    stats: [
      { value: "B2B", label: "Atencion pensada para mayoristas" },
      { value: "Pais", label: "Coordinacion de envios nacionales" },
      { value: "AF", label: "Marca del grupo Airflow" },
    ],
  },
  whatsappMessages: {
    hero: "Hola, vi la web de AF Mayorista y quiero recibir el catalogo actualizado.",
    advisor: "Hola, llegue desde la web de AF Mayorista y quisiera hablar con un asesor.",
    category: "Hola, estoy buscando productos de la categoria [CATEGORIA]. Me pueden enviar informacion mayorista?",
    customization: "Hola, quiero consultar por productos personalizados para mi empresa, club o institucion.",
    quote: "Hola, quisiera solicitar una cotizacion por cantidad.",
    floating: "Hola, estoy recorriendo la web de AF Mayorista y necesito asesoramiento.",
  },
  benefits: [
    { icon: "boxes", title: "Stock disponible", text: "Disponibilidad orientada a compras por cantidad y reposicion constante." },
    { icon: "badge", title: "Precios por volumen", text: "Condiciones mayoristas para operaciones de reventa y abastecimiento." },
    { icon: "truck", title: "Envios a todo el pais de Argentina", text: "Coordinacion logistica para llegar a negocios, clubes e instituciones." },
    { icon: "headset", title: "Atencion personalizada", text: "Asesoramiento comercial para elegir productos, cantidades y alternativas." },
    { icon: "repeat", title: "Productos para reventa", text: "Categorias amplias para armar propuestas comerciales competitivas." },
  ],
  categories: [
    { slug: "indumentaria", title: "Indumentaria", text: "Prendas para reventa, equipos, clubes y acciones institucionales.", art: "art-indumentaria" },
    { slug: "accesorios", title: "Accesorios", text: "Articulos complementarios de uso diario con enfoque mayorista.", art: "art-accesorios" },
    { slug: "termos-y-botellas", title: "Termos y botellas", text: "Productos termicos, botellas y opciones practicas para volumen.", art: "art-termos" },
    { slug: "bolsos-y-mochilas", title: "Bolsos y mochilas", text: "Soluciones funcionales para negocios, equipos y eventos.", art: "art-bolsos" },
    { slug: "productos-personalizados", title: "Personalizados", text: "Aplicacion de identidad para empresas, clubes e instituciones.", art: "art-personalizados" },
  ],
  process: [
    { title: "Solicitas el catalogo", text: "Te enviamos categorias, disponibilidad y condiciones mayoristas." },
    { title: "Elegis productos", text: "Definis referencias, cantidades aproximadas y prioridades comerciales." },
    { title: "Recibis cotizacion", text: "Preparamos una propuesta segun volumen, disponibilidad y destino." },
    { title: "Coordinamos envio", text: "Alineamos pago, despacho y seguimiento de la operacion." },
  ],
  personalization: {
    title: "Tu marca tambien puede estar aca.",
    copy: "Soluciones para empresas, clubes, instituciones, equipos y eventos que necesitan productos con identidad aplicada y producciones por cantidad.",
    services: ["Estampado", "Bordado", "Sublimado", "Aplicacion de identidad", "Producciones por cantidad"],
  },
  institutional: {
    title: "Una unidad enfocada en abastecimiento B2B.",
    copy: "AF Mayorista integra la familia Airflow para responder a necesidades de compra mayorista con atencion profesional, criterio comercial y capacidad de distribucion.",
    points: ["Asesoramiento para negocios y revendedores", "Coordinacion de envios nacionales", "Seguimiento comercial de consultas y cotizaciones"],
  },
  faqs: [
    { q: "La venta es solamente mayorista?", a: "La web esta orientada a operaciones mayoristas, revendedores, negocios, clubes, empresas e instituciones." },
    { q: "Cual es la compra minima?", a: "La compra minima puede variar segun categoria y disponibilidad. Lo ideal es solicitar el catalogo y consultar la condicion vigente." },
    { q: "Realizan envios a todo el pais de Argentina?", a: "Si, se coordinan envios a distintas localidades del pais segun el pedido y el operador logistico disponible." },
    { q: "Como solicito el catalogo?", a: "Podes pedirlo desde los botones de WhatsApp o completar el formulario mayorista para recibir asesoramiento." },
    { q: "Los precios se muestran en la web?", a: "No. Las condiciones se informan por catalogo o cotizacion para mantener informacion actualizada y segmentada por volumen." },
    { q: "Trabajan productos personalizados?", a: "Si. Hay opciones de estampado, bordado, sublimado y aplicacion de identidad segun producto y cantidad." },
    { q: "Cuales son los medios de pago?", a: "Los medios disponibles se confirman junto con la cotizacion y las condiciones del pedido." },
    { q: "Cuanto demora el despacho?", a: "Los tiempos dependen de disponibilidad, preparacion, personalizacion y destino. Se informan al coordinar la compra." },
  ],
  contact: {
    email: "",
    location: "Argentina",
    categories: ["Indumentaria", "Accesorios", "Termos y botellas", "Bolsos y mochilas", "Productos personalizados", "Pedido mixto"],
  },
};

export type SiteContent = typeof siteContent;
