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

const LASTMOD = "2026-10-14";

export const SITEMAP_PAGES: SitemapPage[] = [
  {
    path: "/",
    lastMod: LASTMOD,
    changeFreq: "daily",
    priority: 1,
    images: [
      {
        loc: imageLoc("/android-chrome-512x512.png"),
        title: "Parlay Calculator logo",
        caption: "Brand mark for Parlay Calculator on parlaycalculator.net",
      },
      {
        loc: imageLoc("/parlay-calculator.webp"),
        title: "Parlay Calculator tool",
        caption: "Free parlay odds and payout calculator homepage",
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
        loc: imageLoc("/parlay-calculator-1.webp"),
        title: "Parlay Calculator features",
        caption: "Odds formats, multi-leg tickets, and payout breakdown features",
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
        loc: imageLoc("/parlay-calculator-2.webp"),
        title: "How Parlay Calculator works",
        caption: "Steps to calculate combined parlay odds and payout",
      },
    ],
  },
  {
    path: "/nfl-parlay-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/parlay-calculator-3.webp"),
        title: "NFL Parlay Calculator",
        caption: "Calculate NFL multi-leg parlays and payouts",
      },
    ],
  },
  {
    path: "/moneyline-parlay-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/parlay-calculator-1.webp"),
        title: "Moneyline Parlay Calculator",
        caption: "Calculate moneyline parlay odds and winnings",
      },
    ],
  },
  {
    path: "/round-robin-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/parlay-calculator-2.webp"),
        title: "Round Robin Bet Calculator",
        caption: "Calculate round robin parlay combinations and total stake",
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
        title: "About Parlay Calculator",
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
    path: "/blog/how-to-calculate-parlay-odds",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/parlay-calculator.webp"),
        title: "How to calculate parlay odds",
        caption: "Step-by-step guide to calculating parlay odds and payouts",
      },
    ],
  },
  {
    path: "/blog/what-is-a-parlay-bet",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/parlay-calculator-1.webp"),
        title: "What is a parlay bet",
        caption: "Explanation of parlay bets, odds, and how they work",
      },
    ],
  },
  {
    path: "/blog/parlay-odds-explained",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/parlay-calculator-2.webp"),
        title: "Parlay odds explained",
        caption: "How combined parlay odds and implied probability work",
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
