import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ParlayCalculator from "@/components/ParlayCalculator";
import FaqSection from "@/components/FaqSection";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Moneyline Parlay Calculator — Free ML Odds & Payout",
  description:
    "Free moneyline parlay calculator. Enter American moneylines, multiply legs correctly, and see combined odds, profit, and total payout.",
  alternates: { canonical: `${SITE_ORIGIN}/moneyline-parlay-calculator` },
  openGraph: {
    title: "Moneyline Parlay Calculator — Free ML Odds & Payout",
    description: "Calculate moneyline parlays with American odds in seconds.",
    url: `${SITE_ORIGIN}/moneyline-parlay-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Moneyline Parlay Calculator" }],
  },
};

const faqs = [
  {
    question: "How does a moneyline parlay calculator work?",
    answer:
      "Each moneyline converts to decimal odds, those decimals multiply, and your stake scales the result into profit and payout — the same engine as our main parlay calculator, focused on ML prices.",
  },
  {
    question: "Can I mix favorites and underdogs?",
    answer:
      "Yes. Enter negative favorites (−150) and positive underdogs (+180) on the same ticket. The tool handles mixed American moneylines automatically.",
  },
  {
    question: "Is a moneyline parlay better than a spread parlay?",
    answer:
      "Not always. Heavy favorites on the moneyline often pay less than −110 spreads on the same side. Run both versions here before you choose.",
  },
];

export default function MoneylineParlayPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Moneyline Parlay Calculator" },
        ]}
      />
      <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
        Moneyline parlay calculator
      </h1>
      <p className="mb-8 max-w-3xl text-lg text-white/80">
        Stack straight-up winners without spreads. This moneyline parlay calculator is preset for
        American ML prices — the format U.S. bettors use when searching “moneyline parlay
        calculator.” Need spreads and totals too? Use the{" "}
        <Link href="/" className="text-violet-soft underline">
          main parlay calculator
        </Link>
        .
      </p>

      <ParlayCalculator showLabels={false} defaultLegs={["-150", "-120", "+130"]} />

      <section className="mt-14 max-w-3xl">
        <h2 className="mb-3 font-display text-2xl font-bold text-white">
          Moneyline parlays vs. spread parlays
        </h2>
        <p className="mb-4 text-white/80 leading-relaxed">
          Moneyline favorites often sit shorter than −110 spreads, so a three-favorite ML parlay can
          pay less than a three-spread ticket — even when you pick the same sides. Underdog
          moneylines flip that math. Run both versions here before you choose.
        </p>
        <h2 className="mb-3 mt-8 font-display text-2xl font-bold text-white">
          How to read mixed ML prices
        </h2>
        <p className="mb-4 text-white/80 leading-relaxed">
          Convert each American moneyline to decimal, multiply, then apply stake. Example: −150,
          −120, and +130 → ≈ 1.667 × 1.833 × 2.30 ≈ 7.03 decimal. A $50 stake returns about $351.50
          total. Confirm with the calculator above.
        </p>
        <p className="text-white/80 leading-relaxed">
          New to parlays? Start with{" "}
          <Link href="/blog/what-is-a-parlay-bet" className="text-violet-soft underline">
            what is a parlay bet
          </Link>
          . For NFL spreads and totals, open the{" "}
          <Link href="/nfl-parlay-calculator" className="text-violet-soft underline">
            NFL parlay calculator
          </Link>
          .
        </p>
      </section>

      <div className="mt-12">
        <FaqSection title="Moneyline parlay FAQs" items={faqs} />
      </div>
    </div>
  );
}
