import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import { BRAND_FICA, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";
import { SS_RATE, SS_WAGE_BASE_2026, MEDICARE_RATE } from "@/lib/paycheckMath";

const title = "FICA Taxes Explained for Florida Paychecks";
const description =
  "What FICA means on a Florida paycheck in 2026: Social Security 6.2%, Medicare 1.45%, wage base limits, and how they affect take-home pay.";
const slug = "fica-taxes-explained";
const datePublished = "2026-10-04";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${slug}` },
  openGraph: {
    title,
    description,
    url: `${SITE_ORIGIN}/blog/${slug}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
  },
};

export default function FicaTaxesPage() {
  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl">
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished={datePublished}
        image={`${SITE_ORIGIN}${BRAND_FICA}`}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "FICA Taxes Explained" },
        ]}
      />

      <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-sm text-gray-500 mb-8">Updated {datePublished} · 8 min read</p>

      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-secondary">
        <Image
          src={BRAND_FICA}
          alt="Infographic explaining Social Security and Medicare FICA taxes on a paycheck"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <p className="text-gray-300 leading-relaxed mb-6">
        FICA stands for the Federal Insurance Contributions Act. On a Florida paycheck it usually
        appears as separate Social Security and Medicare withholdings. Florida&apos;s lack of state
        income tax does not change FICA — these are federal payroll taxes.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">2026 employee FICA rates</h2>
      <ul className="mb-6 list-disc space-y-2 pl-5 text-gray-300">
        <li>
          Social Security (OASDI): {(SS_RATE * 100).toFixed(1)}% of wages up to $
          {SS_WAGE_BASE_2026.toLocaleString("en-US")}
        </li>
        <li>Medicare (HI): {(MEDICARE_RATE * 100).toFixed(2)}% of all covered wages</li>
        <li>
          Additional Medicare Tax: 0.9% on wages above $200,000 for most single filers ($250,000 for
          married filing jointly)
        </li>
      </ul>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">Why the Social Security wage base matters?</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Once your year-to-date Social Security wages hit the annual base, OASDI withholding stops for
        the rest of the year. Medicare continues. High earners in Florida often notice a jump in
        take-home pay late in the year when Social Security withholding pauses.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">FICA vs federal income tax</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Federal income tax is progressive and depends on filing status, deductions, and credits. FICA
        rates are flat (with the Social Security cap). Both reduce take-home pay, but they fund
        different programs and follow different rules. See{" "}
        <Link href="/how-florida-paychecks-work" className="text-accent hover:underline">
          how Florida paychecks work
        </Link>{" "}
        for the full stack of withholdings.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">Quick example</h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        On $2,769 of biweekly gross wages (about $72,000 a year) with no pre-tax deductions, Social
        Security is roughly $171.69 and Medicare about $40.15 before any Additional Medicare Tax. Run
        your own numbers in the{" "}
        <Link href="/" className="text-accent hover:underline">
          Florida paycheck calculator
        </Link>
        .
      </p>

      <div className="rounded-2xl border border-accent/30 bg-secondary p-6 text-center">
        <CtaButton href="/#calculator" ariaLabel="Estimate FICA on your Florida paycheck">
          ESTIMATE FICA
        </CtaButton>
      </div>
    </article>
  );
}
