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
        title: "BMI Calculator Women logo",
        caption: "Brand mark for the free BMI calculator for women",
      },
      {
        loc: imageLoc("/hero-desktop-1920x1080.png"),
        title: "BMI Calculator Women hero",
        caption: "Homepage visual for calculating women’s body mass index",
      },
      {
        loc: imageLoc("/bmi-chart-women-1600x960.png"),
        title: "BMI chart for women",
        caption: "Women’s BMI category chart from underweight to obesity classes",
      },
    ],
  },
  {
    path: "/bmi-chart-women",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/bmi-chart-women-1600x960.png"),
        title: "BMI chart women",
        caption: "Height and weight BMI chart designed for women",
      },
    ],
  },
  {
    path: "/healthy-bmi",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/bmi-chart-women-1600x960.png"),
        title: "Healthy BMI for women",
        caption: "Healthy and normal BMI ranges for adult women",
      },
    ],
  },
  {
    path: "/bmi-by-age",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/hero-desktop-1920x1080.png"),
        title: "BMI calculator by age for women",
        caption: "How age changes BMI interpretation for women",
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
        title: "About BMI Calculator Women",
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
    path: "/blog/how-to-calculate-bmi",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.8,
    images: [
      {
        loc: imageLoc("/hero-desktop-1920x1080.png"),
        title: "How to calculate BMI",
        caption: "Step-by-step guide to calculating body mass index for women",
      },
    ],
  },
  {
    path: "/blog/what-is-bmi",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.8,
    images: [
      {
        loc: imageLoc("/bmi-chart-women-1600x960.png"),
        title: "What is BMI",
        caption: "Plain-language explanation of body mass index meaning",
      },
    ],
  },
  {
    path: "/blog/bmi-formula",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
    images: [
      {
        loc: imageLoc("/hero-mobile-1080x1350.png"),
        title: "BMI formula",
        caption: "Metric and imperial BMI formulas with worked examples",
      },
    ],
  },
  {
    path: "/blog/height-and-weight-chart-for-women",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
    images: [
      {
        loc: imageLoc("/bmi-chart-women-1600x960.png"),
        title: "Height and weight chart for women",
        caption: "Healthy weight ranges by height for adult women",
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
