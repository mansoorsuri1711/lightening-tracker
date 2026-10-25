import { SITE_ORIGIN } from "@/lib/siteConfig";

function imageLoc(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

export type SitemapPage = {
  path: string;
  lastMod: string;
  changeFreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  images?: Array<{ loc: string; title: string; caption: string }>;
};

const LASTMOD = "2026-10-25";

export const SITEMAP_PAGES: SitemapPage[] = [
  {
    path: "/",
    lastMod: LASTMOD,
    changeFreq: "daily",
    priority: 1,
    images: [
      {
        loc: imageLoc("/logo-icon.png"),
        title: "Lightning Tracker logo",
        caption: "Brand mark for Lightning Tracker on lightningtracker.net",
      },
      {
        loc: imageLoc("/lightning-tracker.webp"),
        title: "Lightning Tracker tool",
        caption: "Free lightning tracker homepage for strike awareness",
      },
    ],
  },
  {
    path: "/features",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/best-lightning-tracker.webp"),
        title: "Lightning Tracker features",
        caption: "Live strike map, distance calculator, and alert features",
      },
    ],
  },
  {
    path: "/how-it-works",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/lightning-tracker-tool.webp"),
        title: "How Lightning Tracker works",
        caption: "Steps to estimate lightning distance and monitor storms",
      },
    ],
  },
  {
    path: "/lightning-distance-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/lightning-tracker-tool.webp"),
        title: "Lightning Distance Calculator",
        caption: "Estimate how far lightning is from flash to thunder",
      },
    ],
  },
  {
    path: "/live-lightning-map",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/best-lightning-tracker.webp"),
        title: "Live Lightning Map Guide",
        caption: "How to read live lightning strike maps",
      },
    ],
  },
  {
    path: "/lightning-alerts",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/lightning-tracker-app.webp"),
        title: "Lightning Alerts",
        caption: "Tips for lightning alert radius and notifications",
      },
    ],
  },
  {
    path: "/about-us",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.7,
    images: [
      {
        loc: imageLoc("/logo-icon.png"),
        title: "About Lightning Tracker",
        caption: "Brand logo used on the About page",
      },
    ],
  },
  {
    path: "/blog",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.8,
  },
  {
    path: "/blog/best-lightning-tracker-apps",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/blog/best-lightning-tracker-apps.webp"),
        title: "Best lightning tracker apps",
        caption: "Guide to choosing lightning tracker apps and maps",
      },
    ],
  },
  {
    path: "/blog/how-lightning-trackers-work",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/blog/how-lightning-trackers-work.webp"),
        title: "How lightning trackers work",
        caption: "Detection networks, delay, and accuracy explained",
      },
    ],
  },
  {
    path: "/blog/how-far-away-is-lightning",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/blog/how-far-away-is-lightning.webp"),
        title: "How far away is lightning",
        caption: "Flash-to-thunder distance guide for thunderstorms",
      },
    ],
  },
  {
    path: "/blog/lightning-safety-tips",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/blog/lightning-safety-tips.webp"),
        title: "Lightning safety tips",
        caption: "Thunderstorm lightning safety habits and shelter tips",
      },
    ],
  },
  {
    path: "/contact-us",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.4,
  },
  {
    path: "/disclaimer",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.4,
  },
];

export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}
