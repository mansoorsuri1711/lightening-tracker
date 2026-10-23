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

const LASTMOD = "2026-10-23";

export const SITEMAP_PAGES: SitemapPage[] = [
  {
    path: "/",
    lastMod: LASTMOD,
    changeFreq: "daily",
    priority: 1,
    images: [
      {
        loc: imageLoc("/index-fund-calculator-logo.png"),
        title: "Index Fund Calculator logo",
        caption: "Brand mark for Index Fund Calculator on indexfundcalculator.com",
      },
      {
        loc: imageLoc("/index-fund-calculator.webp"),
        title: "Index Fund Calculator tool",
        caption: "Free index fund growth and returns calculator homepage",
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
        loc: imageLoc("/index-fund-calculator-2.webp"),
        title: "Index Fund Calculator features",
        caption: "Growth projections, contributions, and expense ratio features",
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
        loc: imageLoc("/index-fund-calculator-3.webp"),
        title: "How Index Fund Calculator works",
        caption: "Steps to project index fund returns with compounding",
      },
    ],
  },
  {
    path: "/compound-interest-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/index-fund-calculator-3.webp"),
        title: "Compound Interest Calculator",
        caption: "Calculate compound interest on long-term investments",
      },
    ],
  },
  {
    path: "/expense-ratio-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/index-fund-calculator-2.webp"),
        title: "Expense Ratio Calculator",
        caption: "Compare how fund fees reduce long-term investment balances",
      },
    ],
  },
  {
    path: "/investment-growth-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/index-fund-calculator-4.webp"),
        title: "Investment Growth Calculator",
        caption: "Project investment growth with regular contributions",
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
        loc: imageLoc("/index-fund-calculator-logo.png"),
        title: "About Index Fund Calculator",
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
    path: "/blog/what-is-an-index-fund",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/index-fund-calculator.webp"),
        title: "What is an index fund",
        caption: "Beginner guide explaining how index funds work",
      },
    ],
  },
  {
    path: "/blog/index-fund-vs-mutual-fund",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/index-fund-calculator-3.webp"),
        title: "Index fund vs mutual fund",
        caption: "Comparison of index funds and actively managed mutual funds",
      },
    ],
  },
  {
    path: "/blog/expense-ratio-explained",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/index-fund-calculator-2.webp"),
        title: "Expense ratio explained",
        caption: "How expense ratios reduce index fund and ETF returns over time",
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
