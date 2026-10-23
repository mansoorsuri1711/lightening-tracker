import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_FEATURE_3, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "Index Fund vs Mutual Fund: Key Differences";
const DESC =
  "Compare index funds and mutual funds — management style, fees, goals, and how to choose for long-term investing.";
const SLUG = "index-fund-vs-mutual-fund";
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
    question: "Is an index fund a type of mutual fund?",
    answer:
      "Yes. Many index funds are mutual funds (and many are ETFs). “Index” describes the strategy — track an index — while “mutual fund” describes a pooled investment structure.",
  },
  {
    question: "Which is better: index fund or mutual fund?",
    answer:
      "It depends on the specific funds. Low-cost broad index funds have historically been hard for the average active mutual fund to beat after fees. Some active funds may fit niche goals, but costs and consistency matter.",
  },
];

export default function IndexVsMutualPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Index Fund vs Mutual Fund", href: `/blog/${SLUG}` },
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
        <p className="mb-6 text-sm text-white/50">Updated October 23, 2026 · 9 min read</p>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_3}
            alt="Side-by-side concept of index funds versus actively managed mutual funds"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            Searches for <strong className="text-white">index fund vs mutual fund</strong> usually
            mix two ideas: strategy (passive indexing vs active stock-picking) and wrapper (mutual
            fund vs ETF). Clarifying both helps you read fund fact sheets without confusion — the
            same distinction Fidelity, Navy Federal, and Bogleheads discussions keep revisiting.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Quick comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-white/[0.06] text-white/70">
                <tr>
                  <th className="px-3 py-2.5 font-medium">Topic</th>
                  <th className="px-3 py-2.5 font-medium">Index fund</th>
                  <th className="px-3 py-2.5 font-medium">Active mutual fund</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-t border-white/10">
                  <td className="px-3 py-2.5">Goal</td>
                  <td className="px-3 py-2.5">Match an index</td>
                  <td className="px-3 py-2.5">Beat a benchmark</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-3 py-2.5">Typical fees</td>
                  <td className="px-3 py-2.5">Often very low</td>
                  <td className="px-3 py-2.5">Often higher</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-3 py-2.5">Holdings</td>
                  <td className="px-3 py-2.5">Rules-based basket</td>
                  <td className="px-3 py-2.5">Manager discretion</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-3 py-2.5">Outcome</td>
                  <td className="px-3 py-2.5">Market-like return − fees</td>
                  <td className="px-3 py-2.5">Can win or lose vs market</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-display text-2xl font-bold text-white">Fees change the race</h2>
          <p>
            Active managers need to outperform by enough to cover higher{" "}
            <Link href="/blog/expense-ratio-explained" className="text-violet-soft underline">
              expense ratios
            </Link>{" "}
            before investors come out ahead. Many do not, especially over long periods. That is why
            fee-aware investors run numbers in an{" "}
            <Link href="/expense-ratio-calculator" className="text-violet-soft underline">
              expense ratio calculator
            </Link>{" "}
            before choosing a “hot” active fund.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">When an active fund may still fit</h2>
          <p>
            Some investors accept higher costs for a strategy an index does not offer, or for a
            fund that fills a niche sleeve of a portfolio. The key is honesty about odds and costs —
            not marketing language. If your goal is broad U.S. or global equity exposure, a
            diversified{" "}
            <Link href="/blog/what-is-an-index-fund" className="text-violet-soft underline">
              index fund
            </Link>{" "}
            is often the simpler default.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">How to decide with math</h2>
          <p>
            Assume the same gross return, plug each fund’s expense ratio into the{" "}
            <Link href="/" className="text-violet-soft underline">
              index fund calculator
            </Link>
            , and compare ending balances. If the active fund needs a higher return just to break
            even after fees, ask whether that outperformance is realistic for your time horizon.
          </p>
        </div>

        <div className="mt-10">
          <FaqSection title="Index vs mutual fund FAQs" items={faqs} />
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="mb-4 text-white/75">Compare fee drag on your contribution plan.</p>
          <CtaButton href="/expense-ratio-calculator" ariaLabel="Open expense ratio calculator" icon="arrow">
            COMPARE FEES
          </CtaButton>
        </div>
      </article>
    </>
  );
}
