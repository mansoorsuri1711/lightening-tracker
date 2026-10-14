import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import {
  BRAND_HERO,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

const TITLE = "How to Calculate Parlay Odds (Step-by-Step)";
const DESC =
  "Learn how to calculate parlay odds: convert American prices to decimal, multiply every leg, and turn your stake into profit and total payout.";
const SLUG = "how-to-calculate-parlay-odds";
const DATE = "2026-10-14";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE_ORIGIN}/blog/${SLUG}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
};

const faqs = [
  {
    question: "How do you calculate parlay odds quickly?",
    answer:
      "Convert each leg to decimal odds, multiply them, then multiply by your stake for payout. Or use the free Parlay Calculator to automate the steps.",
  },
  {
    question: "What is the formula for a 3-team parlay?",
    answer:
      "Payout = stake × d1 × d2 × d3, where each d is that leg’s decimal odds. Profit = payout − stake.",
  },
];

export default function HowToCalculateParlayOddsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "How to Calculate Parlay Odds", href: "/blog/how-to-calculate-parlay-odds" },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
      <BlogPostSchema
        title={TITLE}
        description={DESC}
        slug={SLUG}
        datePublished={DATE}
        image={`${SITE_ORIGIN}${BRAND_HERO}`}
      />
      <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">{TITLE}</h1>
      <p className="mb-6 text-sm text-white/50">Updated October 14, 2026 · 12 min read</p>

      <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
        <Image
          src={BRAND_HERO}
          alt="Calculating parlay odds with a multi-leg sports betting calculator"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-6 text-base leading-relaxed text-white/85">
        <p>
          Knowing <strong className="text-white">how to calculate parlay odds</strong> keeps you from
          guessing at the window. Sportsbooks display a combined price, but understanding the formula
          helps you spot juice, compare formats, and decide whether a three-leg ticket is worth the
          risk. This guide walks through the same math our{" "}
          <Link href="/" className="text-violet-soft underline">
            free parlay calculator
          </Link>{" "}
          uses.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Step 1: Convert each leg to decimal odds
        </h2>
        <p>
          Decimal odds are the cleanest format for parlays because you can multiply them directly.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-white/80">
          <li>
            <strong className="text-white">Positive American</strong> (e.g. +150): decimal = (150 ÷
            100) + 1 = <strong className="text-white">2.50</strong>
          </li>
          <li>
            <strong className="text-white">Negative American</strong> (e.g. −110): decimal = (100 ÷
            110) + 1 ≈ <strong className="text-white">1.909</strong>
          </li>
          <li>
            <strong className="text-white">Fractional</strong> (e.g. 5/2): decimal = (5 ÷ 2) + 1 ={" "}
            <strong className="text-white">3.50</strong>
          </li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Step 2: Multiply every decimal together
        </h2>
        <p>
          Combined decimal odds = d₁ × d₂ × d₃ × … × dₙ. Every additional leg multiplies the price —
          and multiplies the chance that one miss zeros the ticket.
        </p>
        <p>
          <strong className="text-white">Example:</strong> three −110 legs → 1.909 × 1.909 × 1.909 ≈{" "}
          <strong className="text-white">6.97</strong> decimal (about{" "}
          <strong className="text-white">+597</strong> American).
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Step 3: Multiply by your stake for payout
        </h2>
        <p>
          Total payout = stake × combined decimal. Profit = payout − stake. On a $100 stake at 6.97
          decimal, payout ≈ <strong className="text-white">$697</strong> and profit ≈{" "}
          <strong className="text-white">$597</strong>.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Step 4: Read implied probability
        </h2>
        <p>
          Implied win probability ≈ 1 ÷ combined decimal. A 6.97 ticket implies roughly{" "}
          <strong className="text-white">14.3%</strong> if the price were fair — before remembering
          that −110 already embeds juice on each leg.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Worked moneyline example
        </h2>
        <p>
          Suppose an NFL moneyline parlay: −150, −120, and +130. Decimals ≈ 1.667, 1.833, and 2.30.
          Product ≈ <strong className="text-white">7.03</strong>. A $50 stake returns about{" "}
          <strong className="text-white">$351.50</strong> total. Try the same numbers in the{" "}
          <Link href="/moneyline-parlay-calculator" className="text-violet-soft underline">
            moneyline parlay calculator
          </Link>
          .
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Common mistakes when calculating parlays
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-white/80">
          <li>Adding American odds instead of converting to decimal first</li>
          <li>Forgetting that payout includes stake (profit is separate)</li>
          <li>Assuming same-game parlays use independent multiplication — SGP prices are quoted by the book</li>
          <li>Ignoring how fast implied probability drops as legs increase</li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Faster path: use the calculator
        </h2>
        <p>
          Manual math builds intuition. Day to day, open the{" "}
          <Link href="/#calculator" className="text-violet-soft underline">
            Parlay Calculator
          </Link>
          , paste your legs, and confirm the number against your sportsbook slip. For combination
          tickets, switch to the{" "}
          <Link href="/round-robin-calculator" className="text-violet-soft underline">
            round robin bet calculator
          </Link>
          .
        </p>
      </div>

      <div className="mt-10">
        <FaqSection title="Parlay odds calculation FAQs" items={faqs} />
      </div>

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator">OPEN PARLAY CALCULATOR</CtaButton>
      </div>
      </article>
    </>
  );
}
