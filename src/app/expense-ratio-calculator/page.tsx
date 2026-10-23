import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExpenseRatioCalculator from "@/components/ExpenseRatioCalculator";
import FaqSection from "@/components/FaqSection";
import { BRAND_FEATURE_2, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Expense Ratio Calculator — Compare Fund Fees",
  description:
    "Free expense ratio calculator. Compare low-cost index funds vs higher-fee funds and see how much fees cost over decades.",
  alternates: { canonical: `${SITE_ORIGIN}/expense-ratio-calculator` },
  openGraph: {
    title: "Expense Ratio Calculator — Compare Fund Fees",
    description: "Visualize the long-term cost of mutual fund and ETF expense ratios.",
    url: `${SITE_ORIGIN}/expense-ratio-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Expense ratio calculator" }],
  },
};

const faqs = [
  {
    question: "What is an expense ratio?",
    answer:
      "An expense ratio is the annual percentage of fund assets taken to cover management and operating costs. It reduces your net return every year.",
  },
  {
    question: "What is a good expense ratio for an index fund?",
    answer:
      "Many broad U.S. equity index funds and ETFs charge well under 0.20%, and some are near 0.03%–0.05%. Actively managed funds are often much higher.",
  },
];

export default function ExpenseRatioPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Expense Ratio Calculator", href: "/expense-ratio-calculator" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Expense ratio calculator
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/80">
          Put two expense ratios side by side on the same contribution plan and see how much wealth
          higher fees quietly remove.
        </p>

        <ExpenseRatioCalculator />

        <section className="mt-14 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_2}
              alt="Comparison graphic of low vs high expense ratio impact on portfolio value"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-white">
              Tiny fees, large dollar differences
            </h2>
            <p className="mb-4 leading-relaxed text-white/80">
              A 0.70 percentage-point gap does not look dramatic on a fund fact sheet. Over 20–30
              years of compounding, it can mean a large gap in ending balance — money that never
              leaves your brokerage statement as a line item called “fee.”
            </p>
            <p className="leading-relaxed text-white/75">
              Read{" "}
              <Link href="/blog/expense-ratio-explained" className="text-violet-soft underline">
                expense ratio explained
              </Link>{" "}
              for definitions, then return here to run your numbers. For a full projection with one
              fee input, use the{" "}
              <Link href="/" className="text-violet-soft underline">
                main index fund calculator
              </Link>
              .
            </p>
          </div>
        </section>

        <div className="mt-14">
          <FaqSection title="Expense ratio FAQs" items={faqs} />
        </div>
      </div>
    </>
  );
}
