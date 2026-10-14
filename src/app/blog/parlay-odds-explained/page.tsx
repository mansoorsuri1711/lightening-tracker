import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_FEATURE_3, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "Parlay Odds Explained: Combined Price & Probability";
const DESC =
  "Parlay odds explained in plain English — how combined prices form, what juice does to multi-leg tickets, and how implied probability shrinks with each leg.";
const SLUG = "parlay-odds-explained";
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
    question: "What do parlay odds mean?",
    answer:
      "Parlay odds are the single combined price for every leg on the ticket. They represent how much a winning stake returns after all selections cash.",
  },
  {
    question: "Why do parlay odds look better than they feel?",
    answer:
      "Because payout grows multiplicatively while win chance shrinks multiplicatively. A big American number can still imply a low probability of winning.",
  },
];

export default function ParlayOddsExplainedPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Parlay Odds Explained", href: "/blog/parlay-odds-explained" },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
      <BlogPostSchema
        title={TITLE}
        description={DESC}
        slug={SLUG}
        datePublished={DATE}
        image={`${SITE_ORIGIN}${BRAND_FEATURE_3}`}
      />
      <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">{TITLE}</h1>
      <p className="mb-6 text-sm text-white/50">Updated October 14, 2026 · 8 min read</p>

      <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
        <Image
          src={BRAND_FEATURE_3}
          alt="Chart-style view explaining combined parlay odds and probability"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-6 text-base leading-relaxed text-white/85">
        <p>
          Search demand for <strong className="text-white">parlay odds</strong> sits right next to
          calculator queries. Bettors see +600 or +1200 on a slip and want to know what that price
          really means. This explainer connects combined odds, juice, and implied probability — then
          points you back to the{" "}
          <Link href="/" className="text-violet-soft underline">
            parlay odds calculator
          </Link>{" "}
          to test live numbers.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Combined odds are a product, not a sum
        </h2>
        <p>
          Each leg contributes a decimal multiplier. The product becomes the ticket’s decimal odds;
          converting that product back to American odds gives the headline price most U.S. books
          show. Adding American numbers together is incorrect and understates longshots badly.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">Juice compounds</h2>
        <p>
          A fair coin flip is 2.00 decimal. A −110 price is ~1.91. Across three legs you are not
          paying juice once — you are multiplying slightly worse-than-fair prices three times. That
          gap is a big reason parlays carry a higher effective house edge than straight bets.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Implied probability shrinks fast
        </h2>
        <p>
          Implied probability ≈ 1 ÷ combined decimal. Rough guide for typical −110 legs (ignoring
          pushes):
        </p>
        <ul className="list-disc space-y-2 pl-5 text-white/80">
          <li>2 legs ≈ 3.64 decimal → ~27.5% implied</li>
          <li>3 legs ≈ 6.97 decimal → ~14.3% implied</li>
          <li>4 legs ≈ 13.3 decimal → ~7.5% implied</li>
          <li>5 legs ≈ 25.4 decimal → ~3.9% implied</li>
        </ul>
        <p>
          Those are odds-based implications, not predictions. They still explain why five-leg
          “lock” tickets disappoint so often.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">
          Reading boosted and SGP prices
        </h2>
        <p>
          Odds boosts raise the listed American number; always recalculate payout from the boosted
          price, not from independent leg multiplication. Same-game parlays are custom markets —
          paste the book’s SGP price into a calculator as a single decimal or American figure when
          you only need stake → payout.
        </p>

        <h2 className="font-display text-2xl font-bold text-white pt-4">Put it into practice</h2>
        <p>
          Open the{" "}
          <Link href="/nfl-parlay-calculator" className="text-violet-soft underline">
            NFL parlay calculator
          </Link>{" "}
          with your Sunday card, or follow the full formula in{" "}
          <Link href="/blog/how-to-calculate-parlay-odds" className="text-violet-soft underline">
            how to calculate parlay odds
          </Link>
          .
        </p>
      </div>

      <div className="mt-10">
        <FaqSection title="Parlay odds FAQs" items={faqs} />
      </div>

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator">TEST YOUR ODDS</CtaButton>
      </div>
      </article>
    </>
  );
}
