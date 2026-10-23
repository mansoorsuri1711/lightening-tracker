import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import IndexFundCalculator from "@/components/IndexFundCalculator";
import { BRAND_FEATURE_4, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Investment Growth Calculator — Free Projection",
  description:
    "Free investment growth calculator. Estimate how starting balance, contributions, and expected return grow your portfolio over time.",
  alternates: { canonical: `${SITE_ORIGIN}/investment-growth-calculator` },
  openGraph: {
    title: "Investment Growth Calculator — Free Projection",
    description: "Model portfolio growth with regular investments and compounding.",
    url: `${SITE_ORIGIN}/investment-growth-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Investment growth calculator" }],
  },
};

const faqs = [
  {
    question: "How does an investment growth calculator work?",
    answer:
      "It compounds an expected annual return across your time horizon and adds contributions each month or year, then reports ending balance, total contributed, and growth.",
  },
  {
    question: "Can I use this for index funds and ETFs?",
    answer:
      "Yes. Enter the expected return and expense ratio that match the fund you are considering. For fee comparisons, open the expense ratio calculator.",
  },
];

export default function InvestmentGrowthPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Investment Growth Calculator", href: "/investment-growth-calculator" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Investment growth calculator
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/80">
          Visualize how consistent investing can grow a portfolio — the same intent behind popular
          tools from NerdWallet, iShares, and Fidelity-style growth calculators.
        </p>

        <IndexFundCalculator
          title="Investment growth calculator"
          defaultInitial="5000"
          defaultContribution="300"
          defaultYears="25"
          defaultReturn="8"
          defaultExpense="0.1"
          showYearTable
        />

        <section className="mt-14 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-white">
              Contributions drive most of the outcome
            </h2>
            <p className="leading-relaxed text-white/80">
              For many savers, the monthly deposit matters more than shaving a few basis points off
              an assumed return. Use the yearly table to see when growth starts to outpace new
              contributions — then stress-test a lower return on the{" "}
              <Link href="/" className="text-violet-soft underline">
                index fund calculator
              </Link>
              .
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_4}
              alt="Yearly investment growth table showing balance building over time"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        <div className="mt-14">
          <FaqSection title="Investment growth FAQs" items={faqs} />
        </div>
      </div>
    </>
  );
}
