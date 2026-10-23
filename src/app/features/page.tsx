import Image from "next/image";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import {
  BRAND_FEATURE_2,
  BRAND_FEATURE_4,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Index Fund Calculator Features — Growth & Fees",
  description:
    "See what Index Fund Calculator includes: contribution projections, compounding, expense-ratio impact, year-by-year tables, and related investment tools.",
  alternates: { canonical: `${SITE_ORIGIN}/features` },
  openGraph: {
    title: "Index Fund Calculator Features — Growth & Fees",
    description: "Everything you need to project index fund growth and fee impact.",
    url: `${SITE_ORIGIN}/features`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Index Fund Calculator features" }],
  },
};

const faqs = [
  {
    question: "What inputs does Index Fund Calculator support?",
    answer:
      "Initial investment, monthly or yearly contributions, time horizon, expected annual return, and expense ratio — plus a year-by-year balance table.",
  },
  {
    question: "Can I compare fund fees?",
    answer:
      "Yes. The expense ratio calculator compares two fee levels on the same contribution plan and shows the dollar difference in ending wealth.",
  },
  {
    question: "Is there a compound interest mode?",
    answer:
      "Yes. The compound interest calculator focuses on compounding and contributions without a fee field, while the main tool includes expense ratios.",
  },
];

const features = [
  {
    title: "Contribution-aware growth",
    body: "Model lump sums and recurring deposits the way real index investors save — not a one-time interest toy.",
  },
  {
    title: "Expense ratio drag",
    body: "See how fund fees reduce net return and compare against a zero-fee baseline on every projection.",
  },
  {
    title: "Year-by-year table",
    body: "Watch balances build annually so long timelines feel concrete before you commit contributions.",
  },
  {
    title: "Related SERP tools",
    body: "Compound interest, expense ratio, and investment growth landers cover modifier searches without thin duplicates.",
  },
  {
    title: "Educational guides",
    body: "SERP-backed articles on what index funds are, index vs mutual funds, and expense ratios.",
  },
  {
    title: "Free & private-by-default",
    body: "No account required. Inputs run in your browser for the calculation — we are not a brokerage.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Features", href: "/features" }]} />
      <div className="container mx-auto max-w-5xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Index Fund Calculator features
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-white/80">
          Built to rank for — and actually solve — index fund calculator searches: clear growth math,
          fee awareness, and related tools for compounding and investment planning.
        </p>

        <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_2}
            alt="Index Fund Calculator showing fee impact and growth projection features"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>

        <ul className="mb-14 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f.title} className="border border-white/10 bg-white/[0.03] p-5">
              <h2 className="mb-2 font-display text-xl font-semibold text-white">{f.title}</h2>
              <p className="text-sm leading-relaxed text-white/70">{f.body}</p>
            </li>
          ))}
        </ul>

        <div className="relative mb-14 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_4}
            alt="Yearly growth table feature in Index Fund Calculator"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>

        <FaqSection title="Features FAQs" items={faqs} />

        <div className="mt-12 text-center">
          <CtaButton href="/#calculator" ariaLabel="Open Index Fund Calculator">
            OPEN CALCULATOR
          </CtaButton>
        </div>
      </div>
    </>
  );
}
