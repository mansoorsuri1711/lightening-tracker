import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BlogPostSchema from "@/components/BlogPostSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_HERO, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "How to Calculate Body Fat Percentage";
const description =
  "Learn how to calculate body fat percentage with U.S. Navy formulas, BMI estimates, fat mass math, and a free online calculator.";
const slug = "how-to-calculate-body-fat-percentage";
const datePublished = "2026-10-11";

export const metadata: Metadata = {
  title: "How to Calculate Body Fat Percentage — Step by Step",
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${slug}` },
  openGraph: {
    title,
    description,
    url: `${SITE_ORIGIN}/blog/${slug}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
  },
};

const faqs = [
  {
    question: "How do I calculate body fat percentage from measurements?",
    answer:
      "For the Navy method, combine height with neck and waist (and hip for women) in sex-specific log formulas. Our calculator performs the math automatically.",
  },
  {
    question: "How do I find fat mass from percentage?",
    answer:
      "Fat mass = body fat percentage × body weight. Lean mass = weight − fat mass. Example: 20% of 180 lb is 36 lb of fat mass.",
  },
];

export default function CalculateBlogPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
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
          { label: title },
        ]}
      />

      <article>
        <h1 className="mb-4 font-display text-3xl font-bold text-black md:text-4xl">{title}</h1>
        <p className="mb-8 text-lg leading-relaxed text-black">
          If you searched{" "}
          <strong className="font-semibold text-black">how to calculate body fat percentage</strong>,
          you usually want either the Navy circumference math or a quick BMI-based estimate. Below is
          both — plus how to convert percentage into pounds or kilograms of fat.
        </p>

        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl border border-black/15 bg-white">
          <Image
            src={BRAND_HERO}
            alt="How to calculate body fat percentage with tape measurements"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Step 1: Gather the right inputs
          </h2>
          <p className="leading-relaxed text-black">
            You need sex, age, weight, height, neck, and waist. Women also need hip circumference.
            Measure carefully using the landmarks in our{" "}
            <Link href="/blog/how-to-measure-body-fat" className="text-black hover:underline">
              measurement guide
            </Link>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Step 2: Apply the U.S. Navy formulas
          </h2>
          <p className="mb-3 leading-relaxed text-black">
            Men (inches): 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76.
          </p>
          <p className="mb-3 leading-relaxed text-black">
            Women (inches): 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387.
          </p>
          <p className="leading-relaxed text-black">
            Skip the calculator anxiety — the{" "}
            <Link href="/us-navy-body-fat-calculator" className="text-black hover:underline">
              US Navy body fat calculator
            </Link>{" "}
            runs these equations and supports metric entry.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Step 3: Optional BMI body-fat estimate
          </h2>
          <p className="leading-relaxed text-black">
            A common adult estimate is roughly 1.20 × BMI + 0.23 × age − 10.8 × sex − 5.4 (sex = 1 for
            male, 0 for female). It is convenient but ignores muscle and fat location, so treat it as a
            second opinion next to Navy results on the{" "}
            <Link href="/" className="text-black hover:underline">
              main body fat calculator
            </Link>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Step 4: Convert percentage to fat mass
          </h2>
          <p className="leading-relaxed text-black">
            Multiply body fat percentage by body weight. If you want to reach an{" "}
            <Link href="/blog/ideal-body-fat-percentage" className="text-black hover:underline">
              ideal body fat percentage
            </Link>
            , fat to lose ≈ (current% − ideal%) × weight.
          </p>
        </section>

        <FaqSection items={faqs} />

        <section className="mt-12 rounded-2xl border border-black/15 bg-white p-8 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Calculate without the spreadsheet
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-black">
            Use the free tool for Navy + BMI results, category, and lean mass in one click.
          </p>
          <CtaButton href="/#calculator" ariaLabel="Open body fat calculator">
            CALCULATE NOW
          </CtaButton>
        </section>
      </article>
    </div>
  );
}
