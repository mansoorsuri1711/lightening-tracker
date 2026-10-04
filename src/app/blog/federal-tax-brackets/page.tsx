import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import { BRAND_BRACKETS, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "2026 Federal Tax Brackets for Paycheck Planning";
const description =
  "2026 federal income tax brackets and standard deductions for single, married, and head of household filers — geared to Florida paycheck estimates.";
const slug = "federal-tax-brackets";
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

const singleBrackets = [
  ["10%", "$0 – $12,400"],
  ["12%", "$12,401 – $50,400"],
  ["22%", "$50,401 – $105,700"],
  ["24%", "$105,701 – $201,775"],
  ["32%", "$201,776 – $256,225"],
  ["35%", "$256,226 – $640,600"],
  ["37%", "Over $640,600"],
];

export default function FederalTaxBracketsPage() {
  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl">
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished={datePublished}
        image={`${SITE_ORIGIN}${BRAND_BRACKETS}`}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "2026 Federal Tax Brackets" },
        ]}
      />

      <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-sm text-gray-500 mb-8">Updated {datePublished} · 8 min read</p>

      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-secondary">
        <Image
          src={BRAND_BRACKETS}
          alt="2026 federal income tax brackets chart for paycheck withholding estimates"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <p className="text-gray-300 leading-relaxed mb-6">
        Federal brackets matter for every Florida paycheck because the state does not replace them.
        Your marginal rate is the rate on the next dollar of taxable income — not the rate applied to
        every dollar you earn.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">
        2026 brackets for single filers
      </h2>
      <div className="mb-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm text-gray-200">
          <thead className="bg-white/5 text-left text-zinc-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Rate</th>
              <th className="px-4 py-3 font-semibold">Taxable income</th>
            </tr>
          </thead>
          <tbody>
            {singleBrackets.map(([rate, range]) => (
              <tr key={rate} className="border-t border-white/10">
                <td className="px-4 py-3 font-medium text-accent">{rate}</td>
                <td className="px-4 py-3">{range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">2026 standard deduction</h2>
      <ul className="mb-6 list-disc space-y-2 pl-5 text-gray-300">
        <li>Single: $16,100</li>
        <li>Married filing jointly: $32,200</li>
        <li>Head of household: $24,150</li>
      </ul>
      <p className="text-gray-300 leading-relaxed mb-6">
        Paycheck estimators often subtract a standard deduction when projecting annual tax, then
        divide by pay periods. That is a planning shortcut — employers still use IRS withholding
        methods tied to your W-4.
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">
        How this connects to a Florida paycheck?
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        After federal tax and{" "}
        <Link href="/blog/fica-taxes-explained" className="text-accent hover:underline">
          FICA
        </Link>
        , Florida adds $0 state income tax. That combination is what our{" "}
        <Link href="/" className="text-accent hover:underline">
          Florida paycheck calculator
        </Link>{" "}
        models. For the manual checklist, see{" "}
        <Link
          href="/blog/how-to-calculate-florida-take-home-pay"
          className="text-accent hover:underline"
        >
          how to calculate Florida take-home pay
        </Link>
        .
      </p>

      <h2 className="font-display text-2xl font-bold text-accent mb-3">Keep sources in mind</h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        Bracket thresholds are inflation-adjusted. Confirm final IRS publications before filing. This
        article is educational and not tax advice.
      </p>

      <div className="rounded-2xl border border-accent/30 bg-secondary p-6 text-center">
        <CtaButton href="/#calculator" ariaLabel="Apply 2026 brackets in the calculator">
          USE IN CALCULATOR
        </CtaButton>
      </div>
    </article>
  );
}
