import type { Metadata, Viewport } from "next";
import { Inter, Rajdhani } from "next/font/google";
import { Analytics } from "@/src/components/Analytics";
import { siteContent } from "@/src/data/siteContent";
import "./globals.css";

const display = Rajdhani({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const siteUrl = new URL(siteContent.seo.siteUrl);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteContent.seo.title, template: `%s | ${siteContent.brand.name}` },
  description: siteContent.seo.description,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: siteContent.brand.name,
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AF Mayorista - abastecimiento B2B" }],
  },
  twitter: { card: "summary_large_image", title: siteContent.seo.title, description: siteContent.seo.description, images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body className={`${display.variable} ${sans.variable}`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
