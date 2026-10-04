import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import { BRAND_HOW_TO, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "How to Calculate Florida Take-Home Pay";
const description =
  "Step-by-step method to estimate Florida take-home pay: gross wages, pre-tax deductions, federal tax, FICA, and $0 state income tax.";
const slug = "how-to-calculate-florida-take-home-pay";
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

export default function HowToCalculateTakeHomePage() {
  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl">
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished={datePublished}
        image={`${SITE_ORIGIN}${BRAND_HOW_TO}`}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Calculate Take-Home Pay" },
        ]}
      />

      <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-sm text-gray-500 mb-8">Updated {datePublished} · 9 min read</p>

      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-secondary">
        <Image
          src={BRAND_HOW_TO}
          alt="Step guide for calculating Florida take-home pay after taxes"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <p className="text-gray-300 leading-relaxed mb-6">
        Searching “how to calculate take-home pay Florida” usually means you want the deposit that
        lands in your bank — not the salary on an offer letter. Florida simplifies one piece: there is
        no personal state income tax. Everything else still follows federal payroll rules.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">1. Start with gross pay</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        For salaried roles, divide annual salary by the number of paychecks (52, 26, 24, or 12). For
        hourly roles, multiply hourly rate by hours in the pay period. Overtime should be included when
        you want a realistic estimate.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">2. Subtract pre-tax deductions</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Traditional 401(k), many medical premiums, and HSA contributions often reduce taxable wages.
        Subtract those amounts from gross before estimating federal income tax. Confirm with your
        benefits summary which items are pre-tax versus post-tax.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">3. Estimate federal income tax</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Annualize taxable wages, apply the standard deduction for your filing status, then use the
        progressive federal brackets. Divide the annual tax estimate by pay periods and add any extra
        withholding from your W-4. Our guide to{" "}
        <Link href="/blog/federal-tax-brackets" className="text-accent hover:underline">
          2026 federal tax brackets
        </Link>{" "}
        lists the current tiers.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">4. Calculate FICA</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Apply 6.2% Social Security up to the annual wage base and 1.45% Medicare on covered wages. High
        earners may also owe Additional Medicare Tax. Details live in{" "}
        <Link href="/blog/fica-taxes-explained" className="text-accent hover:underline">
          FICA taxes explained
        </Link>
        .
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">5. Set Florida state tax to $0</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        For Florida personal wage income, state income tax withholding is generally zero. That is the
        Florida-specific step people miss when they reuse a calculator built for another state. Read{" "}
        <Link href="/florida-no-state-income-tax" className="text-accent hover:underline">
          does Florida have state income tax?
        </Link>
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">6. Subtract post-tax items</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Roth retirement contributions, union dues, or garnishments come out after taxes. Subtract them
        from the after-tax amount to get final take-home pay.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">Faster path: use the calculator</h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        Manual math helps you understand the pieces. For everyday planning, the{" "}
        <Link href="/" className="text-accent hover:underline">
          Florida paycheck calculator
        </Link>{" "}
        runs the same flow with salary or hourly inputs and shows each tax line clearly.
      </p>

      <div className="rounded-2xl border border-accent/30 bg-secondary p-6 text-center">
        <CtaButton href="/#calculator" ariaLabel="Open Florida paycheck calculator">
          OPEN CALCULATOR
        </CtaButton>
      </div>
    </article>
  );
}
