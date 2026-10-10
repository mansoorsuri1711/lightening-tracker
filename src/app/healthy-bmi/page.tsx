import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BmiCalculator from "@/components/BmiCalculator";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_CHART, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Healthy BMI for Women — Normal Range Explained",
  description:
    "What is a healthy BMI for women? Learn the normal BMI range (18.5–24.9), limits of the scale, and calculate yours free.",
  alternates: { canonical: `${SITE_ORIGIN}/healthy-bmi` },
  openGraph: {
    title: "Healthy BMI for Women — Normal Range Explained",
    description: "Normal BMI for women, when the range shifts, and a free calculator.",
    url: `${SITE_ORIGIN}/healthy-bmi`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Healthy BMI for women" }],
  },
};

const faqs = [
  {
    question: "What is a healthy BMI for women?",
    answer:
      "For most non-pregnant adult women, WHO labels BMI 18.5–24.9 as healthy weight. Individual targets can differ with muscle mass, ethnicity guidelines, and medical history.",
  },
  {
    question: "Is BMI 26 unhealthy for women?",
    answer:
      "BMI 26 falls in the overweight band. It is a screening signal, not a diagnosis. Waist size, blood pressure, lipids, and fitness add needed context.",
  },
  {
    question: "What is a good BMI?",
    answer:
      "Many clinicians treat the healthy weight band as a starting target, then personalize. Athletes and older women may have different optimal ranges.",
  },
];

export default function HealthyBmiPage() {
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
            name: "Healthy BMI",
            item: `${SITE_ORIGIN}/healthy-bmi`,
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
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Healthy BMI" }]} />

      <h1 className="mb-3 font-display text-3xl font-bold text-brand md:text-4xl">
        Healthy BMI for women
      </h1>
      <p className="mb-8 text-lg text-ink/85">
        A <strong className="text-brand">healthy BMI</strong> (also searched as normal BMI) sits
        between 18.5 and 24.9 for most adult women. Use the calculator to see whether you are inside
        that band and what weight range matches your height.
      </p>

      <BmiCalculator heading="Check if your BMI is in the healthy range" />

      <section className="mt-14 mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold text-brand">
          Normal BMI range at a glance
        </h2>
        <ul className="space-y-3">
          {[
            ["Under 18.5", "Underweight — discuss nutrition and medical causes if persistent."],
            ["18.5–24.9", "Healthy / normal weight — common public-health target for adults."],
            ["25–29.9", "Overweight — lifestyle and metabolic checks often recommended."],
            ["30+", "Obesity classes — clinical support may help more than scale weight alone."],
          ].map(([label, body]) => (
            <li key={label} className="rounded-2xl border border-brand/15 bg-white p-4">
              <h3 className="font-display font-bold text-brand">{label}</h3>
              <p className="mt-1 text-sm text-ink/80">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="relative mb-10 aspect-[5/3] w-full overflow-hidden rounded-2xl border border-brand/15">
        <Image
          src={BRAND_CHART}
          alt="Healthy BMI range highlighted on women’s BMI chart"
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold text-brand">
          When “healthy” needs a second look
        </h2>
        <p className="mb-4 leading-relaxed text-ink">
          BMI ignores where fat is stored. Two women with the same BMI can have different waist
          sizes and different cardiometabolic risk. Pregnancy, lactation, high muscle mass, and some
          ethnic-specific thresholds also change interpretation.
        </p>
        <p className="leading-relaxed text-ink">
          Pair this page with our{" "}
          <Link href="/bmi-chart-women" className="font-medium text-brand underline hover:no-underline">
            BMI chart for women
          </Link>{" "}
          and{" "}
          <Link href="/bmi-by-age" className="font-medium text-brand underline hover:no-underline">
            BMI by age
          </Link>{" "}
          notes before setting goals.
        </p>
      </section>

      <FaqSection items={faqs} />

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator">CALCULATE HEALTHY BMI</CtaButton>
      </div>
    </div>
  );
}
