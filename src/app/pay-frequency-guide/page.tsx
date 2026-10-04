import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { BRAND_PAY_FREQUENCY, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Florida Pay Frequency Guide — Weekly to Monthly",
  description:
    "Compare weekly, biweekly, semi-monthly, and monthly Florida paychecks. See how pay frequency changes each deposit without changing annual pay.",
  alternates: { canonical: `${SITE_ORIGIN}/pay-frequency-guide` },
  openGraph: {
    title: "Florida Pay Frequency Guide — Weekly to Monthly",
    description: "Biweekly vs semi-monthly Florida paycheck amounts explained with examples.",
    url: `${SITE_ORIGIN}/pay-frequency-guide`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Florida pay frequency comparison" }],
  },
};

const rows = [
  { label: "Weekly", checks: 52, example: "$1,384.62" },
  { label: "Biweekly", checks: 26, example: "$2,769.23" },
  { label: "Semi-monthly", checks: 24, example: "$3,000.00" },
  { label: "Monthly", checks: 12, example: "$6,000.00" },
];

export default function PayFrequencyGuidePage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pay Frequency Guide",
        item: `${SITE_ORIGIN}/pay-frequency-guide`,
      },
    ],
  };

  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pay Frequency Guide" }]} />

      <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
        Florida pay frequency guide
      </h1>
      <p className="text-gray-300 leading-relaxed mb-8">
        Pay frequency decides how many times a year your Florida employer deposits wages. It changes
        the size of each check, not your annual salary. That difference is one of the most common
        surprises when people use a paycheck calculator.
      </p>

      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-secondary">
        <Image
          src={BRAND_PAY_FREQUENCY}
          alt="Chart comparing weekly, biweekly, semi-monthly, and monthly Florida pay frequencies"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">
        Gross pay example on a $72,000 salary
      </h2>
      <div className="mb-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm text-gray-200">
          <thead className="bg-white/5 text-left text-zinc-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Frequency</th>
              <th className="px-4 py-3 font-semibold">Checks / year</th>
              <th className="px-4 py-3 font-semibold">Gross / check</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-white/10">
                <td className="px-4 py-3 font-medium text-white">{row.label}</td>
                <td className="px-4 py-3">{row.checks}</td>
                <td className="px-4 py-3 text-accent">{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">
        Biweekly vs semi-monthly
      </h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Biweekly means every other week (26 checks). Semi-monthly means twice a month, often the 15th
        and last day (24 checks). Semi-monthly gross is larger per deposit; biweekly adds two “extra”
        checks in most calendar years that help with irregular expenses.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Taxes and FICA are still based on annual wages. Switching frequency alone should not
        dramatically change yearly tax liability, but cash-flow planning for rent and bills will feel
        different.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">
        Why Florida workers search this?
      </h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        Job offers in Florida often quote annual salary without naming the pay schedule. A{" "}
        <Link href="/" className="text-accent hover:underline">
          Florida paycheck calculator
        </Link>{" "}
        lets you toggle weekly through monthly so the offer matches the deposit you will actually see.
      </p>

      <div className="rounded-2xl border border-accent/30 bg-secondary p-6 text-center">
        <CtaButton href="/#calculator" ariaLabel="Compare pay frequencies in the calculator">
          COMPARE IN CALCULATOR
        </CtaButton>
      </div>
    </article>
  );
}
