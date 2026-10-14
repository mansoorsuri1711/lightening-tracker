import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_FEATURE_3, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "How Parlay Calculator Works — Odds Math Explained",
  description:
    "Learn how Parlay Calculator converts odds, multiplies legs, and returns profit, payout, and implied probability for any multi-leg sports bet.",
  alternates: { canonical: `${SITE_ORIGIN}/how-it-works` },
  openGraph: {
    title: "How Parlay Calculator Works — Odds Math Explained",
    description: "Step-by-step: from stake and legs to combined parlay odds and payout.",
    url: `${SITE_ORIGIN}/how-it-works`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "How Parlay Calculator works" }],
  },
};

const faqs = [
  {
    question: "How are American odds converted?",
    answer:
      "Positive American odds: decimal = (odds ÷ 100) + 1. Negative American odds: decimal = (100 ÷ |odds|) + 1. Those decimals are multiplied across legs.",
  },
  {
    question: "Why might my sportsbook show a different number?",
    answer:
      "Books can apply parlay juice, reduced vig on SGP, or boosted prices. Our calculator shows standard multiplicative odds — always confirm the price on the ticket before betting.",
  },
];

const steps = [
  {
    title: "1. Match the odds format",
    body: "Choose American, decimal, or fractional so each leg parses the way your sportsbook displays it.",
  },
  {
    title: "2. Enter stake and legs",
    body: "Add every selection on the ticket. Optional labels keep NFL games or props organized while you tweak prices.",
  },
  {
    title: "3. Multiply decimal odds",
    body: "Behind the scenes, each price becomes a decimal multiplier. The product is your combined decimal odds.",
  },
  {
    title: "4. Apply stake for payout",
    body: "Total payout = stake × combined decimal. Profit = payout − stake. Implied probability = 1 ÷ combined decimal.",
  },
];

export default function HowItWorksPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to calculate a parlay with Parlay Calculator",
    description: "Convert odds, multiply legs, and read payout.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How It Works" }]} />
      <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
        How the parlay calculator works
      </h1>
      <p className="mb-8 text-lg text-white/80">
        Parlays pay more because every leg must win. The math is multiplicative — convert each price
        to decimal odds, multiply, then scale by stake. That is exactly what this tool automates.
      </p>

      <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-white/10">
        <Image
          src={BRAND_FEATURE_3}
          alt="Diagram-style view of converting odds and multiplying parlay legs"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <ol className="mb-12 space-y-8">
        {steps.map((step) => (
          <li key={step.title} className="border-l-2 border-violet/50 pl-5">
            <h2 className="mb-2 font-display text-xl font-semibold text-white">{step.title}</h2>
            <p className="text-white/75 leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>

      <p className="mb-8 text-white/80">
        Want the long-form formula with worked NFL examples? Read{" "}
        <Link href="/blog/how-to-calculate-parlay-odds" className="text-violet-soft underline">
          how to calculate parlay odds
        </Link>{" "}
        or open the{" "}
        <Link href="/#calculator" className="text-violet-soft underline">
          free calculator
        </Link>
        .
      </p>

      <FaqSection title="How-it-works FAQs" items={faqs} />

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator">TRY IT FREE</CtaButton>
      </div>
    </div>
  );
}
