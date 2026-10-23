import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_HERO, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "What Is an Index Fund? A Clear Beginner Guide";
const DESC =
  "Learn what an index fund is, how it tracks a market index, why costs stay low, and how to think about long-term returns.";
const SLUG = "what-is-an-index-fund";
const DATE = "2026-10-23";

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
    question: "What is an index fund in simple terms?",
    answer:
      "An index fund is an investment that aims to match the performance of a market index (like the S&P 500) by holding the same stocks or bonds in similar weights, instead of trying to beat the market with stock picking.",
  },
  {
    question: "Are index funds good for beginners?",
    answer:
      "Many beginners start with broad index funds because they offer instant diversification, typically low fees, and a simple long-term strategy. They still carry market risk — balances can fall when markets fall.",
  },
  {
    question: "Do index funds pay dividends?",
    answer:
      "Equity index funds often distribute dividends collected from the underlying holdings. You can reinvest them to buy more shares, which supports compounding over time.",
  },
];

export default function WhatIsIndexFundPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "What Is an Index Fund?", href: `/blog/${SLUG}` },
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
        <p className="mb-6 text-sm text-white/50">Updated October 23, 2026 · 10 min read</p>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_HERO}
            alt="Beginner-friendly illustration of what an index fund is and how it tracks markets"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            If you searched <strong className="text-white">what is an index fund</strong>, you are
            asking about one of the simplest ways to own a slice of the stock or bond market. An
            index fund does not try to outsmart Wall Street analysts. It aims to{" "}
            <em>track</em> a published index — a rules-based list of securities — as closely as
            possible after costs.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">How an index fund works</h2>
          <p>
            A market index (for example, a large-cap U.S. stock index) lists companies and weights.
            The fund manager buys those holdings — or a representative sample — so the fund’s return
            moves with the index. When the index rises, the fund tends to rise; when the index falls,
            the fund tends to fall. That is the trade-off: you accept market returns in exchange for
            avoiding the risk that an active manager underperforms after fees.
          </p>
          <p>
            Index funds come as mutual funds or ETFs. The structure differs for trading and taxes,
            but the core idea is the same: own the market (or a slice of it) at low cost. Vanguard,
            Fidelity, Schwab, and Investor.gov educational pages all describe this tracking approach
            for the same reason — it is the definition investors keep searching for.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Why costs stay relatively low</h2>
          <p>
            Passive tracking needs less research staffing than stock-picking. Lower operating costs
            show up as lower{" "}
            <Link href="/blog/expense-ratio-explained" className="text-violet-soft underline">
              expense ratios
            </Link>
            . Over decades, keeping more of the market’s return inside your account often matters
            more than guessing the next hot sector. Use the{" "}
            <Link href="/expense-ratio-calculator" className="text-violet-soft underline">
              expense ratio calculator
            </Link>{" "}
            to see dollar impact on a contribution plan.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">What index funds are not</h2>
          <p>
            An index fund is not risk-free. Equity funds can drop sharply in recessions. Bond index
            funds can lose value when interest rates rise. Diversification reduces single-company
            risk; it does not erase market risk. Indexing also will not beat the market — by design
            it aims to match it before and after reasonable fees.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">
            How to think about returns with a calculator
          </h2>
          <p>
            Historical U.S. equity averages are often cited in the high single digits annualized over
            long spans, but any year can be far above or below that. When you use an{" "}
            <Link href="/" className="text-violet-soft underline">
              index fund calculator
            </Link>
            , treat the expected return as a planning assumption, not a promise. Stress-test a lower
            rate, include the fund’s expense ratio, and focus on contributions you can sustain.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Who index funds often fit</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Long-term investors who want broad diversification without picking stocks</li>
            <li>Retirement savers using IRAs or workplace plans that offer index options</li>
            <li>Anyone comparing{" "}
              <Link href="/blog/index-fund-vs-mutual-fund" className="text-violet-soft underline">
                index funds vs actively managed mutual funds
              </Link>
            </li>
          </ul>

          <p>
            Bottom line: an index fund is a low-cost way to own a market basket. Learn the fee,
            pick a diversified index that matches your goal, invest consistently, and let compounding
            work — then verify the math with a projection tool before you scale contributions.
          </p>
        </div>

        <div className="mt-10">
          <FaqSection title="Index fund FAQs" items={faqs} />
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="mb-4 text-white/75">Project your own contribution plan next.</p>
          <CtaButton href="/#calculator" ariaLabel="Open index fund calculator" icon="arrow">
            OPEN CALCULATOR
          </CtaButton>
        </div>
      </article>
    </>
  );
}
