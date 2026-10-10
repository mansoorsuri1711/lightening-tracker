import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { womenChartRows } from "@/lib/bmiMath";
import { BRAND_CHART, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "Height and Weight Chart for Women";
const description =
  "Height and weight chart for women using healthy BMI 18.5–24.9 ranges — a clear answer to how much should I weigh.";
const slug = "height-and-weight-chart-for-women";
const datePublished = "2026-10-11";

export const metadata: Metadata = {
  title: "Height and Weight Chart for Women — Healthy Ranges",
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${slug}` },
  openGraph: {
    title: "Height and Weight Chart for Women — Healthy Ranges",
    description,
    url: `${SITE_ORIGIN}/blog/${slug}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
  },
};

const faqs = [
  {
    question: "How much should I weigh for my height?",
    answer:
      "A common educational answer is the weight range that keeps BMI between 18.5 and 24.9 for your height. Personal targets still depend on muscle, health history, and clinician advice.",
  },
  {
    question: "Is a height and weight chart the same as a BMI chart?",
    answer:
      "They are related. A BMI chart plots categories; a height–weight chart lists example weights that fall inside those categories for each height.",
  },
  {
    question: "Should athletes use the same chart?",
    answer:
      "Not always. Higher muscle mass can push weight above the chart while body fat stays low — discuss sport-specific targets with a qualified professional.",
  },
];

const rows = womenChartRows("imperial");

export default function HeightWeightChartPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished={datePublished}
        image={`${SITE_ORIGIN}${BRAND_CHART}`}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Height & Weight Chart" },
        ]}
      />

      <article>
        <h1 className="mb-4 font-display text-3xl font-bold text-brand md:text-4xl">{title}</h1>
        <p className="mb-6 text-sm text-ink/60">Updated October 11, 2026 · 8 min read</p>

        <p className="mb-6 leading-relaxed text-ink">
          “<strong className="text-brand">How much should I weigh?</strong>” is one of the most common
          follow-ups after a BMI search. This height and weight chart for women lists healthy-range
          weights (BMI 18.5–24.9) so you can scan by height instead of solving the formula first.
        </p>

        <div className="relative mb-8 aspect-[5/3] w-full overflow-hidden rounded-2xl border border-brand/15">
          <Image
            src={BRAND_CHART}
            alt="Height and weight chart for women based on BMI ranges"
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">
          Adult women — healthy weight by height
        </h2>
        <div className="mb-6 overflow-x-auto rounded-2xl border border-brand/15">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand text-white">
              <tr>
                <th className="px-4 py-3">Height</th>
                <th className="px-4 py-3">Healthy min</th>
                <th className="px-4 py-3">Healthy max</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.heightLabel} className="border-t border-brand/10 odd:bg-white even:bg-mist/70">
                  <td className="px-4 py-2.5 font-medium">{row.heightLabel}</td>
                  <td className="px-4 py-2.5">{row.minLabel}</td>
                  <td className="px-4 py-2.5">{row.maxLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mb-4 leading-relaxed text-ink">
          For the full color-coded categories, use the{" "}
          <Link href="/bmi-chart-women" className="font-medium text-brand underline hover:no-underline">
            BMI chart women
          </Link>{" "}
          page. To see exactly where you land today, run the{" "}
          <Link href="/#calculator" className="font-medium text-brand underline hover:no-underline">
            BMI calculator for women
          </Link>
          .
        </p>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">
          Using the chart without obsessing over the scale
        </h2>
        <p className="mb-8 leading-relaxed text-ink">
          Treat the band as a corridor, not a single “ideal” pound. Weekly averages, waist trends,
          and how you feel training or sleeping often matter more than chasing the midpoint of the
          table.
        </p>

        <FaqSection items={faqs} />

        <div className="mt-12 text-center">
          <CtaButton href="/#calculator">FIND YOUR HEALTHY RANGE</CtaButton>
        </div>
      </article>
    </div>
  );
}
