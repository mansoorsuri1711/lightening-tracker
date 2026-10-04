import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import {
  BRAND_BREAKDOWN,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";

export const metadata: Metadata = {
  title: "How Florida Paychecks Work — Gross to Net",
  description:
    "Learn how a Florida paycheck moves from gross wages to take-home pay: federal tax, FICA, deductions, and $0 state income tax.",
  alternates: { canonical: `${SITE_ORIGIN}/how-florida-paychecks-work` },
  openGraph: {
    title: "How Florida Paychecks Work — Gross to Net",
    description: "A clear walkthrough of Florida paycheck withholding for employees.",
    url: `${SITE_ORIGIN}/how-florida-paychecks-work`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "How Florida paychecks work" }],
  },
};

export default function HowFloridaPaychecksWorkPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "How Florida Paychecks Work",
        item: `${SITE_ORIGIN}/how-florida-paychecks-work`,
      },
    ],
  };

  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "How Florida Paychecks Work" }]}
      />

      <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
        How Florida paychecks work
      </h1>
      <p className="text-gray-300 leading-relaxed mb-8">
        Your Florida paycheck starts with gross wages and ends with the deposit that hits your bank.
        Between those numbers sit federal income tax, FICA, and any benefits you elect. Florida does
        not add a personal state income tax line.
      </p>

      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-secondary">
        <Image
          src={BRAND_BREAKDOWN}
          alt="Diagram of Florida paycheck components from gross pay to net pay"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">Gross pay</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Gross pay is salary for the period or hours worked times your hourly rate (plus overtime when
        applicable). Payroll systems annualize that amount to apply tax rules, then convert back to a
        per-check figure.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">Pre-tax deductions</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Traditional 401(k) contributions, many health insurance premiums, HSAs, and similar elections
        usually come out before federal income tax. Some also reduce FICA wages depending on the plan
        type. Lower taxable wages can raise take-home pay even when gross pay stays the same.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">Federal income tax</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Employers withhold federal income tax using your Form W-4 and IRS methods. Filing status,
        dependents, multiple jobs, and extra withholding all change the result. Our{" "}
        <Link href="/" className="text-accent hover:underline">
          Florida paycheck calculator
        </Link>{" "}
        approximates that outcome with 2026 brackets and the standard deduction so you can plan before
        payday.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">FICA: Social Security and Medicare</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        FICA funds Social Security and Medicare. Employees generally pay 6.2% Social Security up to the
        annual wage base and 1.45% Medicare with no wage cap (plus Additional Medicare Tax at higher
        incomes). See{" "}
        <Link href="/blog/fica-taxes-explained" className="text-accent hover:underline">
          FICA taxes explained
        </Link>{" "}
        for rates and examples.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">Florida state income tax</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Florida does not withhold personal state income tax. That is the main Florida-specific
        difference versus calculators for high-tax states. Learn more on{" "}
        <Link href="/florida-no-state-income-tax" className="text-accent hover:underline">
          Florida&apos;s no state income tax page
        </Link>
        .
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">Net pay</h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        Net pay (take-home) is gross minus taxes and deductions. Post-tax items such as Roth 401(k)
        contributions or garnishments reduce the deposit after taxes are calculated.
      </p>

      <div className="rounded-2xl border border-accent/30 bg-secondary p-6 text-center">
        <p className="text-gray-300 mb-4">Model your own Florida paycheck in seconds.</p>
        <CtaButton href="/#calculator" ariaLabel="Open Florida paycheck calculator">
          OPEN CALCULATOR
        </CtaButton>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How Florida Paychecks Work — Gross to Net",
            description:
              "Learn how a Florida paycheck moves from gross wages to take-home pay.",
            image: {
              "@type": "ImageObject",
              url: `${SITE_ORIGIN}${BRAND_BREAKDOWN}`,
              ...imageObjectLicensing,
            },
            author: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
            publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
            datePublished: "2026-10-04",
            dateModified: "2026-10-04",
            mainEntityOfPage: `${SITE_ORIGIN}/how-florida-paychecks-work`,
          }),
        }}
      />
    </article>
  );
}
