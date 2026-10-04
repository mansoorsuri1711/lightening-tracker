import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import PaycheckCalculator from "@/components/PaycheckCalculator";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import {
  BRAND_BREAKDOWN,
  BRAND_HERO,
  BRAND_HOW_TO,
  BRAND_LOGO,
  BRAND_NO_STATE_TAX,
  BRAND_PAY_FREQUENCY,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_RATING,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "Florida Paycheck Calculator — Free Take-Home Pay Estimator",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free Florida paycheck calculator for salary or hourly wages. Estimate take-home pay after federal tax and FICA with Florida’s $0 state income tax.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Florida Paycheck Calculator — Free Take-Home Pay Estimator",
    description:
      "Estimate Florida net pay per paycheck with federal tax, FICA, deductions, and $0 state income tax.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Florida Paycheck Calculator homepage tool preview",
      },
    ],
  },
};

const faqs = [
  {
    question: "Does Florida have state income tax on paychecks?",
    answer:
      "No. Florida does not levy a personal state income tax, so this calculator shows $0 Florida income tax withholding. You still pay federal income tax and FICA (Social Security and Medicare).",
  },
  {
    question: "How does this Florida paycheck calculator work?",
    answer:
      "Enter salary or hourly wages, pay frequency, filing status, and deductions. The tool annualizes your gross pay, estimates 2026 federal income tax with the standard deduction, applies SSA FICA rates, and divides everything back into a per-paycheck net amount.",
  },
  {
    question: "What is FICA on a Florida paycheck?",
    answer:
      "FICA is Social Security (6.2% employee share up to the annual wage base) plus Medicare (1.45%, with Additional Medicare Tax above high-income thresholds). Florida residency does not change FICA rates.",
  },
  {
    question: "Should I choose biweekly or semi-monthly?",
    answer:
      "Biweekly is 26 checks per year; semi-monthly is 24. The same annual salary produces different per-check amounts. Use our pay frequency guide if you are comparing offers that quote different schedules.",
  },
  {
    question: "Is this the same as my employer’s payroll system?",
    answer:
      "No. Employers use IRS Publication 15-T tables, exact W-4 entries, benefits elections, and local payroll rules. This site is an educational estimate so you can plan take-home pay before tax filing season.",
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
          "Free Florida paycheck calculator with federal tax, FICA, and $0 state income tax.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: "Florida Paycheck Calculator — Free Take-Home Pay Estimator",
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
        name: "How to estimate Florida take-home pay",
        description:
          "Estimate your Florida net paycheck after federal tax and FICA in a few steps.",
        step: [
          {
            "@type": "HowToStep",
            name: "Enter wages",
            text: "Add your annual salary or hourly rate and hours per week.",
          },
          {
            "@type": "HowToStep",
            name: "Choose pay frequency",
            text: "Select weekly, biweekly, semi-monthly, or monthly.",
          },
          {
            "@type": "HowToStep",
            name: "Set filing status and deductions",
            text: "Pick a federal filing status and enter pre-tax or post-tax deductions.",
          },
          {
            "@type": "HowToStep",
            name: "Review take-home pay",
            text: "Read net pay, federal tax, FICA, and Florida’s $0 state income tax.",
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
            <h1 className="font-display text-[1.65rem] font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Florida Paycheck Calculator
            </h1>
            <p className="mt-2 text-sm leading-snug text-gray-300 sm:mt-3 sm:text-base md:text-lg">
              Estimate take-home pay for Florida salary or hourly jobs after federal income tax and
              FICA — with Florida&apos;s $0 state income tax already reflected.
            </p>
            <p className="mt-1.5 hidden text-sm text-gray-400 sm:flex sm:items-center sm:gap-1.5 sm:flex-wrap">
              <span>{SITE_RATING.ratingValue}</span>
              <span className="tracking-tight text-amber-400" aria-hidden="true">
                ★★★★☆
              </span>
              <span>
                ({Number(SITE_RATING.ratingCount).toLocaleString()}) · Free · Web · Finance
              </span>
            </p>
          </div>

          <PaycheckCalculator />
        </section>

        <article className="max-w-4xl">
          <section id="what-is-florida-paycheck-calculator" className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent mb-4">
              What a Florida paycheck calculator shows you?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A Florida paycheck calculator converts gross wages into an estimated net deposit. Because
              Florida has no personal state income tax, the main variables are federal withholding,
              Social Security, Medicare, benefits deductions, and how often you get paid.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Unlike generic national tools buried in payroll marketing pages, this calculator stays
              focused on Florida workers: salary and hourly modes, clear FICA lines, and an explicit
              $0 Florida state tax row so the savings versus high-tax states is obvious.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Use it when comparing job offers, updating a W-4, planning a raise, or checking how
              401(k) contributions change take-home pay.
            </p>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-secondary">
              <Image
                src={BRAND_HERO}
                alt="Florida paycheck calculator showing take-home pay estimate with tax breakdown"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          </section>

          <section id="paycheck-breakdown" className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent mb-4">
              Florida paycheck breakdown
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Gross pay is split into federal income tax, FICA, optional deductions, and take-home.
              Local income taxes are uncommon for Florida residents, so most people see federal and
              payroll taxes as the primary withholdings.
            </p>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-secondary">
              <Image
                src={BRAND_BREAKDOWN}
                alt="Visual breakdown of a Florida paycheck into taxes, FICA, and take-home pay"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          </section>

          <section id="how-to-use" className="mb-14">
            <h2 className="mb-12 font-display text-2xl font-bold text-accent md:mb-16 md:text-3xl">
              How to use this Florida paycheck calculator?
            </h2>

            <ol className="relative">
              {(
                [
                  {
                    step: "01",
                    title: "Enter salary or hourly wages",
                    body: "Use annual salary for salaried roles, or hourly rate plus hours per week for hourly jobs.",
                  },
                  {
                    step: "02",
                    title: "Pick your pay frequency",
                    body: "Weekly, biweekly, semi-monthly, and monthly produce different per-check amounts from the same annual pay.",
                  },
                  {
                    step: "03",
                    title: "Add filing status and deductions",
                    body: "Filing status shapes the federal estimate. Pre-tax deductions lower taxable wages before FICA and federal tax.",
                  },
                  {
                    step: "04",
                    title: "Review net pay and tax lines",
                    body: "Compare take-home, federal tax, Social Security, Medicare, and Florida’s $0 state income tax.",
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
                        className="absolute left-1/2 top-10 bottom-[-3rem] w-px -translate-x-1/2 bg-accent/45 md:top-11 md:bottom-[-4rem]"
                      />
                    ) : null}
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-primary text-accent font-display text-sm font-bold md:h-11 md:w-11">
                      {item.step}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 md:pt-2">
                    <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-white md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400 md:text-[15px]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="no-state-tax" className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent mb-4">
              Why Florida take-home pay can look higher?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Workers who move from states with income tax often keep more of each paycheck in
              Florida, all else equal. Federal and FICA rules still apply, so a Florida paycheck is
              not “tax-free”—it simply skips a state income tax line.
            </p>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-secondary mb-4">
              <Image
                src={BRAND_NO_STATE_TAX}
                alt="Illustration highlighting Florida’s $0 state income tax on paychecks"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Read the full overview in{" "}
              <Link href="/florida-no-state-income-tax" className="text-accent hover:underline">
                Florida&apos;s no state income tax guide
              </Link>
              , then model your own numbers above.
            </p>
          </section>

          <section id="pay-frequency" className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent mb-4">
              Pay frequency changes the check, not the year
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A $72,000 salary is about $2,769 biweekly (26 checks) or $3,000 semi-monthly (24 checks).
              Annual tax liability is similar; cash-flow timing is not. That distinction matters for
              budgeting rent, loans, and retirement contributions.
            </p>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-secondary mb-4">
              <Image
                src={BRAND_PAY_FREQUENCY}
                alt="Comparison of weekly, biweekly, semi-monthly, and monthly Florida pay schedules"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              See examples in our{" "}
              <Link href="/pay-frequency-guide" className="text-accent hover:underline">
                Florida pay frequency guide
              </Link>
              .
            </p>
          </section>

          <section id="who-should-use" className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent mb-4">
              Who should use this tool?
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {[
                "Florida employees comparing salary offers or raises",
                "Hourly workers estimating overtime-adjusted annual pay",
                "People relocating to Florida and modeling take-home changes",
                "Anyone checking how 401(k) or health premiums affect net pay",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-secondary/80 p-4 text-gray-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="assumptions" className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent mb-4">
              Assumptions and limitations
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Estimates use 2026 federal brackets, standard deduction amounts, and SSA FICA rates.
              They simplify IRS Publication 15-T withholding, ignore city payroll nuances, and do not
              model every credit or multiple jobs. Confirm numbers with your payroll provider.
            </p>
            <div className="relative w-full max-w-2xl aspect-video mx-auto rounded-2xl overflow-hidden border border-white/10 bg-secondary">
              <Image
                src={BRAND_HOW_TO}
                alt="Steps for calculating Florida take-home pay with federal tax and FICA"
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
          </section>

          <FaqSection items={faqs} />

          <section className="mt-16 rounded-2xl border border-accent/30 bg-secondary p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Ready to estimate your Florida paycheck?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Jump back to the calculator, adjust wages and deductions, and see how federal tax and
              FICA shape your take-home pay.
            </p>
            <CtaButton href="/#calculator" ariaLabel="Jump to Florida paycheck calculator">
              BACK TO CALCULATOR
            </CtaButton>
          </section>
        </article>
      </div>
    </>
  );
}
