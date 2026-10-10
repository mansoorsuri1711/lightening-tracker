import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import VisceralFatCalculator from "@/components/VisceralFatCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_HERO_MOBILE, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Visceral Fat Calculator — Waist Risk Estimator",
  description:
    "Free visceral fat calculator using waist circumference and waist-to-height ratio. Estimate abdominal fat risk for men and women.",
  alternates: { canonical: `${SITE_ORIGIN}/visceral-fat-calculator` },
  openGraph: {
    title: "Visceral Fat Calculator — Waist Risk Estimator",
    description: "Screen visceral fat risk from waist and height in seconds.",
    url: `${SITE_ORIGIN}/visceral-fat-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Visceral fat calculator" }],
  },
};

const faqs = [
  {
    question: "What is visceral fat?",
    answer:
      "Visceral fat sits deeper around abdominal organs. Higher amounts are linked with metabolic risk more strongly than fat stored under the skin alone.",
  },
  {
    question: "Can a tape measure estimate visceral fat?",
    answer:
      "Waist circumference and waist-to-height ratio are practical screening tools. They do not replace MRI or CT, but they are useful for home tracking and risk awareness.",
  },
];

export default function VisceralPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Visceral Fat Calculator",
        item: `${SITE_ORIGIN}/visceral-fat-calculator`,
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-5xl px-3 py-8 sm:px-4 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visceral Fat Calculator" }]} />

      <h1 className="mb-3 font-display text-3xl font-bold text-black md:text-4xl">
        Visceral Fat Calculator
      </h1>
      <p className="mb-8 max-w-3xl text-lg text-black">
        Estimate abdominal fat risk from waist size and waist-to-height ratio — a fast complement to
        your overall{" "}
        <Link href="/" className="text-black hover:underline">
          body fat percentage
        </Link>
        .
      </p>

      <VisceralFatCalculator />

      <article className="mt-14 max-w-4xl">
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-black">
            How this visceral fat calculator works
          </h2>
          <p className="mb-4 leading-relaxed text-black">
            We convert your waist and height to centimeters, compute waist-to-height ratio (WHtR), and
            map results to common risk bands (for example, WHtR around 0.5+ as elevated). Sex-specific
            waist cutoffs (about 94/102 cm for men and 80/88 cm for women) refine the risk label.
          </p>
          <div className="relative mx-auto aspect-[1080/1350] w-full max-w-md overflow-hidden rounded-2xl border border-black/15 bg-white">
            <Image
              src={BRAND_HERO_MOBILE}
              alt="Visceral fat calculator mobile visual focused on midsection health"
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-cover"
            />
          </div>
        </section>

        <FaqSection items={faqs} />

        <section className="mt-12 rounded-2xl border border-black/15 bg-white p-8 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Want total body fat percentage too?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-black">
            Use the Navy method calculator for overall body fat %, then return here for abdominal risk.
          </p>
          <CtaButton href="/#calculator" ariaLabel="Open body fat calculator">
            OPEN BODY FAT CALCULATOR
          </CtaButton>
        </section>
      </article>
    </div>
  );
}
