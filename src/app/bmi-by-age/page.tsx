import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BmiCalculator from "@/components/BmiCalculator";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_HERO, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "BMI Calculator by Age for Women",
  description:
    "BMI calculator women age guide — how adult cut-offs apply from teens to 65+, with a free age-aware BMI calculator.",
  alternates: { canonical: `${SITE_ORIGIN}/bmi-by-age` },
  openGraph: {
    title: "BMI Calculator by Age for Women",
    description: "Age-aware BMI guidance for women plus an instant calculator.",
    url: `${SITE_ORIGIN}/bmi-by-age`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "BMI calculator by age for women" }],
  },
};

const faqs = [
  {
    question: "Does BMI change with age for women?",
    answer:
      "The formula is the same, but interpretation shifts. Under 18 needs percentile charts; after midlife, muscle loss and fat redistribution mean waist measures and labs matter more.",
  },
  {
    question: "Is there a BMI calculator kg with age?",
    answer:
      "Yes — switch this tool to metric, enter age with kg and cm, and you will see category notes tailored to life stage.",
  },
  {
    question: "What BMI is healthy at 50 for women?",
    answer:
      "Many women still use the 18.5–24.9 band as a reference, but clinicians may accept a slightly higher BMI if muscle mass, waist, and metabolic markers look solid.",
  },
];

export default function BmiByAgePage() {
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
            name: "BMI by Age",
            item: `${SITE_ORIGIN}/bmi-by-age`,
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
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "BMI by Age" }]} />

      <h1 className="mb-3 font-display text-3xl font-bold text-brand md:text-4xl">
        BMI calculator by age for women
      </h1>
      <p className="mb-8 text-lg text-ink/85">
        Searches for <strong className="text-brand">BMI calculator women age</strong> want more than
        a raw number. Enter your age below for adult WHO results plus life-stage notes for teens,
        midlife, and 65+.
      </p>

      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-brand/15">
        <Image
          src={BRAND_HERO}
          alt="BMI calculator by age for women lifestyle hero"
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>

      <BmiCalculator heading="Age-aware BMI calculator for women" />

      <section className="mt-14 mb-10">
        <h2 className="mb-4 font-display text-2xl font-bold text-brand">Age bands at a glance</h2>
        <div className="space-y-4">
          {[
            {
              title: "Under 18",
              body: "Use CDC or WHO BMI-for-age percentiles. Adult cut-offs on calculators are only rough context.",
            },
            {
              title: "Ages 18–39",
              body: "Standard adult categories usually apply. Track trends, not single weigh-ins.",
            },
            {
              title: "Ages 40–64",
              body: "Muscle loss and central fat become more common. Pair BMI with waist and strength habits.",
            },
            {
              title: "Ages 65+",
              body: "Some research links modestly higher BMI with better outcomes in older adults — personalize with a clinician.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-brand/15 bg-white p-4">
              <h3 className="font-display text-lg font-bold text-brand">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/85">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mb-10 leading-relaxed text-ink">
        Next, compare your height on the{" "}
        <Link href="/bmi-chart-women" className="font-medium text-brand underline hover:no-underline">
          women&apos;s BMI chart
        </Link>{" "}
        or review{" "}
        <Link href="/healthy-bmi" className="font-medium text-brand underline hover:no-underline">
          healthy BMI ranges
        </Link>
        .
      </p>

      <FaqSection items={faqs} />

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator">OPEN BMI CALCULATOR</CtaButton>
      </div>
    </div>
  );
}
