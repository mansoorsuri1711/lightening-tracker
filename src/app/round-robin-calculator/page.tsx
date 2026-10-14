import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RoundRobinCalculator from "@/components/RoundRobinCalculator";
import FaqSection from "@/components/FaqSection";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Round Robin Bet Calculator — Free Combinations & Payout",
  description:
    "Free round robin bet calculator. Turn selections into every 2-leg or 3-leg parlay combo, see ticket count, total stake, and max payout.",
  alternates: { canonical: `${SITE_ORIGIN}/round-robin-calculator` },
  openGraph: {
    title: "Round Robin Bet Calculator — Free Combinations & Payout",
    description: "Calculate round robin parlays and total risk instantly.",
    url: `${SITE_ORIGIN}/round-robin-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Round Robin Bet Calculator" }],
  },
};

const faqs = [
  {
    question: "What is a round robin bet?",
    answer:
      "A round robin builds every parlay combination of a chosen size from your selections. Four teams into 2-leg parlays creates six tickets — so one loss does not wipe the entire stake like a single 4-leg parlay.",
  },
  {
    question: "How is total stake calculated?",
    answer:
      "Total stake = stake per ticket × number of combinations. This round robin bet calculator shows that total plus the max payout if every ticket cashes.",
  },
];

export default function RoundRobinPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Round Robin Calculator", href: "/round-robin-calculator" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 pb-10 pt-8">
      <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
        Round robin bet calculator
      </h1>
      <p className="mb-8 max-w-3xl text-lg text-white/80">
        Round robins sit next to parlays in search — bettors want combination count and total risk,
        not just one ticket. Use this tool when you like several sides but do not want a single
        all-or-nothing parlay. For one multi-leg ticket, open the{" "}
        <Link href="/" className="text-violet-soft underline">
          parlay calculator
        </Link>
        .
      </p>

      <RoundRobinCalculator />

      <section className="mt-14 max-w-3xl">
        <h2 className="mb-3 font-display text-2xl font-bold text-white">
          When a round robin beats a straight parlay
        </h2>
        <p className="text-white/80 leading-relaxed">
          If you are confident in most picks but expect one miss, round robins keep smaller parlays
          alive. Cost rises with every combination, so always check total stake here before you
          confirm at the window or app.
        </p>
      </section>

      <div className="mt-12">
        <FaqSection title="Round robin FAQs" items={faqs} />
      </div>
      </div>
    </>
  );
}
