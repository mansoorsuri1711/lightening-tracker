import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import IndexFundCalculator from "@/components/IndexFundCalculator";
import { BRAND_FEATURE_3, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Free Growth Tool",
  description:
    "Free compound interest calculator for long-term investing. Project growth with starting balance, contributions, and compounding over time.",
  alternates: { canonical: `${SITE_ORIGIN}/compound-interest-calculator` },
  openGraph: {
    title: "Compound Interest Calculator — Free Growth Tool",
    description: "See how compound interest grows savings and investments over decades.",
    url: `${SITE_ORIGIN}/compound-interest-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Compound interest calculator" }],
  },
};

const faqs = [
  {
    question: "What is compound interest?",
    answer:
      "Compound interest means you earn returns on both your original principal and on prior gains. Over long periods, compounding is the main driver of investment growth.",
  },
  {
    question: "How is this different from the index fund calculator?",
    answer:
      "This page focuses on compounding with contributions and hides the expense-ratio field. The main Index Fund Calculator adds fund fees so projections match real index products.",
  },
];

export default function CompoundInterestPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Compound Interest Calculator", href: "/compound-interest-calculator" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Compound interest calculator
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/80">
          Estimate how starting capital and regular contributions grow when returns compound —
          the same math Investor.gov-style tools use for long-term savings.
        </p>

        <IndexFundCalculator
          title="Compound interest calculator"
          hideExpense
          defaultExpense="0"
          defaultReturn="7"
          showYearTable
        />

        <section className="mt-14 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-white">
              Why compounding rewards time in the market
            </h2>
            <p className="leading-relaxed text-white/80">
              Each year&apos;s gains become part of next year&apos;s base. Starting early — even with
              smaller contributions — often beats waiting for a larger lump sum later. Pair this
              tool with the{" "}
              <Link href="/" className="text-violet-soft underline">
                index fund calculator
              </Link>{" "}
              when you want to include expense ratios.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_3}
              alt="Illustration of compound growth from starting investments early"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        <div className="mt-14">
          <FaqSection title="Compound interest FAQs" items={faqs} />
        </div>
      </div>
    </>
  );
}
