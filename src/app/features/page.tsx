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
  title: "Parlay Calculator Features — Odds Formats & Payout Tools",
  description:
    "See what Parlay Calculator includes: American, decimal, and fractional odds, multi-leg tickets, implied probability, NFL and moneyline modes, plus round robin.",
  alternates: { canonical: `${SITE_ORIGIN}/features` },
  openGraph: {
    title: "Parlay Calculator Features — Odds Formats & Payout Tools",
    description: "Everything you need to price parlays and round robins accurately.",
    url: `${SITE_ORIGIN}/features`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Parlay Calculator features" }],
  },
};

const faqs = [
  {
    question: "Which odds formats does Parlay Calculator support?",
    answer:
      "American (−110, +150), decimal (1.91, 2.50), and fractional (10/11, 3/2). Switch formats anytime; results update to combined American and decimal prices.",
  },
  {
    question: "How many legs can I add?",
    answer:
      "The main calculator supports up to 12 legs — enough for same-game parlays and long multi-sport tickets without cluttering the slip.",
  },
  {
    question: "Is there a round robin tool?",
    answer:
      "Yes. The round robin bet calculator builds every combination of a chosen parlay size, totals your stake, and shows max payout if every ticket hits.",
  },
];

const features = [
  {
    title: "Multi-format odds engine",
    body: "Convert and multiply American, decimal, and fractional prices in one place so mixed slips still price correctly.",
  },
  {
    title: "Stake → profit → payout",
    body: "Enter any stake and see profit and total return instantly — the core job of a parlay payout calculator.",
  },
  {
    title: "Implied win probability",
    body: "Combined odds also show how often the ticket would need to cash at fair odds — useful reality check before stacking favorites.",
  },
  {
    title: "Sport-focused landers",
    body: "Dedicated NFL and moneyline calculator pages keep modifier searches on-domain without cannibalizing the homepage tool.",
  },
  {
    title: "Round robin combinations",
    body: "Generate every 2-leg, 3-leg, or larger combo from your selections with ticket count and total risk.",
  },
  {
    title: "Educational guides",
    body: "SERP-backed articles on how to calculate parlay odds, what a parlay bet is, and how combined prices work.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Features", href: "/features" }]} />
      <div className="container mx-auto max-w-5xl px-4 pb-10 pt-8">
      <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
        Parlay Calculator features
      </h1>
      <p className="mb-10 max-w-3xl text-lg text-white/80">
        Built to rank for — and actually solve — parlay odds calculator searches: clear math, flexible
        formats, and related tools for NFL, moneylines, and round robins.
      </p>

      <div className="mb-14 grid gap-10 md:grid-cols-2 md:items-center">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_2}
            alt="Parlay Calculator odds format toggles and multi-leg ticket builder"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
        <ul className="space-y-5">
          {features.slice(0, 3).map((f) => (
            <li key={f.title}>
              <h2 className="mb-1 font-display text-xl font-semibold text-white">{f.title}</h2>
              <p className="text-white/75">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-14 grid gap-10 md:grid-cols-2 md:items-center">
        <ul className="order-2 space-y-5 md:order-1">
          {features.slice(3).map((f) => (
            <li key={f.title}>
              <h2 className="mb-1 font-display text-xl font-semibold text-white">{f.title}</h2>
              <p className="text-white/75">{f.body}</p>
            </li>
          ))}
        </ul>
        <div className="relative order-1 aspect-video overflow-hidden rounded-2xl border border-white/10 md:order-2">
          <Image
            src={BRAND_FEATURE_4}
            alt="Round robin and NFL parlay calculator related tools"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <FaqSection title="Feature FAQs" items={faqs} />

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator" ariaLabel="Open Parlay Calculator">
          OPEN CALCULATOR
        </CtaButton>
      </div>
      </div>
    </>
  );
}
