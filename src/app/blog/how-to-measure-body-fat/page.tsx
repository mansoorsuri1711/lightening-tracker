import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BlogPostSchema from "@/components/BlogPostSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_CHART, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "How to Measure Body Fat at Home";
const description =
  "Learn how to measure body fat with tape (Navy method), calipers, BIA scales, and clinical tools — plus tips for consistent results.";
const slug = "how-to-measure-body-fat";
const datePublished = "2026-10-11";

export const metadata: Metadata = {
  title: "How to Measure Body Fat at Home — Methods Compared",
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
    question: "What is the easiest way to measure body fat at home?",
    answer:
      "A flexible tape measure with the U.S. Navy method is the simplest low-cost option. Smart scales are convenient but can swing with hydration.",
  },
  {
    question: "How often should I measure body fat?",
    answer:
      "Every 2–4 weeks is enough for most people. Daily fluctuations from water and food make short intervals noisy.",
  },
];

export default function MeasureBlogPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
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
          { label: title },
        ]}
      />

      <article>
        <h1 className="mb-4 font-display text-3xl font-bold text-black md:text-4xl">{title}</h1>
        <p className="mb-8 text-lg leading-relaxed text-black">
          Knowing <strong className="font-semibold text-black">how to measure body fat</strong> matters
          more than chasing a perfect single reading. Consistent technique turns estimates into a trend
          you can trust — whether you use a tape, calipers, or a clinic scan.
        </p>

        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl border border-black/15 bg-white">
          <Image
            src={BRAND_CHART}
            alt="Body fat measurement methods illustrated with category chart context"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            1. Tape measure (U.S. Navy method)
          </h2>
          <p className="mb-3 leading-relaxed text-black">
            Measure neck and waist (plus hip for women), then plug numbers into a{" "}
            <Link href="/us-navy-body-fat-calculator" className="text-black hover:underline">
              Navy body fat calculator
            </Link>
            . Keep the tape level, snug but not compressing soft tissue, and measure at the same time of
            day.
          </p>
          <p className="leading-relaxed text-black">
            Best for: free tracking without special equipment. Weakness: user error if landmarks drift.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            2. Skinfold calipers
          </h2>
          <p className="leading-relaxed text-black">
            Calipers pinch subcutaneous fat at specific sites. Multi-site protocols can be accurate in
            trained hands. For beginners, practice and a consistent partner matter more than buying the
            most expensive tool.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            3. Bioelectrical impedance (BIA) scales
          </h2>
          <p className="leading-relaxed text-black">
            BIA sends a small current through the body and estimates fat from resistance. Hydration,
            recent exercise, and meal timing move the number. Use the same scale under the same
            conditions if you rely on it.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            4. Clinical methods (DEXA, Bod Pod, hydrostatic)
          </h2>
          <p className="leading-relaxed text-black">
            These are reference-quality options when you need a benchmark. Many athletes schedule DEXA
            a few times per year, then use tape or BIA between visits. Pair any method with category
            charts for{" "}
            <Link href="/body-fat-percentage-men" className="text-black hover:underline">
              men
            </Link>{" "}
            and{" "}
            <Link href="/body-fat-percentage-women" className="text-black hover:underline">
              women
            </Link>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Measurement checklist
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-black">
            <li>Measure fasted or at a consistent time</li>
            <li>Stand tall; breathe normally — do not suck in the waist</li>
            <li>Record to the nearest 0.25 in / 0.5 cm</li>
            <li>Average two or three readings when they disagree</li>
          </ul>
        </section>

        <FaqSection items={faqs} />

        <section className="mt-12 rounded-2xl border border-black/15 bg-white p-8 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Put your measurements to work
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-black">
            Enter tape numbers in the free calculator and see body fat percentage instantly.
          </p>
          <CtaButton href="/#calculator" ariaLabel="Open body fat calculator">
            OPEN CALCULATOR
          </CtaButton>
        </section>
      </article>
    </div>
  );
}
