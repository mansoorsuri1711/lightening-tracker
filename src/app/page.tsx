import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import FaqSection from "@/components/FaqSection";
import IndexFundCalculator from "@/components/IndexFundCalculator";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import {
  BRAND_FEATURE_2,
  BRAND_FEATURE_3,
  BRAND_FEATURE_4,
  BRAND_HERO,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_RATING,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "Free Index Fund Calculator — Growth & Fees",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free index fund calculator to project investment growth, compound returns, monthly contributions, and expense-ratio impact over time.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Free Index Fund Calculator — Growth & Fees",
    description:
      "Estimate index fund returns with contributions, compounding, and fund fees in seconds.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Index Fund Calculator homepage — free growth and fee tool",
      },
    ],
  },
};

const faqs = [
  {
    question: "What is an index fund calculator?",
    answer:
      "An index fund calculator estimates how an investment in a market-tracking fund could grow using your starting balance, contributions, time horizon, expected return, and expense ratio. Index Fund Calculator shows ending balance, total contributed, growth, and fee drag.",
  },
  {
    question: "How do I calculate index fund returns?",
    answer:
      "Apply a net annual return (expected market return minus expense ratio) to your balance each period, then add contributions. For monthly investing, divide the annual rate by 12. The calculator above automates that math and builds a year-by-year table.",
  },
  {
    question: "What expected return should I use?",
    answer:
      "Long-term U.S. equity index assumptions often fall around 7%–10% annualized before fees, depending on the market and inflation view. Many planners also test a lower case (for example 5%–6%) so the plan still works if markets are softer. Past performance is not a guarantee of future results.",
  },
  {
    question: "Why does expense ratio matter?",
    answer:
      "Expense ratios are deducted from fund assets every year. A 0.75% fee versus a 0.04% fee can cost tens or hundreds of thousands of dollars over decades on the same contribution plan. Compare fees with our expense ratio calculator.",
  },
  {
    question: "What is the difference between lump sum and monthly contributions?",
    answer:
      "A lump sum invests money once and lets it compound. Monthly contributions add new cash on a schedule (similar to a SIP). Most long-term savers use both: an initial balance plus ongoing deposits. This calculator supports that mix.",
  },
  {
    question: "Does this calculator include inflation or taxes?",
    answer:
      "No. Results are nominal projections before taxes and inflation. For a rough real-return view, lower your expected return by your inflation assumption, then compare ending balances again.",
  },
  {
    question: "Is this the same as a compound interest calculator?",
    answer:
      "Closely related. Compound interest is the engine; an index fund calculator layers in contributions and fund fees so the projection matches how index investors actually save. Use our dedicated compound interest calculator for a fee-free view.",
  },
  {
    question: "Is Index Fund Calculator free?",
    answer:
      "Yes. The full tool on indexfundcalculator.com is free — no account required. It is an educational planning tool, not a brokerage and not personalized investment advice.",
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
          "Free index fund calculator for investment growth, compounding, and expense ratios.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: "Free Index Fund Calculator — Growth & Fees",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}${BRAND_HERO}`,
          width: 1200,
          height: 630,
          ...imageObjectLicensing,
        },
      },
      {
        ...WEB_APPLICATION_JSON_LD,
        "@id": `${SITE_ORIGIN}/#software`,
        description:
          "Web-based index fund and investment growth calculator with contributions and expense ratios.",
      },
      {
        "@type": "HowTo",
        name: "How to use the free index fund calculator",
        description: "Project index fund growth in four steps.",
        step: [
          {
            "@type": "HowToStep",
            name: "Enter starting balance",
            text: "Type the amount you already have invested or plan to start with.",
          },
          {
            "@type": "HowToStep",
            name: "Add contributions",
            text: "Set a monthly or yearly contribution that matches your savings plan.",
          },
          {
            "@type": "HowToStep",
            name: "Choose years and return",
            text: "Pick your time horizon and an expected annual return assumption.",
          },
          {
            "@type": "HowToStep",
            name: "Include expense ratio",
            text: "Enter the fund’s annual expense ratio to see net growth and fee drag.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <section id="calculator" className="relative overflow-hidden scroll-mt-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="hero-glow absolute -left-20 top-0 h-48 w-48 rounded-full bg-violet/20 blur-3xl" />
          <div
            className="hero-glow absolute -right-10 top-20 h-56 w-56 rounded-full bg-teal/15 blur-3xl"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-5 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
          <h1 className="mb-2 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="brand-gradient-text">{SITE_NAME}</span>
          </h1>
          <p className="mb-6 max-w-2xl font-display text-lg font-semibold leading-snug text-white sm:text-xl md:text-2xl">
            Project index fund growth before you invest another dollar
          </p>

          <IndexFundCalculator showYearTable defaultExpense="0.05" />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Free investment growth calculator for index funds — contributions, compounding, and
            expense-ratio impact in one clear projection.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/70 sm:gap-3">
            <span
              className="inline-flex items-center gap-1.5"
              aria-label={`Rated ${SITE_RATING.ratingValue} out of 5`}
            >
              <span className="font-semibold text-gold">{SITE_RATING.ratingValue}</span>
              <span className="tracking-tight text-gold" aria-hidden="true">
                ★★★★★
              </span>
              <span>({Number(SITE_RATING.ratingCount).toLocaleString()})</span>
            </span>
            <span className="text-white/40">·</span>
            <span>Free</span>
            <span className="text-white/40">·</span>
            <span>Web</span>
            <span className="text-white/40">·</span>
            <span>Investment tool</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Free index fund calculator for long-term investors
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-white/80">
              An <strong className="text-white">index fund calculator</strong> turns a savings plan
              into a concrete ending balance. Enter what you have today, what you can add each month,
              how long you will stay invested, and a realistic expected return. Then subtract the
              fund’s expense ratio so the projection reflects costs you will actually pay.
            </p>
            <p className="mb-4 leading-relaxed text-white/75">
              Top ranking investment calculators from sites like NerdWallet, SmartAsset, Calculator.net,
              and Investor.gov all answer the same core question: what could regular investing grow
              into over time? This tool is built for that intent — with one index-fund-specific
              advantage competitors often skip: fee drag is visible in the results, not hidden in the
              fine print.
            </p>
            <p className="leading-relaxed text-white/75">
              Whether you searched for an investment growth calculator, a returns estimator, or a way
              to model broad-market index investing, the workflow is the same: inputs on the left,
              results and chart on the right. No account. No brokerage soft-sell. Just planning math
              you can sanity-check against your goals.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_HERO}
              alt="Index Fund Calculator — project investment growth, contributions, and returns"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover"
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            How to calculate index fund returns
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-white/80">
            People also ask how index fund returns compound. The formula behind every solid{" "}
            <strong className="text-white">index fund returns calculator</strong> is straightforward
            once you use a net rate of return.
          </p>
          <ol className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "Start with principal",
                d: "Your initial investment is the base that compounds every period.",
              },
              {
                n: "02",
                t: "Add contributions",
                d: "Monthly or yearly deposits buy more shares over time and accelerate growth.",
              },
              {
                n: "03",
                t: "Apply net return",
                d: "Net rate ≈ expected market return − expense ratio, then compound per period.",
              },
              {
                n: "04",
                t: "Read ending balance",
                d: "Final value = contributions + compounded growth after fees.",
              },
            ].map((step) => (
              <li key={step.n} className="border-t border-violet/40 pt-4">
                <span className="font-display text-sm font-bold text-teal">{step.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.d}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h3 className="mb-2 font-display text-lg font-semibold text-white">
              Example: $10,000 start + $500/month for 20 years
            </h3>
            <p className="mb-3 leading-relaxed text-white/75">
              At an 8% expected return and a 0.05% expense ratio, net growth is about 7.95% per year.
              Using the calculator defaults, that plan projects roughly{" "}
              <strong className="text-white">$343,000</strong> ending balance: about{" "}
              <strong className="text-white">$130,000</strong> contributed and about{" "}
              <strong className="text-teal">$213,000</strong> from investment growth, with only a
              few thousand dollars of fee drag versus a zero-fee fund.
            </p>
            <p className="leading-relaxed text-white/75">
              Regular contributions dominate the outcome — which is why starting early usually beats
              waiting for a perfect entry day. Change the inputs above to match your own plan and
              compare a conservative return next to an optimistic one.
            </p>
          </div>
        </section>

        <section className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            How to use this index fund calculator
          </h2>
          <p className="mb-6 leading-relaxed text-white/80">
            Ranking calculators explain each input because searchers need confidence in the numbers.
            Here is what every field means on this page:
          </p>
          <ul className="space-y-4 text-white/80">
            <li>
              <h3 className="mb-1 font-display text-lg font-semibold text-white">
                Initial investment
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Cash you already have invested or can invest today. Even a modest starting balance
                compounds for the full timeline.
              </p>
            </li>
            <li>
              <h3 className="mb-1 font-display text-lg font-semibold text-white">Contribution</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Recurring deposit — monthly paycheck investing or a yearly top-up. Toggle frequency
                so the math matches how you actually save.
              </p>
            </li>
            <li>
              <h3 className="mb-1 font-display text-lg font-semibold text-white">
                Years and expected return
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Time horizon and assumed annual market return before fees. Longer timelines amplify
                small rate differences, so stress-test more than one return.
              </p>
            </li>
            <li>
              <h3 className="mb-1 font-display text-lg font-semibold text-white">Expense ratio</h3>
              <p className="text-sm leading-relaxed text-white/70">
                The fund’s annual fee. Broad index funds are often well under 0.20%. Enter the
                prospectus number so net return is honest.
              </p>
            </li>
          </ul>
        </section>

        <section className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            What expected return should you assume?
          </h2>
          <p className="mb-4 leading-relaxed text-white/80">
            People also ask what counts as a “good” investment return. Long-run U.S. equity indexes
            are often discussed in the high single digits annualized — but any single decade can be
            much higher or lower. Bond-heavy mixes usually assume less.
          </p>
          <p className="mb-4 leading-relaxed text-white/75">
            A practical approach: run the calculator at 6%, 8%, and 10%. If your goal only works at
            the optimistic rate, the plan is fragile. If it still looks workable at 6%, you have
            more margin for market reality. Always remember this is a planning model, not a forecast.
          </p>
          <p className="leading-relaxed text-white/75">
            For definitions of indexing itself, read{" "}
            <Link href="/blog/what-is-an-index-fund" className="text-violet-soft underline">
              what is an index fund
            </Link>
            . To compare fund structures, see{" "}
            <Link href="/blog/index-fund-vs-mutual-fund" className="text-violet-soft underline">
              index fund vs mutual fund
            </Link>
            .
          </p>
        </section>

        <section className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Index fund return formula (lump sum and contributions)
          </h2>
          <p className="mb-4 leading-relaxed text-white/80">
            Index fund calculators use the same compounding math as other investment growth tools.
            For a lump sum with annual compounding, future value is roughly:
          </p>
          <p className="mb-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-violet-soft">
            FV = P × (1 + r)<sup>t</sup>
          </p>
          <p className="mb-4 leading-relaxed text-white/75">
            where <strong className="text-white">P</strong> is the starting amount,{" "}
            <strong className="text-white">r</strong> is the net annual return (expected return minus
            expense ratio), and <strong className="text-white">t</strong> is years. With monthly
            contributions, each deposit compounds for fewer periods than the first dollar — the
            calculator sums that path period by period instead of guessing.
          </p>
          <p className="leading-relaxed text-white/75">
            That is why a $500 monthly contribution can matter more than a slightly higher assumed
            return. You can isolate compounding without fees on the{" "}
            <Link href="/compound-interest-calculator" className="text-violet-soft underline">
              compound interest calculator
            </Link>
            .
          </p>
        </section>

        <section className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Lump sum vs monthly investing
          </h2>
          <p className="mb-4 leading-relaxed text-white/80">
            Searchers comparing SIP-style plans with one-time investing want a clear trade-off. A
            lump sum maximizes time in the market for money you already have. Monthly investing
            matches real paycheck cash flow and averages purchase prices over time.
          </p>
          <p className="leading-relaxed text-white/75">
            Use both fields together: put available cash in initial investment, then set a
            contribution you can sustain. Compare “contribution only” versus “larger lump sum, smaller
            monthly” scenarios to see which path fits your budget without changing the expected
            return assumption.
          </p>
        </section>

        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              See fee impact on index fund growth
            </h2>
            <p className="mb-4 leading-relaxed text-white/80">
              A payout-focused view answers the question most investors care about: “What do fees
              actually cost me?” The results panel shows fee drag versus a zero-expense scenario so
              you can feel the difference of 0.04% versus 0.75% over decades.
            </p>
            <p className="mb-4 leading-relaxed text-white/75">
              SERP leaders talk about rate of return; fewer show the dollar cost of expense ratios
              on the same contribution plan. That gap is where this calculator earns its keep —
              especially when you open the dedicated{" "}
              <Link href="/expense-ratio-calculator" className="text-violet-soft underline">
                expense ratio calculator
              </Link>{" "}
              for a side-by-side fee comparison.
            </p>
            <ul className="space-y-3 text-white/80">
              <li>
                <strong className="text-white">Ending balance</strong> — projected value after
                contributions and compounding.
              </li>
              <li>
                <strong className="text-white">Total contributed</strong> — cash you put in, separate
                from market growth.
              </li>
              <li>
                <strong className="text-white">Fee drag</strong> — wealth left on the table versus a
                0% expense ratio.
              </li>
            </ul>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_2}
              alt="Chart showing how higher expense ratios reduce long-term index fund balances"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover"
            />
          </div>
        </section>

        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_4}
              alt="Year-by-year index fund balance table from the Index Fund Calculator"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Year-by-year growth you can follow
            </h2>
            <p className="mb-4 leading-relaxed text-white/80">
              Every projection includes an annual table so you can see when contributions dominate
              early years and when compounded growth takes over later — useful for retirement and
              goal planning.
            </p>
            <p className="leading-relaxed text-white/75">
              Scroll back to the calculator for the live table, or open the{" "}
              <Link href="/investment-growth-calculator" className="text-violet-soft underline">
                investment growth calculator
              </Link>{" "}
              for a contribution-focused view.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Related investment calculators
          </h2>
          <p className="mb-8 max-w-3xl leading-relaxed text-white/80">
            The same growth engine powers focused tools for common search intents — compound
            interest, expense ratios, and contribution-driven investment growth.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/compound-interest-calculator",
                title: "Compound interest calculator",
                body: "Isolate the power of compounding without fee fields — ideal for teaching or simple savings goals.",
              },
              {
                href: "/expense-ratio-calculator",
                title: "Expense ratio calculator",
                body: "Compare a low-cost index fund against a higher-fee fund on the same contribution plan.",
              },
              {
                href: "/investment-growth-calculator",
                title: "Investment growth calculator",
                body: "Model starting balance, recurring deposits, and yearly growth the way NerdWallet-style tools do.",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="block border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet/40"
              >
                <h3 className="mb-2 font-display text-lg font-semibold text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{card.body}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-violet-soft">
                  Open tool →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Who this calculator is for
          </h2>
          <p className="mb-4 leading-relaxed text-white/80">
            This page is for long-term investors who want a clear projection before increasing 401(k),
            IRA, or taxable index contributions. It also helps beginners who understand indexing
            conceptually but need numbers — ending balance, contributions, and growth — before they
            commit to a monthly amount.
          </p>
          <p className="leading-relaxed text-white/75">
            It is not for day trading, options payoff math, or guaranteed-return products. Markets
            move; the chart assumes a steady rate so you can compare plans, not predict next year’s
            statement.
          </p>
        </section>

        <section className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Assumptions and limitations
          </h2>
          <p className="mb-4 leading-relaxed text-white/80">
            Like Investor.gov and other educational calculators, this tool uses simplified
            compounding. It assumes a constant expected return, contributions at the start of each
            period, and an expense ratio subtracted from that return. It does not model taxes,
            inflation, account fees beyond the expense ratio, dividend reinvestment timing quirks, or
            sequence-of-returns risk.
          </p>
          <p className="leading-relaxed text-white/75">
            Treat every result as a planning estimate. Re-run with lower returns and higher fees if
            you want a cautious case. For product details, read{" "}
            <Link href="/how-it-works" className="text-violet-soft underline">
              how Index Fund Calculator works
            </Link>{" "}
            and the{" "}
            <Link href="/disclaimer" className="text-violet-soft underline">
              disclaimer
            </Link>
            .
          </p>
        </section>

        <section className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Index funds, fees, and what to read next
          </h2>
          <p className="mb-4 leading-relaxed text-white/80">
            New to indexing? Start with definitions, then compare fund types, then dig into costs:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-5 text-white/75">
            <li>
              <Link href="/blog/what-is-an-index-fund" className="text-violet-soft underline">
                What is an index fund?
              </Link>{" "}
              — how market tracking works
            </li>
            <li>
              <Link href="/blog/index-fund-vs-mutual-fund" className="text-violet-soft underline">
                Index fund vs mutual fund
              </Link>{" "}
              — active vs passive trade-offs
            </li>
            <li>
              <Link href="/blog/expense-ratio-explained" className="text-violet-soft underline">
                Expense ratio explained
              </Link>{" "}
              — why tiny percentages matter
            </li>
          </ul>
        </section>

        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative order-2 aspect-video overflow-hidden rounded-2xl border border-white/10 md:order-1">
            <Image
              src={BRAND_FEATURE_3}
              alt="Illustration of starting index fund investing early with regular contributions"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Why use this free index fund calculator
            </h2>
            <ul className="space-y-4 text-white/80">
              <li>
                <h3 className="mb-1 font-display text-lg font-semibold text-white">
                  Built for index investing
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  Contributions, expected return, and expense ratio in one place — not a generic
                  interest toy that ignores fees.
                </p>
              </li>
              <li>
                <h3 className="mb-1 font-display text-lg font-semibold text-white">
                  Chart + year-by-year table
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  See growth visually, hover for yearly stats, then expand the table when you want
                  every year’s balance.
                </p>
              </li>
              <li>
                <h3 className="mb-1 font-display text-lg font-semibold text-white">
                  Educational, not a sales funnel
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  We do not sell funds or open accounts. Use the numbers to compare your own options
                  and contribution plans.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <FaqSection title="Index fund calculator FAQs" items={faqs} includeSchema={false} />
      </div>
    </>
  );
}
