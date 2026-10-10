import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BodyFatCalculator from "@/components/BodyFatCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import { getCategoryChart } from "@/lib/bodyFatMath";
import { BRAND_CHART, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Body Fat Percentage Women — Chart & Calculator",
  description:
    "Body fat percentage for women: category chart and free calculator. Includes hip measurement for the U.S. Navy female formula.",
  alternates: { canonical: `${SITE_ORIGIN}/body-fat-percentage-women` },
  openGraph: {
    title: "Body Fat Percentage Women — Chart & Calculator",
    description: "See healthy female body fat ranges and calculate your percentage instantly.",
    url: `${SITE_ORIGIN}/body-fat-percentage-women`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Body fat percentage women chart" }],
  },
};

const faqs = [
  {
    question: "What is a healthy body fat percentage for women?",
    answer:
      "Common charts place fitness around 21–24% and average around 25–31% for adult women. Essential fat needs are higher than for men because of reproductive physiology.",
  },
  {
    question: "Why do women need a hip measurement?",
    answer:
      "The U.S. Navy female equation includes hip circumference to better capture gluteofemoral fat distribution that the male waist-only formula would miss.",
  },
];

export default function WomenPage() {
  const chart = getCategoryChart("female");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Body Fat Percentage Women",
        item: `${SITE_ORIGIN}/body-fat-percentage-women`,
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
        items={[{ label: "Home", href: "/" }, { label: "Body Fat Percentage Women" }]}
      />

      <h1 className="mb-3 font-display text-3xl font-bold text-black md:text-4xl">
        Body Fat Percentage for Women
      </h1>
      <p className="mb-8 max-w-3xl text-lg text-black">
        Female category ranges differ from men&apos;s. Use the calculator below with hip included for
        Navy-method accuracy.
      </p>

      <BodyFatCalculator defaultSex="female" heading="Body fat calculator for women" />

      <article className="mt-14 max-w-4xl">
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-black">
            Female body fat percentage chart
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
              alt="Body fat percentage category chart used for women"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-black">
            Context for women&apos;s body fat
          </h2>
          <p className="leading-relaxed text-black">
            Chasing male athletic percentages is neither realistic nor healthy for most women. Use
            sex-specific charts, track trends over weeks, and read our{" "}
            <Link href="/blog/ideal-body-fat-percentage" className="text-black hover:underline">
              ideal body fat percentage
            </Link>{" "}
            article for age-aware targets. For male ranges, see{" "}
            <Link href="/body-fat-percentage-men" className="text-black hover:underline">
              body fat percentage men
            </Link>
            .
          </p>
        </section>

        <FaqSection items={faqs} />
      </article>
    </div>
  );
}
