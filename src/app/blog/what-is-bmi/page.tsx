import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_CHART, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "What Is BMI? Meaning for Women Explained";
const description =
  "What is BMI? Learn BMI meaning, how body mass index is used for women, and where the scale falls short.";
const slug = "what-is-bmi";
const datePublished = "2026-10-11";

export const metadata: Metadata = {
  title: "What Is BMI? Meaning, Uses & Limits for Women",
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${slug}` },
  openGraph: {
    title: "What Is BMI? Meaning, Uses & Limits for Women",
    description,
    url: `${SITE_ORIGIN}/blog/${slug}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
  },
};

const faqs = [
  {
    question: "What does BMI mean?",
    answer:
      "BMI stands for body mass index — a height-adjusted weight score used as a population screening tool for underweight, healthy weight, overweight, and obesity.",
  },
  {
    question: "What is my BMI telling me?",
    answer:
      "It compares your weight to your height. It does not measure fat percentage, muscle, or where fat is stored, so it is a starting point rather than a full health report.",
  },
  {
    question: "Why do women ask about BMI meaning separately?",
    answer:
      "Women often want context on essential fat, pregnancy, menopause, and healthy ranges — topics generic calculators skip.",
  },
];

export default function WhatIsBmiPage() {
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
          { label: "What Is BMI?" },
        ]}
      />

      <article>
        <h1 className="mb-4 font-display text-3xl font-bold text-brand md:text-4xl">{title}</h1>
        <p className="mb-6 text-sm text-ink/60">Updated October 11, 2026 · 8 min read</p>

        <p className="mb-6 leading-relaxed text-ink">
          <strong className="text-brand">What is BMI?</strong> Body mass index is a simple ratio of
          weight to height squared. Searches for BMI meaning and “what is my BMI” usually want three
          things: a definition, a personal number, and a sense of whether that number is “good.”
        </p>

        <div className="relative mb-8 aspect-[5/3] w-full overflow-hidden rounded-2xl border border-brand/15">
          <Image
            src={BRAND_CHART}
            alt="BMI meaning illustrated on a women’s category chart"
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">
          Why clinicians still use body mass index
        </h2>
        <p className="mb-4 leading-relaxed text-ink">
          BMI is cheap, repeatable, and widely standardized. Public-health charts, insurance forms,
          and research studies rely on it because large groups can be compared quickly. For an
          individual woman, it is best treated as a screening flag — not a full body-composition
          test.
        </p>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">
          What BMI does not measure
        </h2>
        <p className="mb-4 leading-relaxed text-ink">
          It cannot see muscle versus fat, bone density, or visceral fat. A strength-trained woman
          and a sedentary woman can share a BMI and still have very different metabolic risk. That is
          why our{" "}
          <Link href="/healthy-bmi" className="font-medium text-brand underline hover:no-underline">
            healthy BMI
          </Link>{" "}
          page pairs ranges with caveats.
        </p>

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold text-brand">
          How women can use BMI wisely
        </h2>
        <ol className="mb-6 list-decimal space-y-2 pl-5 text-ink">
          <li>Calculate with a consistent method (same units, same time of day).</li>
          <li>Map the number on a{" "}
            <Link href="/bmi-chart-women" className="font-medium text-brand underline hover:no-underline">
              BMI chart for women
            </Link>
            .</li>
          <li>Add waist, energy, strength, and clinical labs before changing habits drastically.</li>
        </ol>

        <p className="mb-8 leading-relaxed text-ink">
          Ready for your number? Open the{" "}
          <Link href="/#calculator" className="font-medium text-brand underline hover:no-underline">
            BMI calculator for women
          </Link>
          .
        </p>

        <FaqSection items={faqs} />

        <div className="mt-12 text-center">
          <CtaButton href="/#calculator">CHECK YOUR BMI</CtaButton>
        </div>
      </article>
    </div>
  );
}
