import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BodyFatCalculator from "@/components/BodyFatCalculator";
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
    default: "Body Fat Calculator — Free Body Fat Percentage Tool",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free body fat calculator using the U.S. Navy method. Estimate body fat percentage for men and women with metric or imperial units, plus a BMI comparison.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Body Fat Calculator — Free Body Fat Percentage Tool",
    description:
      "Estimate body fat percentage with the U.S. Navy circumference method and BMI formula. Instant results, no signup.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Body Fat Calculator homepage tool preview",
      },
    ],
  },
};

const faqs = [
  {
    question: "How does this body fat calculator work?",
    answer:
      "Enter sex, age, weight, height, neck, waist, and (for women) hip. The tool applies the U.S. Navy circumference formulas and also shows a BMI-based body fat estimate for comparison.",
  },
  {
    question: "Is the U.S. Navy method accurate?",
    answer:
      "The Navy method is a practical tape-measure estimate widely used for screening. It is less precise than DEXA or hydrostatic weighing, but it is useful for tracking trends at home when you measure consistently.",
  },
  {
    question: "What is a healthy body fat percentage?",
    answer:
      "Healthy ranges differ by sex and age. Broad ACE-style categories place many adult men around 18–24% as average and many adult women around 25–31% as average. See our men and women chart pages for category bands.",
  },
  {
    question: "Should I use metric or imperial units?",
    answer:
      "Either works. Switch units at the top of the calculator — helpful if you are in the United States (inches/pounds) or prefer centimeters and kilograms.",
  },
  {
    question: "Why do Navy and BMI estimates differ?",
    answer:
      "The Navy method uses circumference measurements that better reflect fat distribution. BMI body-fat formulas use only height, weight, age, and sex, so muscular or apple-shaped bodies can diverge between the two.",
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
          "Free body fat percentage calculator with U.S. Navy method and BMI estimate.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: "Body Fat Calculator — Free Body Fat Percentage Tool",
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
        name: "How to estimate body fat percentage",
        description:
          "Estimate body fat percentage with tape measurements using the U.S. Navy method.",
        step: [
          {
            "@type": "HowToStep",
            name: "Choose units and sex",
            text: "Select imperial or metric units and male or female formulas.",
          },
          {
            "@type": "HowToStep",
            name: "Enter body stats",
            text: "Add age, weight, and height.",
          },
          {
            "@type": "HowToStep",
            name: "Add tape measurements",
            text: "Measure neck and waist; women also enter hip circumference.",
          },
          {
            "@type": "HowToStep",
            name: "Review results",
            text: "Read body fat percentage, category, fat mass, lean mass, and BMI comparison.",
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
          <div className="mb-4 max-w-3xl sm:mb-5">
            <h1 className="font-display text-[1.65rem] font-bold leading-tight text-black sm:text-4xl md:text-5xl">
              Know your body fat percentage in minutes
            </h1>
            <p className="mt-2 text-sm leading-snug text-black sm:mt-3 sm:text-base md:text-lg">
              Free body fat percentage calculator for men and women. Uses the U.S. Navy method with a
              BMI estimate so you can track composition — not just scale weight.
            </p>
            <p className="mt-1.5 hidden text-sm font-medium text-amber-600 sm:flex sm:flex-wrap sm:items-center sm:gap-1.5">
              <span>{SITE_RATING.ratingValue}</span>
              <span className="tracking-tight text-amber-500" aria-hidden="true">
                ★★★★☆
              </span>
              <span className="text-amber-700">
                ({Number(SITE_RATING.ratingCount).toLocaleString()}) · Free · Web · Health
              </span>
            </p>
          </div>

          <BodyFatCalculator />
        </section>

        <article className="max-w-4xl">
          <section id="what-is-body-fat-calculator" className="mb-14">
            <h2 className="mb-4 font-display text-2xl font-bold text-black md:text-3xl">
              What a body fat calculator shows you
            </h2>
            <p className="mb-4 leading-relaxed text-black">
              A body fat calculator estimates the share of your weight that is fat mass versus lean
              tissue. Scale weight alone cannot tell you whether a change came from muscle, water, or
              fat — body fat percentage fills that gap for training and health tracking.
            </p>
            <p className="mb-4 leading-relaxed text-black">
              This tool focuses on the U.S. Navy circumference method because it needs only a tape
              measure, works with imperial or metric units, and is the formula people search for when
              they want a practical at-home estimate.
            </p>
            <p className="mb-6 leading-relaxed text-black">
              Prefer a Navy-only deep dive? Open the{" "}
              <Link href="/us-navy-body-fat-calculator" className="text-black hover:underline">
                US Navy body fat calculator guide
              </Link>
              .
            </p>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-black/15 bg-white">
              <Image
                src={BRAND_HERO}
                alt="Body fat calculator hero showing fitness composition tracking"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </section>

          <section id="how-to-use" className="mb-14">
            <h2 className="mb-12 font-display text-2xl font-bold text-black md:mb-16 md:text-3xl">
              How to use this body fat percentage calculator
            </h2>
            <ol className="relative">
              {(
                [
                  {
                    step: "01",
                    title: "Pick units and sex",
                    body: "Imperial for inches and pounds, metric for centimeters and kilograms. Sex selects the correct Navy formula.",
                  },
                  {
                    step: "02",
                    title: "Enter age, weight, and height",
                    body: "Age informs the ideal target comparison. Height and weight also drive the BMI body-fat estimate.",
                  },
                  {
                    step: "03",
                    title: "Measure neck, waist, and hip",
                    body: "Men need neck and waist. Women also enter hip. Measure to the nearest 0.25 in (0.5 cm) for better consistency.",
                  },
                  {
                    step: "04",
                    title: "Read percentage and category",
                    body: "See Navy body fat %, category, fat mass, lean mass, ideal target, and the BMI method comparison.",
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
                        className="absolute bottom-[-3rem] left-1/2 top-10 w-px -translate-x-1/2 bg-black/20 md:bottom-[-4rem] md:top-11"
                      />
                    ) : null}
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black bg-white font-display text-sm font-bold text-black md:h-11 md:w-11">
                      {item.step}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 md:pt-2">
                    <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-black md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-black md:text-[15px]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="categories" className="mb-14">
            <h2 className="mb-4 font-display text-2xl font-bold text-black md:text-3xl">
              Body fat percentage categories
            </h2>
            <p className="mb-6 leading-relaxed text-black">
              Categories help you interpret a number. They are population guides, not personal medical
              advice. Explore dedicated charts for{" "}
              <Link href="/body-fat-percentage-men" className="text-black hover:underline">
                men
              </Link>{" "}
              and{" "}
              <Link href="/body-fat-percentage-women" className="text-black hover:underline">
                women
              </Link>
              .
            </p>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-black/15 bg-white">
              <Image
                src={BRAND_CHART}
                alt="Body fat percentage category chart from essential fat to obese"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          </section>

          <section id="related-tools" className="mb-14">
            <h2 className="mb-4 font-display text-2xl font-bold text-black md:text-3xl">
              Related calculators and guides
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {[
                {
                  href: "/us-navy-body-fat-calculator",
                  title: "US Navy body fat calculator",
                  body: "Formulas, measurement tips, and Navy-focused FAQ.",
                },
                {
                  href: "/visceral-fat-calculator",
                  title: "Visceral fat calculator",
                  body: "Waist and waist-to-height risk screening for abdominal fat.",
                },
                {
                  href: "/blog/how-to-measure-body-fat",
                  title: "How to measure body fat",
                  body: "Tape, calipers, BIA, and lab methods compared.",
                },
                {
                  href: "/blog/how-to-calculate-body-fat-percentage",
                  title: "How to calculate body fat percentage",
                  body: "Step-by-step math behind the Navy equations.",
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-2xl border border-black/15 bg-white p-4 transition hover:border-black/40"
                  >
                    <h3 className="font-display text-lg font-bold text-black">{item.title}</h3>
                    <p className="mt-2 text-sm text-black">{item.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="assumptions" className="mb-14">
            <h2 className="mb-4 font-display text-2xl font-bold text-black md:text-3xl">
              Assumptions and limitations
            </h2>
            <p className="leading-relaxed text-black">
              Results assume careful tape placement and adult body proportions. Pregnancy, edema,
              extreme muscle mass, and measurement error can skew estimates. This site is educational —
              not a substitute for clinical body-composition testing.
            </p>
          </section>

          <FaqSection items={faqs} />

          <section className="mt-16 rounded-2xl border border-black/15 bg-white p-8 text-center">
            <h2 className="mb-3 font-display text-2xl font-bold text-black">
              Ready to check your body fat percentage?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-black">
              Jump back to the calculator, adjust measurements, and compare Navy and BMI estimates.
            </p>
            <CtaButton href="/#calculator" ariaLabel="Jump to body fat calculator">
              BACK TO CALCULATOR
            </CtaButton>
          </section>
        </article>
      </div>
    </>
  );
}
