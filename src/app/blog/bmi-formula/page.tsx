import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_HERO_MOBILE, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "BMI Formula — Metric and Imperial Equations";
const description =
  "BMI formula explained: kg/m² and the imperial 703 method with worked examples for women.";
const slug = "bmi-formula";
const datePublished = "2026-10-11";

export const metadata: Metadata = {
  title: "BMI Formula — kg/m² and Imperial 703 Method",
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${slug}` },
  openGraph: {
    title: "BMI Formula — kg/m² and Imperial 703 Method",
    description,
    url: `${SITE_ORIGIN}/blog/${slug}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
  },
};

const faqs = [
  {
    question: "What is the official BMI formula?",
    answer:
      "Weight in kilograms divided by the square of height in meters (kg/m²). That is the SI definition used by WHO.",
  },
  {
    question: "Why multiply by 703 in pounds and inches?",
    answer:
      "703 converts imperial units into the same kg/m² scale so categories stay consistent worldwide.",
  },
  {
    question: "Does the BMI formula change for females?",
    answer:
      "No. Category interpretation and healthy weight tables are where women’s guidance differs — not the equation itself.",
  },
];

export default function BmiFormulaPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished={datePublished}
        image={`${SITE_ORIGIN}${BRAND_HERO_MOBILE}`}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "BMI Formula" },
        ]}
      />

      <article>
        <h1 className="mb-4 font-display text-3xl font-bold text-brand md:text-4xl">{title}</h1>
        <p className="mb-6 text-sm text-ink/60">Updated October 11, 2026 · 7 min read</p>

        <p className="mb-6 leading-relaxed text-ink">
          The <strong className="text-brand">BMI formula</strong> is short enough to memorize, which
          is why it powers every major calculator from CDC to clinic portals. Here are both unit
          versions with clean examples.
        </p>

        <div className="relative mb-8 aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-brand/15 mx-auto">
          <Image
            src={BRAND_HERO_MOBILE}
            alt="BMI formula reference visual for mobile readers"
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">Metric equation</h2>
        <pre className="mb-4 overflow-x-auto rounded-2xl bg-brand px-4 py-3 text-sm text-white">
{`BMI = weight_kg / (height_m × height_m)`}
        </pre>
        <p className="mb-4 leading-relaxed text-ink">
          Convert centimeters to meters by dividing by 100. Keep at least two decimal places in
          height for stable results.
        </p>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">Imperial equation</h2>
        <pre className="mb-4 overflow-x-auto rounded-2xl bg-brand px-4 py-3 text-sm text-white">
{`BMI = (weight_lb × 703) / (height_in × height_in)`}
        </pre>
        <p className="mb-4 leading-relaxed text-ink">
          Convert feet and inches to total inches first (5&apos;4&quot; = 64 in). Rounding weight to
          the nearest half-pound is usually enough for home tracking.
        </p>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">BMI Prime</h2>
        <p className="mb-4 leading-relaxed text-ink">
          BMI Prime = BMI ÷ 25. Values near 1.0 sit at the top of the healthy adult band. Our{" "}
          <Link href="/#calculator" className="font-medium text-brand underline hover:no-underline">
            BMI calculator women
          </Link>{" "}
          tool shows Prime beside your main result.
        </p>

        <p className="mb-8 leading-relaxed text-ink">
          For a slower walkthrough with mistakes to avoid, see{" "}
          <Link
            href="/blog/how-to-calculate-bmi"
            className="font-medium text-brand underline hover:no-underline"
          >
            how to calculate BMI
          </Link>
          .
        </p>

        <FaqSection items={faqs} />

        <div className="mt-12 text-center">
          <CtaButton href="/#calculator">USE THE FORMULA INSTANTLY</CtaButton>
        </div>
      </article>
    </div>
  );
}
