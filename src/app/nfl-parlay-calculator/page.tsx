import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ParlayCalculator from "@/components/ParlayCalculator";
import FaqSection from "@/components/FaqSection";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "NFL Parlay Calculator — Free Football Odds & Payout",
  description:
    "Free NFL parlay calculator. Price moneyline, spread, and total parlays with American odds and see exact profit and payout before you bet.",
  alternates: { canonical: `${SITE_ORIGIN}/nfl-parlay-calculator` },
  openGraph: {
    title: "NFL Parlay Calculator — Free Football Odds & Payout",
    description: "Build NFL multi-leg tickets and calculate combined odds instantly.",
    url: `${SITE_ORIGIN}/nfl-parlay-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "NFL Parlay Calculator" }],
  },
};

const faqs = [
  {
    question: "What is an NFL parlay calculator?",
    answer:
      "It is a parlay odds calculator tuned for football tickets — moneylines, spreads, and totals — so you can stack Sunday legs and see the combined payout in seconds.",
  },
  {
    question: "Can I calculate same-game parlays (SGPs)?",
    answer:
      "You can enter any custom prices your book quotes for an SGP. Because correlated SGP odds are set by the sportsbook (not simple independent multiplication), always paste the book’s listed price for accuracy.",
  },
];

export default function NflParlayPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "NFL Parlay Calculator" },
        ]}
      />
      <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
        NFL parlay calculator
      </h1>
      <p className="mb-8 max-w-3xl text-lg text-white/80">
        Price football parlays the way U.S. bettors search for them — American odds by default, clear
        profit and payout, and room for as many legs as your Sunday card needs. Prefer moneylines only?{" "}
        <Link href="/moneyline-parlay-calculator" className="text-violet-soft underline">
          Open the moneyline parlay calculator
        </Link>
        .
      </p>

      <ParlayCalculator
        title="NFL parlay odds & payout"
        defaultLegs={["-110", "-110", "+150"]}
      />

      <section className="mt-14 prose-invert max-w-3xl">
        <h2 className="mb-3 font-display text-2xl font-bold text-white">
          Building smarter NFL parlays
        </h2>
        <p className="mb-4 text-white/80 leading-relaxed">
          Most NFL spreads sit near −110. Three independent −110 legs combine near +597 American
          (about 6.97 decimal). Adding a plus-money underdog boosts payout fast — and implied win
          probability falls just as quickly. Use this NFL parlay calculator to test whether the
          juice is worth the stack before you lock the slip.
        </p>
        <p className="text-white/80 leading-relaxed">
          For the formula behind the numbers, see{" "}
          <Link href="/blog/how-to-calculate-parlay-odds" className="text-violet-soft underline">
            how to calculate parlay odds
          </Link>
          . For every combination instead of one ticket, try the{" "}
          <Link href="/round-robin-calculator" className="text-violet-soft underline">
            round robin bet calculator
          </Link>
          .
        </p>
      </section>

      <div className="mt-12">
        <FaqSection title="NFL parlay FAQs" items={faqs} />
      </div>
    </div>
  );
}
