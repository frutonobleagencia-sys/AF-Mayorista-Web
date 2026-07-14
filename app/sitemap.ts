import { siteContent } from "@/src/data/siteContent";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteContent.seo.siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
