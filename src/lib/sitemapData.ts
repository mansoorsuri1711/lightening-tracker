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

const LASTMOD = "2026-10-11";

export const SITEMAP_PAGES: SitemapPage[] = [
  {
    path: "/",
    lastMod: LASTMOD,
    changeFreq: "daily",
    priority: 1,
    images: [
      {
        loc: imageLoc("/android-chrome-512x512.png"),
        title: "Body Fat Calculator logo",
        caption: "Brand mark for the free body fat percentage calculator",
      },
      {
        loc: imageLoc("/hero-desktop-1920x1080.png"),
        title: "Body Fat Calculator hero",
        caption: "Homepage visual for estimating body fat percentage",
      },
      {
        loc: imageLoc("/body-fat-chart-1600x900.png"),
        title: "Body fat percentage chart",
        caption: "Category chart from essential fat to obese ranges",
      },
    ],
  },
  {
    path: "/us-navy-body-fat-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/hero-desktop-1920x1080.png"),
        title: "US Navy body fat calculator",
        caption: "Guide visual for the U.S. Navy circumference method",
      },
    ],
  },
  {
    path: "/body-fat-percentage-men",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/body-fat-chart-1600x900.png"),
        title: "Body fat percentage men chart",
        caption: "Healthy and category ranges for male body fat percentage",
      },
    ],
  },
  {
    path: "/body-fat-percentage-women",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/body-fat-chart-1600x900.png"),
        title: "Body fat percentage women chart",
        caption: "Healthy and category ranges for female body fat percentage",
      },
    ],
  },
  {
    path: "/visceral-fat-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/hero-mobile-1080x1350.png"),
        title: "Visceral fat calculator",
        caption: "Waist-based visceral fat risk estimator",
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
        loc: imageLoc("/android-chrome-512x512.png"),
        title: "About Body Fat Calculator",
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
    path: "/blog/how-to-measure-body-fat",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
    images: [
      {
        loc: imageLoc("/body-fat-chart-1600x900.png"),
        title: "How to measure body fat",
        caption: "Guide visual for measuring body fat at home and in clinics",
      },
    ],
  },
  {
    path: "/blog/how-to-calculate-body-fat-percentage",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
    images: [
      {
        loc: imageLoc("/hero-desktop-1920x1080.png"),
        title: "How to calculate body fat percentage",
        caption: "Step visual for calculating body fat percentage with Navy formulas",
      },
    ],
  },
  {
    path: "/blog/ideal-body-fat-percentage",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
    images: [
      {
        loc: imageLoc("/body-fat-chart-1600x900.png"),
        title: "Ideal body fat percentage",
        caption: "Ideal and healthy body fat percentage ranges by sex and age",
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
