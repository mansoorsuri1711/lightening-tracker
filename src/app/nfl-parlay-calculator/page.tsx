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
  {
    question: "How many legs should an NFL parlay have?",
    answer:
      "Shorter parlays (2–3 legs) hit more often; longer tickets pay more but implied probability drops fast. Use this calculator’s win-probability readout before you add a fourth or fifth leg.",
  },
];

export default function NflParlayPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "NFL Parlay Calculator", href: "/nfl-parlay-calculator" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 pb-10 pt-8">
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

      <ParlayCalculator showLabels={false} defaultLegs={["-110", "-110", "+150"]} />

      <section className="mt-14 max-w-3xl">
        <h2 className="mb-3 font-display text-2xl font-bold text-white">
          Building smarter NFL parlays
        </h2>
        <p className="mb-4 text-white/80 leading-relaxed">
          Most NFL spreads sit near −110. Three independent −110 legs combine near +597 American
          (about 6.97 decimal). Adding a plus-money underdog boosts payout fast — and implied win
          probability falls just as quickly. Use this NFL parlay calculator to test whether the
          juice is worth the stack before you lock the slip.
        </p>
        <h2 className="mb-3 mt-8 font-display text-2xl font-bold text-white">
          Spreads, totals, and moneylines on one ticket
        </h2>
        <p className="mb-4 text-white/80 leading-relaxed">
          Mix −3.5 favorites, overs/unders, and moneyline dogs in the same builder. Enter each price
          exactly as your sportsbook shows it. For a single all-or-nothing payout, stay on this page;
          for every combination of your picks, switch to the{" "}
          <Link href="/round-robin-calculator" className="text-violet-soft underline">
            round robin bet calculator
          </Link>
          .
        </p>
        <h2 className="mb-3 mt-8 font-display text-2xl font-bold text-white">
          Example NFL 3-leg payout
        </h2>
        <p className="text-white/80 leading-relaxed">
          Legs at −110, −110, and +150 → decimals ≈ 1.909 × 1.909 × 2.50 ≈ 9.11. A $20 stake returns
          about $182 total if every leg cashes. Plug the same numbers into the tool above to confirm,
          then read{" "}
          <Link href="/blog/how-to-calculate-parlay-odds" className="text-violet-soft underline">
            how to calculate parlay odds
          </Link>{" "}
          for the full formula.
        </p>
      </section>

      <div className="mt-12">
        <FaqSection title="NFL parlay FAQs" items={faqs} />
      </div>
      </div>
    </>
  );
}
