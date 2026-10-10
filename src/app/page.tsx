import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BmiCalculator from "@/components/BmiCalculator";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import {
  BRAND_CHART,
  BRAND_HERO,
  BRAND_LOGO,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_RATING,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "BMI Calculator Women — Free Female BMI Tool & Chart",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free BMI calculator for women. Get your body mass index, WHO category, and healthy weight range in seconds — metric or imperial, no signup.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "BMI Calculator Women — Free Female BMI Tool & Chart",
    description:
      "Calculate BMI for women with instant categories, healthy weight range, and a women’s BMI chart. Free and private.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "BMI Calculator Women homepage tool preview",
      },
    ],
  },
};

const faqs = [
  {
    question: "How does this BMI calculator for women work?",
    answer:
      "Enter age, height, and weight in metric or imperial units. The tool uses the standard WHO adult formula (weight ÷ height²) and maps your result to underweight, healthy weight, overweight, or obesity classes.",
  },
  {
    question: "Is BMI different for women than men?",
    answer:
      "The adult BMI formula and WHO cut-offs are the same for women and men. Interpretation can differ because women typically carry more essential fat, and age, muscle mass, pregnancy, and waist size add important context.",
  },
  {
    question: "What is a healthy BMI for women?",
    answer:
      "For most adult women, a BMI between 18.5 and 24.9 is labeled healthy weight on the WHO chart. Athletes, older adults, and people who are pregnant need individualized guidance from a clinician.",
  },
  {
    question: "Should I use metric or imperial units?",
    answer:
      "Either works. Choose US (lb/in) or metric (kg/cm) at the top of the calculator — helpful if you are in the United States or prefer kilograms and centimeters.",
  },
  {
    question: "Why look at BMI and a chart together?",
    answer:
      "A single number is easier to track over time. The women’s BMI chart and healthy weight range show how that number sits for your height, which answers “how much should I weigh?” more clearly.",
  },
];

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: SITE_NAME,
        description:
          "Free BMI calculator for women with WHO categories and healthy weight range.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: "BMI Calculator Women — Free Female BMI Tool & Chart",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}${BRAND_LOGO}`,
          width: 512,
          height: 512,
          ...imageObjectLicensing,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: SITE_NAME,
        url: `${SITE_ORIGIN}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}${BRAND_LOGO}`,
          width: 512,
          height: 512,
          ...imageObjectLicensing,
        },
      },
      {
        ...WEB_APPLICATION_JSON_LD,
        "@id": `${SITE_ORIGIN}/#webapp`,
      },
      {
        "@type": "HowTo",
        name: "How to calculate BMI for women",
        description:
          "Calculate body mass index with height and weight using the WHO adult formula.",
        step: [
          {
            "@type": "HowToStep",
            name: "Choose units",
            text: "Select imperial (lb/in) or metric (kg/cm).",
          },
          {
            "@type": "HowToStep",
            name: "Enter age, height, and weight",
            text: "Add your current measurements. Sex defaults to female on this women’s tool.",
          },
          {
            "@type": "HowToStep",
            name: "Calculate BMI",
            text: "Press Calculate BMI to see your index, category, and healthy weight range.",
          },
          {
            "@type": "HowToStep",
            name: "Read the chart",
            text: "Compare your result with the women’s BMI scale and category bands.",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="container mx-auto px-3 pt-4 pb-16 sm:px-4 sm:pt-5 md:pt-6 lg:max-w-7xl">
        <section className="mb-10 md:mb-14">
          <div className="mb-4 max-w-3xl animate-fade-up sm:mb-5">
            <p className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.18em] text-pink">
              BMI Calculator Women
            </p>
            <h1 className="font-display text-[1.65rem] font-bold leading-tight text-brand sm:text-4xl md:text-5xl">
              Know your BMI in seconds
            </h1>
            <p className="mt-2 text-sm leading-snug text-ink/80 sm:mt-3 sm:text-base md:text-lg">
              Free BMI calculator for women with WHO categories, a healthy weight range for your
              height, and a clear women&apos;s BMI chart — metric or imperial, no signup.
            </p>
            <p className="mt-1.5 hidden text-sm font-medium text-brand/80 sm:flex sm:flex-wrap sm:items-center sm:gap-1.5">
              <span>{SITE_RATING.ratingValue}</span>
              <span className="tracking-tight text-gold" aria-hidden="true">
                ★★★★☆
              </span>
              <span>
                ({Number(SITE_RATING.ratingCount).toLocaleString()}) · Free · Web · Health
              </span>
            </p>
          </div>

          <BmiCalculator />
        </section>

        <article className="max-w-4xl">
          <section id="what-is-bmi-calculator-women" className="mb-14">
            <h2 className="mb-4 font-display text-2xl font-bold text-brand md:text-3xl">
              What this BMI calculator for women shows you
            </h2>
            <p className="mb-4 leading-relaxed text-ink">
              Body mass index (BMI) estimates how your weight relates to your height. This{" "}
              <strong className="font-semibold text-brand">BMI calculator women</strong> tool turns
              those two numbers into a clear index, a WHO category, and the healthy weight band for
              your height — so you can answer “what is my BMI?” without doing the math by hand.
            </p>
            <p className="mb-4 leading-relaxed text-ink">
              Searches for BMI calculator female, BMI calculator for women, and BMI chart women all
              point to the same need: a fast, trustworthy result with women-focused explanation. We
              default to female inputs, highlight women’s chart ranges, and note when age or life
              stage changes how you should read the number.
            </p>
            <p className="mb-6 leading-relaxed text-ink">
              Want the visual table first? Open the{" "}
              <Link href="/bmi-chart-women" className="font-medium text-brand underline hover:no-underline">
                BMI chart for women
              </Link>
              .
            </p>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-brand/15 bg-mist">
              <Image
                src={BRAND_HERO}
                alt="BMI Calculator Women hero showing female body mass index tracking"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </section>

          <section id="how-to-use" className="mb-14">
            <h2 className="mb-12 font-display text-2xl font-bold text-brand md:mb-16 md:text-3xl">
              How to use this female BMI calculator
            </h2>
            <ol className="relative">
              {(
                [
                  {
                    step: "01",
                    title: "Pick your units",
                    body: "Use US pounds and inches or metric kilograms and centimeters. The formula result is the same either way.",
                  },
                  {
                    step: "02",
                    title: "Enter age, height, and weight",
                    body: "Age adds context notes for teens and women over 40 or 65. Height and weight drive the BMI and healthy range.",
                  },
                  {
                    step: "03",
                    title: "Calculate and read your category",
                    body: "See your BMI, WHO label, BMI Prime, and the healthy weight window for your height.",
                  },
                  {
                    step: "04",
                    title: "Compare with the women’s chart",
                    body: "Use the on-page scale and our full BMI chart women page to see where you sit visually.",
                  },
                ] as const
              ).map((item, index, list) => (
                <li
                  key={item.step}
                  className="relative flex items-start gap-4 pb-12 last:pb-0 md:gap-6 md:pb-16"
                >
                  <div className="relative flex w-12 flex-shrink-0 flex-col items-center md:w-14">
                    {index < list.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-[-3rem] left-1/2 top-10 w-px -translate-x-1/2 bg-brand/20 md:bottom-[-4rem] md:top-11"
                      />
                    ) : null}
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-pink bg-gradient-to-br from-blush to-white font-display text-sm font-bold text-brand md:h-11 md:w-11">
                      {item.step}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 md:pt-2">
                    <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-brand md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/85 md:text-[15px]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="categories" className="mb-14">
            <h2 className="mb-4 font-display text-2xl font-bold text-brand md:text-3xl">
              BMI categories women use most
            </h2>
            <p className="mb-6 leading-relaxed text-ink">
              Adult categories follow WHO cut-offs. They are population guides, not a personal
              diagnosis. For healthy-range detail see{" "}
              <Link href="/healthy-bmi" className="font-medium text-brand underline hover:no-underline">
                healthy BMI for women
              </Link>
              , and for age notes see{" "}
              <Link href="/bmi-by-age" className="font-medium text-brand underline hover:no-underline">
                BMI by age
              </Link>
              .
            </p>
            <div className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl border border-brand/15 bg-mist">
              <Image
                src={BRAND_CHART}
                alt="BMI chart for women showing underweight through obesity class bands"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          </section>

          <section id="related-guides" className="mb-14">
            <h2 className="mb-4 font-display text-2xl font-bold text-brand md:text-3xl">
              Related BMI guides people search for
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {[
                {
                  href: "/bmi-chart-women",
                  title: "BMI chart women",
                  body: "Height–weight table and category bands built for female searchers.",
                },
                {
                  href: "/blog/how-to-calculate-bmi",
                  title: "How to calculate BMI",
                  body: "Step-by-step math with metric and imperial examples.",
                },
                {
                  href: "/blog/what-is-bmi",
                  title: "What is BMI?",
                  body: "Plain-language BMI meaning, uses, and limits for women.",
                },
                {
                  href: "/blog/height-and-weight-chart-for-women",
                  title: "Height and weight chart",
                  body: "Healthy weight ranges by height — “how much should I weigh?”",
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-2xl border border-pink/20 bg-white/90 p-4 transition hover:border-pink/60 hover:shadow-[0_12px_30px_-20px_rgba(255,122,154,0.7)]"
                  >
                    <h3 className="font-display text-lg font-bold text-brand">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink/80">{item.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="assumptions" className="mb-14">
            <h2 className="mb-4 font-display text-2xl font-bold text-brand md:text-3xl">
              Assumptions and limitations
            </h2>
            <p className="leading-relaxed text-ink">
              BMI does not measure body fat directly. High muscle mass, pregnancy, edema, certain
              ethnic BMI thresholds, and under-18 growth charts can change what a “good” number means.
              This site is educational — not a substitute for clinical advice. Pair BMI with waist
              circumference and professional guidance when health decisions matter.
            </p>
          </section>

          <FaqSection items={faqs} />

          <section className="mt-16 rounded-2xl border border-pink/25 bg-gradient-to-br from-blush via-white to-lilac/20 p-8 text-center">
            <h2 className="mb-3 font-display text-2xl font-bold text-brand">
              Ready to check your BMI?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-ink/85">
              Jump back to the BMI calculator for women, adjust height or weight, and read your
              category on the scale.
            </p>
            <CtaButton href="/#calculator" ariaLabel="Jump to BMI calculator for women">
              BACK TO CALCULATOR
            </CtaButton>
          </section>
        </article>
      </div>
    </>
  );
}
