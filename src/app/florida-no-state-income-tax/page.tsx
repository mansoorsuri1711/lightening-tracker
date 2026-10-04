import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_NO_STATE_TAX, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Does Florida Have State Income Tax? — Paycheck Impact",
  description:
    "Florida has no personal state income tax. See how that affects paycheck withholding, FICA, and take-home pay for Florida workers.",
  alternates: { canonical: `${SITE_ORIGIN}/florida-no-state-income-tax` },
  openGraph: {
    title: "Does Florida Have State Income Tax? — Paycheck Impact",
    description: "Why Florida paychecks show $0 state income tax and what you still pay.",
    url: `${SITE_ORIGIN}/florida-no-state-income-tax`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Florida no state income tax" }],
  },
};

const faqs = [
  {
    question: "Does Florida have state income tax in 2026?",
    answer:
      "No. Florida does not impose a personal income tax on wages. Paychecks for Florida-sourced wages generally show $0 state income tax withholding.",
  },
  {
    question: "Do Florida workers still pay federal taxes?",
    answer:
      "Yes. Federal income tax and FICA (Social Security and Medicare) still apply. Living in Florida does not remove those federal payroll taxes.",
  },
  {
    question: "What if I live in Florida but work in another state?",
    answer:
      "Work location can create withholding obligations in the work state. Confirm with your employer and a tax professional if you commute across state lines or work remotely for an out-of-state company.",
  },
];

export default function FloridaNoStateTaxPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "No State Income Tax",
        item: `${SITE_ORIGIN}/florida-no-state-income-tax`,
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
        items={[{ label: "Home", href: "/" }, { label: "No State Income Tax" }]}
      />

      <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
        Does Florida have state income tax?
      </h1>
      <p className="text-gray-300 leading-relaxed mb-8">
        Florida is one of the U.S. states with no personal state income tax. For paycheck planning,
        that means your estimated state income tax withholding is $0 — a major reason people search
        for a Florida-specific paycheck calculator.
      </p>

      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-secondary">
        <Image
          src={BRAND_NO_STATE_TAX}
          alt="Florida map callout showing no personal state income tax on wages"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">
        What disappears from the paycheck?
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        In states with income tax, employers withhold a state amount every pay period. In Florida that
        line is typically blank or zero for personal wage income. Your take-home percentage can look
        higher than an identical salary in a high-tax state — before cost of living differences.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">
        What still comes out of a Florida paycheck?
      </h2>
      <ul className="mb-6 list-disc space-y-2 pl-5 text-gray-300">
        <li>Federal income tax based on your W-4 and taxable wages</li>
        <li>Social Security tax (employee share 6.2% up to the annual wage base)</li>
        <li>Medicare tax (1.45%, plus Additional Medicare Tax at higher incomes)</li>
        <li>Benefit deductions such as health premiums or retirement contributions</li>
      </ul>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">
        How to estimate the difference?
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Run the same salary through our{" "}
        <Link href="/" className="text-accent hover:underline">
          Florida paycheck calculator
        </Link>{" "}
        and note the $0 Florida tax line. Then compare that net figure with a paycheck estimate from
        your previous state if you are relocating. Pair the math with housing, insurance, and commute
        costs before deciding a move is “cheaper.”
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">
        Other Florida taxes still exist
      </h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        No state income tax does not mean a tax-free state. Florida still has sales tax, property tax,
        and other business or tourism-related taxes. Those usually do not appear as paycheck
        withholdings for W-2 employees.
      </p>

      <FaqSection items={faqs} />

      <div className="mt-10 rounded-2xl border border-accent/30 bg-secondary p-6 text-center">
        <CtaButton href="/#calculator" ariaLabel="Estimate Florida take-home pay">
          ESTIMATE TAKE-HOME PAY
        </CtaButton>
      </div>
    </article>
  );
}
