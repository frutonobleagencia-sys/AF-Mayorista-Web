# AF Mayorista

Web institucional B2B premium para AF Mayorista. No es ecommerce: no incluye carrito, checkout, login ni precios publicos.

## Objetivo

Generar contactos mayoristas, solicitudes de catalogo y consultas por WhatsApp para negocios, revendedores, clubes, empresas e instituciones.

## Variables de entorno

Crear un archivo `.env.local` con las variables que correspondan:

```env
NEXT_PUBLIC_SITE_URL=https://afmayorista.com.ar
NEXT_PUBLIC_WHATSAPP_NUMBER=549XXXXXXXXXX
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

No se incluyen IDs falsos. Si una variable de analitica queda vacia, el script no se carga.

## Contenido editable

Los textos, navegacion, categorias, preguntas frecuentes y mensajes de WhatsApp estan centralizados en:

`src/data/siteContent.ts`

## Desarrollo

```bash
pnpm install
pnpm run dev
```

## Validacion y build

```bash
pnpm run build
pnpm run lint
```

## Notas

- Los enlaces de WhatsApp se generan con `createWhatsAppLink(message)`.
- Las animaciones principales usan GSAP y respetan `prefers-reduced-motion`.
- El formulario queda preparado para conectar posteriormente una API, correo, CRM o Google Sheets.
- La imagen social esta referenciada como `/og.png` y puede reemplazarse por una version definitiva de marca.
