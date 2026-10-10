import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_HERO, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "How to Calculate BMI Step by Step";
const description =
  "Learn how to calculate BMI with metric and imperial examples. A clear guide for women who want the math behind the calculator.";
const slug = "how-to-calculate-bmi";
const datePublished = "2026-10-11";

export const metadata: Metadata = {
  title: "How to Calculate BMI — Metric & Imperial Steps",
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${slug}` },
  openGraph: {
    title: "How to Calculate BMI — Metric & Imperial Steps",
    description,
    url: `${SITE_ORIGIN}/blog/${slug}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
  },
};

const faqs = [
  {
    question: "How do you calculate BMI quickly?",
    answer:
      "Metric: divide weight in kilograms by height in meters squared. Imperial: multiply weight in pounds by 703, then divide by height in inches squared.",
  },
  {
    question: "Is calculating BMI different for women?",
    answer:
      "The arithmetic is the same. Women-focused guides add category context, healthy weight ranges, and age notes after you have the number.",
  },
  {
    question: "Can I skip the math?",
    answer:
      "Yes. Use the free BMI calculator for women on our homepage — it applies the same formulas instantly.",
  },
];

export default function HowToCalculateBmiPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished={datePublished}
        image={`${SITE_ORIGIN}${BRAND_HERO}`}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "How to Calculate BMI" },
        ]}
      />

      <article>
        <h1 className="mb-4 font-display text-3xl font-bold text-brand md:text-4xl">{title}</h1>
        <p className="mb-6 text-sm text-ink/60">Updated October 11, 2026 · 9 min read</p>

        <p className="mb-6 leading-relaxed text-ink">
          People search <strong className="text-brand">how to calculate BMI</strong> when they want
          the steps behind the tool — not just a black-box result. This guide walks through both unit
          systems with women-focused examples, then shows how to turn the number into a category.
        </p>

        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-brand/15">
          <Image
            src={BRAND_HERO}
            alt="How to calculate BMI illustrated for women"
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">
          Metric formula (kg and meters)
        </h2>
        <p className="mb-4 leading-relaxed text-ink">
          BMI = weight (kg) ÷ [height (m)]². Example: a woman who is 165 cm (1.65 m) and 68 kg has BMI
          = 68 ÷ (1.65 × 1.65) ≈ 25.0 — the edge of healthy weight and overweight.
        </p>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">
          Imperial formula (lb and inches)
        </h2>
        <p className="mb-4 leading-relaxed text-ink">
          BMI = [weight (lb) × 703] ÷ [height (in)]². Example: 5&apos;5&quot; (65 in) and 150 lb →
          (150 × 703) ÷ (65 × 65) ≈ 25.0. Same math, different units.
        </p>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">
          From number to category
        </h2>
        <p className="mb-4 leading-relaxed text-ink">
          Match your result to WHO bands: under 18.5 underweight, 18.5–24.9 healthy, 25–29.9
          overweight, 30+ obesity classes. Then open our{" "}
          <Link href="/bmi-chart-women" className="font-medium text-brand underline hover:no-underline">
            BMI chart for women
          </Link>{" "}
          to see the healthy weight window for your height.
        </p>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">
          Common mistakes when you compute BMI
        </h2>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-ink">
          <li>Mixing cm with the metric formula (convert to meters first).</li>
          <li>Using feet only instead of total inches in the imperial equation.</li>
          <li>Treating a single weigh-in as a diagnosis without trends or waist context.</li>
        </ul>

        <p className="mb-8 leading-relaxed text-ink">
          Prefer the exact equations spelled out? Read the{" "}
          <Link href="/blog/bmi-formula" className="font-medium text-brand underline hover:no-underline">
            BMI formula
          </Link>{" "}
          article, or skip ahead with the{" "}
          <Link href="/#calculator" className="font-medium text-brand underline hover:no-underline">
            BMI calculator women
          </Link>{" "}
          tool.
        </p>

        <FaqSection items={faqs} />

        <div className="mt-12 text-center">
          <CtaButton href="/#calculator">CALCULATE BMI NOW</CtaButton>
        </div>
      </article>
    </div>
  );
}
