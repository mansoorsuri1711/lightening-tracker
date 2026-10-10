import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BmiCalculator from "@/components/BmiCalculator";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { womenChartRows } from "@/lib/bmiMath";
import { BRAND_CHART, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "BMI Chart Women — Female Height & Weight Table",
  description:
    "BMI chart for women with WHO categories and healthy weight ranges by height. Use with our free BMI calculator for women.",
  alternates: { canonical: `${SITE_ORIGIN}/bmi-chart-women` },
  openGraph: {
    title: "BMI Chart Women — Female Height & Weight Table",
    description: "Women’s BMI chart, category bands, and healthy weight by height.",
    url: `${SITE_ORIGIN}/bmi-chart-women`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "BMI chart for women" }],
  },
};

const faqs = [
  {
    question: "How do I read a BMI chart for women?",
    answer:
      "Find your height, then see which weight band lands in underweight, healthy weight, overweight, or obesity. Or calculate BMI first and match the number to the category colors.",
  },
  {
    question: "Is a BMI chart female different from a men’s chart?",
    answer:
      "Adult WHO cut-offs are the same. Women-focused charts emphasize female heights, healthy weight examples, and notes about essential fat, pregnancy, and age.",
  },
  {
    question: "What BMI chart women searches usually want?",
    answer:
      "A clear table for adult women, a color scale, and a calculator nearby — which is exactly what this page pairs together.",
  },
];

const imperialRows = womenChartRows("imperial");
const metricRows = womenChartRows("metric");

export default function BmiChartWomenPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "BMI Chart Women",
            item: `${SITE_ORIGIN}/bmi-chart-women`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "BMI Chart Women" }]} />

      <h1 className="mb-3 font-display text-3xl font-bold text-brand md:text-4xl">
        BMI chart for women
      </h1>
      <p className="mb-8 max-w-3xl text-lg text-ink/85">
        A practical <strong className="text-brand">BMI chart women</strong> use to match height and
        weight with WHO categories — plus a live calculator so you do not have to interpolate the
        table by hand.
      </p>

      <div className="relative mb-10 aspect-[5/3] w-full overflow-hidden rounded-2xl border border-brand/15 bg-mist">
        <Image
          src={BRAND_CHART}
          alt="BMI chart women visual with category color bands"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
          priority
        />
      </div>

      <BmiCalculator heading="Calculate BMI, then compare the chart" />

      <section className="mt-14 mb-14">
        <h2 className="mb-3 font-display text-2xl font-bold text-brand">
          Healthy weight by height (imperial)
        </h2>
        <p className="mb-4 text-ink/85">
          Weights below sit inside BMI 18.5–24.9 for adult women — the standard healthy band on most{" "}
          <em>BMI chart for women</em> searches.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-brand/15">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Height</th>
                <th className="px-4 py-3 font-semibold">Healthy min</th>
                <th className="px-4 py-3 font-semibold">Healthy max</th>
              </tr>
            </thead>
            <tbody>
              {imperialRows.map((row) => (
                <tr key={row.heightLabel} className="border-t border-brand/10 odd:bg-white even:bg-mist/70">
                  <td className="px-4 py-2.5 font-medium text-ink">{row.heightLabel}</td>
                  <td className="px-4 py-2.5 text-ink">{row.minLabel}</td>
                  <td className="px-4 py-2.5 text-ink">{row.maxLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-3 font-display text-2xl font-bold text-brand">
          Healthy weight by height (metric)
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-brand/15">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Height</th>
                <th className="px-4 py-3 font-semibold">Healthy min</th>
                <th className="px-4 py-3 font-semibold">Healthy max</th>
              </tr>
            </thead>
            <tbody>
              {metricRows.map((row) => (
                <tr key={row.heightLabel} className="border-t border-brand/10 odd:bg-white even:bg-mist/70">
                  <td className="px-4 py-2.5 font-medium text-ink">{row.heightLabel}</td>
                  <td className="px-4 py-2.5 text-ink">{row.minLabel}</td>
                  <td className="px-4 py-2.5 text-ink">{row.maxLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-3 font-display text-2xl font-bold text-brand">Category bands</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            ["Underweight", "BMI under 18.5"],
            ["Healthy weight", "BMI 18.5–24.9"],
            ["Overweight", "BMI 25–29.9"],
            ["Obesity class I–III", "BMI 30 and above"],
          ].map(([title, body]) => (
            <li key={title} className="rounded-2xl border border-brand/15 bg-white p-4">
              <h3 className="font-display font-bold text-brand">{title}</h3>
              <p className="mt-1 text-sm text-ink/80">{body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-ink/85">
          For normal-range goals, read{" "}
          <Link href="/healthy-bmi" className="font-medium text-brand underline hover:no-underline">
            healthy BMI
          </Link>
          . For age context, see{" "}
          <Link href="/bmi-by-age" className="font-medium text-brand underline hover:no-underline">
            BMI calculator by age
          </Link>
          .
        </p>
      </section>

      <FaqSection items={faqs} />

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator" ariaLabel="Open BMI calculator women">
          OPEN BMI CALCULATOR
        </CtaButton>
      </div>
    </div>
  );
}
