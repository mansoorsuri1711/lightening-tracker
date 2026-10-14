import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_FEATURE_2, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "What Is a Parlay Bet? How Parlays Work";
const DESC =
  "A clear explanation of what a parlay bet is, how multi-leg tickets pay, the risks vs. straight bets, and when parlays make sense.";
const SLUG = "what-is-a-parlay-bet";
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
    question: "What is a parlay bet in simple terms?",
    answer:
      "A parlay combines two or more bets into one ticket. Every leg must win (or push per house rules) for the parlay to pay. The odds multiply, so the payout is larger than any single leg.",
  },
  {
    question: "How many legs can a parlay have?",
    answer:
      "Most sportsbooks allow from 2 legs up to 10+ depending on sport and bet type. More legs mean higher payout and lower hit rate.",
  },
];

export default function WhatIsParlayPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "What Is a Parlay Bet?", href: "/blog/what-is-a-parlay-bet" },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
      <BlogPostSchema
        title={TITLE}
        description={DESC}
        slug={SLUG}
        datePublished={DATE}
        image={`${SITE_ORIGIN}${BRAND_FEATURE_2}`}
      />
      <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">{TITLE}</h1>
      <p className="mb-6 text-sm text-white/50">Updated October 14, 2026 · 9 min read</p>

      <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
        <Image
          src={BRAND_FEATURE_2}
          alt="Illustration of a multi-leg parlay bet ticket in sports betting"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-6 text-base leading-relaxed text-white/85">
        <p>
          If you have searched <strong className="text-white">what is a parlay bet</strong>, you are
          asking about the most popular multi-leg wager in U.S. sports betting. A parlay links two or
          more selections on one ticket. Hit them all and the multiplied odds produce a larger payout
          than betting each game alone. Miss one leg and — in a standard parlay — the whole ticket
          loses.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">How parlays work</h2>
        <p>
          Each selection is a “leg.” Sportsbooks convert those prices into a single combined odds
          line. That is why a{" "}
          <Link href="/" className="text-violet-soft underline">
            parlay calculator
          </Link>{" "}
          is useful: it shows the true stake-to-payout relationship before you confirm.
        </p>
        <p>
          Typical legs include moneylines, point spreads, totals, and props. Same-game parlays (SGPs)
          bundle correlated markets from one contest; the book sets a custom price instead of simple
          independent multiplication.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Why parlays pay more — and lose more often
        </h2>
        <p>
          Odds multiply, so payouts climb quickly. Probability multiplies too. Three coin-flip legs
          at true 50% would hit only 12.5% of the time even before juice. Sportsbooks love parlays
          because the combined house edge is usually higher than on straight bets.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">Parlay vs. straight bet</h2>
        <ul className="list-disc space-y-2 pl-5 text-white/80">
          <li>
            <strong className="text-white">Straight bet:</strong> one outcome, lower payout, higher
            hit rate
          </li>
          <li>
            <strong className="text-white">Parlay:</strong> multiple outcomes, higher payout, lower
            hit rate
          </li>
          <li>
            <strong className="text-white">Round robin:</strong> many smaller parlays from the same
            pool — see the{" "}
            <Link href="/round-robin-calculator" className="text-violet-soft underline">
              round robin calculator
            </Link>
          </li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-white pt-4">When a parlay can make sense</h2>
        <p>
          Small recreational stakes, correlated opinions you understand, or boosted odds promotions
          can justify a short parlay. Long “lottery” tickets are entertainment — price them with a
          calculator so the dream payout is honest.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">Next steps</h2>
        <p>
          Learn the formula in{" "}
          <Link href="/blog/how-to-calculate-parlay-odds" className="text-violet-soft underline">
            how to calculate parlay odds
          </Link>
          , then dig into{" "}
          <Link href="/blog/parlay-odds-explained" className="text-violet-soft underline">
            parlay odds explained
          </Link>{" "}
          for probability intuition.
        </p>
      </div>

      <div className="mt-10">
        <FaqSection title="Parlay bet FAQs" items={faqs} />
      </div>

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator">CALCULATE A PARLAY</CtaButton>
      </div>
      </article>
    </>
  );
}
