import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BodyFatCalculator from "@/components/BodyFatCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_HERO, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "US Navy Body Fat Calculator — Circumference Method",
  description:
    "US Navy body fat calculator with male and female formulas, measurement tips, and instant percentage results. Metric and imperial supported.",
  alternates: { canonical: `${SITE_ORIGIN}/us-navy-body-fat-calculator` },
  openGraph: {
    title: "US Navy Body Fat Calculator — Circumference Method",
    description: "Estimate body fat percentage with official U.S. Navy tape-measure formulas.",
    url: `${SITE_ORIGIN}/us-navy-body-fat-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "US Navy body fat calculator" }],
  },
};

const faqs = [
  {
    question: "What is the Navy body fat calculator?",
    answer:
      "It estimates body fat percentage from height and circumference measurements using formulas published for U.S. Navy physical readiness screening.",
  },
  {
    question: "Do women need a hip measurement?",
    answer:
      "Yes. The female Navy equation uses waist + hip − neck, while the male equation uses waist − neck.",
  },
  {
    question: "Is this the same as a Navy BMI calculator?",
    answer:
      "No. BMI uses only height and weight. The Navy body fat method uses tape measurements and better reflects fat distribution for many people.",
  },
];

export default function NavyPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "US Navy Body Fat Calculator",
        item: `${SITE_ORIGIN}/us-navy-body-fat-calculator`,
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
        items={[
          { label: "Home", href: "/" },
          { label: "US Navy Body Fat Calculator" },
        ]}
      />

      <h1 className="mb-3 font-display text-3xl font-bold text-black md:text-4xl">
        US Navy Body Fat Calculator
      </h1>
      <p className="mb-8 max-w-3xl text-lg text-black">
        Calculate body fat percentage with the U.S. Navy circumference method — the same approach
        used for practical readiness screening when lab tools are not available.
      </p>

      <BodyFatCalculator heading="Navy body fat calculator" />

      <article className="mt-14 max-w-4xl">
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-black">
            Navy body fat formulas
          </h2>
          <p className="mb-4 leading-relaxed text-black">
            For men (inches): %BF = 86.010 × log<sub>10</sub>(waist − neck) − 70.041 × log<sub>10</sub>
            (height) + 36.76. For women (inches): %BF = 163.205 × log<sub>10</sub>(waist + hip − neck) −
            97.684 × log<sub>10</sub>(height) − 78.387. Metric users can enter centimeters — the
            calculator converts before applying the inch-based equations.
          </p>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-black/15 bg-white">
            <Image
              src={BRAND_HERO}
              alt="Illustration for US Navy body fat calculator measurements"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-black">
            How to measure for the Navy method
          </h2>
          <ul className="space-y-3 text-black">
            <li className="rounded-2xl border border-black/15 bg-white p-4">
              Neck: measure just below the larynx, relaxed, looking forward.
            </li>
            <li className="rounded-2xl border border-black/15 bg-white p-4">
              Waist (men): measure at the navel. Waist (women): measure at the narrowest point.
            </li>
            <li className="rounded-2xl border border-black/15 bg-white p-4">
              Hip (women): measure at the widest point of the hips/buttocks.
            </li>
          </ul>
          <p className="mt-4 text-black">
            For a broader comparison of methods, read{" "}
            <Link href="/blog/how-to-measure-body-fat" className="text-black hover:underline">
              how to measure body fat
            </Link>
            .
          </p>
        </section>

        <FaqSection items={faqs} />

        <section className="mt-12 rounded-2xl border border-black/15 bg-white p-8 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Prefer the full body fat calculator?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-black">
            The homepage tool shows Navy results plus a BMI comparison and category scale.
          </p>
          <CtaButton href="/#calculator" ariaLabel="Open main body fat calculator">
            OPEN MAIN CALCULATOR
          </CtaButton>
        </section>
      </article>
    </div>
  );
}
