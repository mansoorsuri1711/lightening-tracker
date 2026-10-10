import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BodyFatCalculator from "@/components/BodyFatCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import { getCategoryChart } from "@/lib/bodyFatMath";
import { BRAND_CHART, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Body Fat Percentage Men — Chart & Calculator",
  description:
    "Body fat percentage for men: category chart (essential, athletes, fitness, average, obese) plus a free calculator using the U.S. Navy method.",
  alternates: { canonical: `${SITE_ORIGIN}/body-fat-percentage-men` },
  openGraph: {
    title: "Body Fat Percentage Men — Chart & Calculator",
    description: "See healthy male body fat ranges and calculate your percentage instantly.",
    url: `${SITE_ORIGIN}/body-fat-percentage-men`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Body fat percentage men chart" }],
  },
};

const faqs = [
  {
    question: "What is a good body fat percentage for men?",
    answer:
      "Many fitness charts place athletic men around 6–13% and fitness-oriented men around 14–17%. Average often lands near 18–24%. Ideal targets also rise slightly with age.",
  },
  {
    question: "Is 15% body fat good for men?",
    answer:
      "About 15% typically sits in the fitness category for men — lean enough for visible muscle definition for many people, while remaining sustainable for a lot of lifestyles.",
  },
];

export default function MenPage() {
  const chart = getCategoryChart("male");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Body Fat Percentage Men",
        item: `${SITE_ORIGIN}/body-fat-percentage-men`,
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-5xl px-3 py-8 sm:px-4 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Body Fat Percentage Men" }]}
      />

      <h1 className="mb-3 font-display text-3xl font-bold text-black md:text-4xl">
        Body Fat Percentage for Men
      </h1>
      <p className="mb-8 max-w-3xl text-lg text-black">
        Understand male body fat categories, then estimate your percentage with the calculator below
        (male formulas selected by default).
      </p>

      <BodyFatCalculator defaultSex="male" heading="Body fat calculator for men" />

      <article className="mt-14 max-w-4xl">
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-black">
            Male body fat percentage chart
          </h2>
          <div className="mb-6 overflow-x-auto rounded-2xl border border-black/15">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-left text-black">
                <tr>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Body fat %</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {chart.map((row) => (
                  <tr key={row.label} className="border-t border-black/10">
                    <td className="px-4 py-3">{row.label}</td>
                    <td className="px-4 py-3">
                      {row.label === "Obese" ? `${row.min}%+` : `${row.min}–${row.max}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-black/15 bg-white">
            <Image
              src={BRAND_CHART}
              alt="Body fat percentage category chart used for men"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-black">
            Why men track body fat percentage
          </h2>
          <p className="leading-relaxed text-black">
            Two men can share the same weight and look completely different. Body fat percentage
            explains that gap. Pair this chart with our{" "}
            <Link href="/blog/ideal-body-fat-percentage" className="text-black hover:underline">
              ideal body fat percentage guide
            </Link>{" "}
            or compare women&apos;s ranges on the{" "}
            <Link href="/body-fat-percentage-women" className="text-black hover:underline">
              women&apos;s chart
            </Link>
            .
          </p>
        </section>

        <FaqSection items={faqs} />
      </article>
    </div>
  );
}
