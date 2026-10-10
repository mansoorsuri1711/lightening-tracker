import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { BRAND_LOGO, CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About BMI Calculator Women",
  description:
    "Learn why BMI Calculator Women exists: a free female BMI tool, women’s chart, healthy ranges, and clear educational guides.",
  alternates: { canonical: `${SITE_ORIGIN}/about-us` },
  openGraph: {
    title: "About BMI Calculator Women",
    description: `Independent educational BMI tools for women on ${SITE_DOMAIN}.`,
    url: `${SITE_ORIGIN}/about-us`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <div className="mb-10 flex flex-col items-start gap-8 md:flex-row">
        <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border border-brand/15 bg-white">
          <Image
            src={BRAND_LOGO}
            alt="BMI Calculator Women logo"
            fill
            sizes="160px"
            className="object-contain p-3"
            priority
          />
        </div>
        <div>
          <h1 className="mb-4 font-display text-3xl font-bold text-brand md:text-4xl">
            About {SITE_NAME}
          </h1>
          <p className="mb-4 leading-relaxed text-ink">
            {SITE_NAME} is an independent educational site at {SITE_DOMAIN}. We built a free BMI
            calculator for women so anyone can check body mass index, WHO category, and healthy
            weight range — without creating an account.
          </p>
          <p className="leading-relaxed text-ink">
            Our guides cover women&apos;s BMI charts, healthy ranges, age notes, formulas, and
            height–weight tables. Everything is educational; confirm important health decisions with
            a clinician.
          </p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold text-brand">What we publish</h2>
        <ul className="space-y-3 text-ink">
          <li className="rounded-2xl border border-brand/15 bg-white p-4">
            A working BMI calculator for women with imperial and metric units
          </li>
          <li className="rounded-2xl border border-brand/15 bg-white p-4">
            BMI chart women, healthy BMI, and BMI-by-age hub pages
          </li>
          <li className="rounded-2xl border border-brand/15 bg-white p-4">
            SERP-driven articles on calculating BMI, meaning, formula, and height–weight charts
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold text-brand">Contact</h2>
        <p className="mb-4 leading-relaxed text-ink">
          Questions or corrections:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand underline hover:no-underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or our{" "}
          <Link href="/contact-us" className="text-brand underline hover:no-underline">
            contact page
          </Link>
          .
        </p>
        <CtaButton href="/#calculator">TRY THE CALCULATOR</CtaButton>
      </section>
    </div>
  );
}
