import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_FEATURE_2, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "Expense Ratio Explained: Why Tiny Fees Matter";
const DESC =
  "Understand what an expense ratio is, typical ranges for index funds and ETFs, and how fees reduce long-term investment returns.";
const SLUG = "expense-ratio-explained";
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
    question: "How is an expense ratio charged?",
    answer:
      "It is deducted from fund assets over the year, so you usually do not see a separate invoice. Your net return is simply lower than the fund’s gross performance by roughly the expense ratio (plus tracking differences).",
  },
  {
    question: "Is 1% expense ratio high?",
    answer:
      "For a broad equity index fund, 1% is high compared with many options under 0.20%. On a large balance over decades, 1% can remove a substantial share of potential growth.",
  },
];

export default function ExpenseRatioExplainedPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Expense Ratio Explained", href: `/blog/${SLUG}` },
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
        <p className="mb-6 text-sm text-white/50">Updated October 23, 2026 · 8 min read</p>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_2}
            alt="Visual explaining how expense ratios reduce index fund and ETF returns over time"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            An <strong className="text-white">expense ratio</strong> is the annual percentage of a
            fund’s assets used to pay for management and operations. Vanguard, State Street, and
            investor-education sites emphasize it because the number looks small — 0.05% or 0.75% —
            while the long-term dollar effect is not.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">A simple way to think about it</h2>
          <p>
            If markets return 8% and your fund charges 0.75%, your approximate net return before
            taxes and tracking error is closer to 7.25%. That gap compounds every year. On a
            growing balance with ongoing contributions, the missing return is never “felt” as a
            bill — it simply never appears in your ending balance.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Typical ranges</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Broad U.S. equity index funds / ETFs: often well under 0.20%, sometimes near 0.03%</li>
            <li>Specialty or international funds: wider range depending on complexity</li>
            <li>Actively managed equity mutual funds: frequently much higher than plain index funds</li>
          </ul>
          <p>
            Always read the current prospectus or fact sheet. Marketing pages go stale; the expense
            ratio on the official document is what matters.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">How to measure the damage</h2>
          <p>
            Run the same contribution plan twice — once with a low expense ratio and once with a
            high one — using the{" "}
            <Link href="/expense-ratio-calculator" className="text-violet-soft underline">
              expense ratio calculator
            </Link>
            . Or enter a single fee on the{" "}
            <Link href="/" className="text-violet-soft underline">
              index fund calculator
            </Link>{" "}
            and watch the “fee drag” figure. For definitions of indexing itself, see{" "}
            <Link href="/blog/what-is-an-index-fund" className="text-violet-soft underline">
              what is an index fund
            </Link>
            .
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Fees are not the only cost</h2>
          <p>
            Trading commissions (often zero now), bid-ask spreads on ETFs, and taxes on taxable
            accounts also matter. Still, expense ratio is the cost you can compare cleanly before
            you invest — which is why SERP guides and classroom tools keep featuring interactive fee
            calculators.
          </p>
        </div>

        <div className="mt-10">
          <FaqSection title="Expense ratio FAQs" items={faqs} />
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="mb-4 text-white/75">See the dollar gap on your timeline.</p>
          <CtaButton href="/expense-ratio-calculator" ariaLabel="Open expense ratio calculator" icon="arrow">
            OPEN FEE CALCULATOR
          </CtaButton>
        </div>
      </article>
    </>
  );
}
