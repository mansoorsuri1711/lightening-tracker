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

const LASTMOD = "2026-10-04";

export const SITEMAP_PAGES: SitemapPage[] = [
  {
    path: "/",
    lastMod: LASTMOD,
    changeFreq: "daily",
    priority: 1,
    images: [
      {
        loc: imageLoc("/favicon-512x512.png"),
        title: "Florida Paycheck Calculator logo",
        caption: "Brand mark for the free Florida take-home pay calculator",
      },
      {
        loc: imageLoc("/hero-florida-paycheck-calculator.webp"),
        title: "Florida Paycheck Calculator hero",
        caption: "Homepage visual for estimating Florida net pay",
      },
      {
        loc: imageLoc("/florida-paycheck-breakdown.webp"),
        title: "Florida paycheck breakdown",
        caption: "Visual of taxes, FICA, and take-home on a Florida paycheck",
      },
    ],
  },
  {
    path: "/how-florida-paychecks-work",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/florida-paycheck-breakdown.webp"),
        title: "How Florida paychecks work",
        caption: "Guide visual for gross-to-net Florida paycheck steps",
      },
    ],
  },
  {
    path: "/florida-no-state-income-tax",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/florida-no-state-income-tax.webp"),
        title: "Florida no state income tax",
        caption: "Illustration that Florida personal state income tax is $0",
      },
    ],
  },
  {
    path: "/pay-frequency-guide",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/florida-pay-frequency-comparison.webp"),
        title: "Florida pay frequency comparison",
        caption: "Weekly, biweekly, semi-monthly, and monthly paycheck schedules",
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
        title: "About Florida Paycheck Calculator",
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
    path: "/blog/how-to-calculate-florida-take-home-pay",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
    images: [
      {
        loc: imageLoc("/how-to-calculate-florida-take-home-pay.webp"),
        title: "How to calculate Florida take-home pay",
        caption: "Step visual for estimating Florida net pay",
      },
    ],
  },
  {
    path: "/blog/fica-taxes-explained",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
    images: [
      {
        loc: imageLoc("/fica-taxes-explained.webp"),
        title: "FICA taxes explained",
        caption: "Social Security and Medicare withholdings on a paycheck",
      },
    ],
  },
  {
    path: "/blog/federal-tax-brackets-2026",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
    images: [
      {
        loc: imageLoc("/federal-tax-brackets-2026.webp"),
        title: "2026 federal tax brackets",
        caption: "Federal income tax bracket reference for paycheck planning",
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
