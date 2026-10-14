import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import ParlayCalculator from "@/components/ParlayCalculator";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import {
  BRAND_FEATURE_2,
  BRAND_FEATURE_3,
  BRAND_HERO,
  BRAND_LOGO,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_RATING,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "Free Parlay Calculator — Odds & Payout",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free parlay calculator for sports betting. Convert American, decimal, or fractional odds, build multi-leg tickets, and see exact profit and payout instantly.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Free Parlay Calculator — Odds & Payout",
    description:
      "Calculate parlay odds and payouts in seconds. American, decimal, and fractional formats supported.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Parlay Calculator homepage — free odds and payout tool",
      },
    ],
  },
};

const faqs = [
  {
    question: "What is a parlay calculator?",
    answer:
      "A parlay calculator multiplies the decimal odds of every leg in your ticket, then applies your stake to show combined odds, profit, and total payout. Parlay Calculator does that math for American, decimal, and fractional odds.",
  },
  {
    question: "How do I calculate a parlay payout?",
    answer:
      "Convert each leg to decimal odds, multiply them together, then multiply by your stake. For example, three −110 legs are about 1.909 × 1.909 × 1.909 ≈ 6.97, so a $100 stake returns roughly $697 total. Use the tool above or our how-to guide for worked examples.",
  },
  {
    question: "How do parlay odds work?",
    answer:
      "Parlay odds are multiplicative. Each leg’s decimal price is multiplied by the next. That raises the payout and lowers the chance every selection wins. Our parlay odds calculator shows both the combined American price and implied win probability.",
  },
  {
    question: "Does this parlay odds calculator support moneyline bets?",
    answer:
      "Yes. Enter each moneyline in American format (like −150 or +180), switch formats if needed, and the calculator returns the combined moneyline parlay price and payout.",
  },
  {
    question: "What is the difference between a parlay and a round robin?",
    answer:
      "A parlay is one all-or-nothing ticket. A round robin builds every smaller parlay combination from your picks, so one loss does not wipe the entire stake. Use our round robin bet calculator for combo counts and total risk.",
  },
  {
    question: "Can I use this for NFL parlays?",
    answer:
      "Absolutely. Build any NFL (or NBA, MLB, soccer) multi-leg ticket here, or open the dedicated NFL parlay calculator page for football-focused examples and links.",
  },
  {
    question: "Is this parlay bet calculator free?",
    answer:
      "Yes. The full parlay payout calculator is free on parlaycalculator.net — no account required. It is an educational odds tool, not a sportsbook.",
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
          "Free parlay calculator for sports betting odds, payouts, and multi-leg tickets.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: "Free Parlay Calculator — Odds & Payout",
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
          "Web-based parlay odds and payout calculator with American, decimal, and fractional formats.",
      },
      {
        "@type": "HowTo",
        name: "How to use the free parlay calculator",
        description: "Build a multi-leg ticket and calculate payout in four steps.",
        step: [
          {
            "@type": "HowToStep",
            name: "Choose odds format",
            text: "Select American, decimal, or fractional odds to match your sportsbook slip.",
          },
          {
            "@type": "HowToStep",
            name: "Enter your stake",
            text: "Type the amount you plan to wager on the full parlay.",
          },
          {
            "@type": "HowToStep",
            name: "Add each leg",
            text: "Enter the odds for every selection. Add or remove legs as needed.",
          },
          {
            "@type": "HowToStep",
            name: "Read the payout",
            text: "See combined odds, profit, total payout, and implied win probability instantly.",
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
            Calculate parlay odds and payout before you lock the ticket
          </p>

          <ParlayCalculator showLabels={false} defaultLegs={["-110", "-110", "-110"]} />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Free parlay odds calculator for American, decimal, and fractional prices — built for
            moneyline, spread, and total parlays across NFL and every major sport.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 sm:gap-3">
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
              <span>Sports betting tool</span>
            </div>
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-violet-soft underline-offset-4 hover:underline"
            >
              See how the math works →
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <section className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Free parlay odds calculator for sports betting
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-white/80">
            A <strong className="text-white">parlay odds calculator</strong> converts every leg on
            your ticket into one combined price, then scales that price by your stake. Bettors use
            it before locking a slip so they know profit, total payout, and how unlikely a long
            multi-leg ticket really is. This free tool supports American, decimal, and fractional
            formats — the same prices U.S. and international sportsbooks display.
          </p>
          <p className="leading-relaxed text-white/75">
            Whether you searched for a parlay payout calculator, a parlay bet calculator, or an odds
            calculator for parlays, the workflow is the same: enter stake, add legs, read combined
            odds. No account. No sportsbook soft-sell. Just clear math you can compare to the number
            on your bet slip.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            How to calculate parlay odds
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-white/80">
            People also ask{" "}
            <Link
              href="/blog/how-to-calculate-parlay-odds"
              className="text-violet-soft underline hover:no-underline"
            >
              how to calculate parlay odds
            </Link>{" "}
            by hand. The formula behind every parlay calculator is straightforward once prices are
            in decimal form.
          </p>
          <ol className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "Convert each leg",
                d: "American −110 ≈ 1.909 decimal. +150 = 2.50. Fractional 5/2 = 3.50.",
              },
              {
                n: "02",
                t: "Multiply the decimals",
                d: "Combined odds = d₁ × d₂ × d₃ × … for every leg on the ticket.",
              },
              {
                n: "03",
                t: "Apply your stake",
                d: "Total payout = stake × combined decimal. Profit = payout − stake.",
              },
              {
                n: "04",
                t: "Check win probability",
                d: "Implied probability ≈ 1 ÷ combined decimal — a reality check before you stack.",
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
              Example: 3-leg parlay at −110
            </h3>
            <p className="leading-relaxed text-white/75">
              Three −110 spreads → 1.909 × 1.909 × 1.909 ≈ <strong className="text-white">6.96</strong>{" "}
              decimal (about <strong className="text-violet">+596</strong> American). A $100 stake
              returns roughly <strong className="text-white">$696</strong> total and about{" "}
              <strong className="text-teal">$596</strong> profit if every leg hits. Enter the same
              numbers in the calculator above to verify in one click.
            </p>
          </div>
        </section>

        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Parlay payout calculator: stake, profit, and total return
            </h2>
            <p className="mb-4 leading-relaxed text-white/80">
              A payout-focused view answers the question most bettors care about: “If this hits,
              what do I collect?” Change the stake field and the results panel updates profit and
              total payout instantly — useful when you are comparing a $10 flyer to a $50 ticket or
              testing a boosted promotion price.
            </p>
            <ul className="space-y-3 text-white/80">
              <li>
                <strong className="text-white">Combined American odds</strong> — the headline price
                most U.S. books show on the slip.
              </li>
              <li>
                <strong className="text-white">Combined decimal odds</strong> — the clean multiplier
                used under the hood.
              </li>
              <li>
                <strong className="text-white">Implied win probability</strong> — how often the ticket
                would need to cash at that price.
              </li>
            </ul>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_2}
              alt="Parlay payout calculator results showing combined odds profit and total return"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover"
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Build moneyline, NFL, and multi-sport parlays
          </h2>
          <p className="mb-8 max-w-3xl leading-relaxed text-white/80">
            The same parlay builder handles spreads, totals, props, and moneylines. Use dedicated
            landers when you want sport- or bet-type context — they all run on this core odds engine.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/moneyline-parlay-calculator",
                title: "Moneyline parlay calculator",
                body: "Stack straight-up winners with American ML prices — favorites and underdogs on one ticket.",
              },
              {
                href: "/nfl-parlay-calculator",
                title: "NFL parlay calculator",
                body: "Price Sunday cards, same-game custom quotes, and multi-game football parlays before kickoff.",
              },
              {
                href: "/round-robin-calculator",
                title: "Round robin bet calculator",
                body: "Turn selections into every 2-leg or 3-leg combo with ticket count and total stake.",
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
            American, decimal, and fractional parlay odds
          </h2>
          <p className="mb-4 leading-relaxed text-white/80">
            Searchers often type “odds calculator parlay” or “parlay calculator odds” when they need
            format help. Switch the toggle above the legs to match your book:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-5 text-white/75">
            <li>
              <strong className="text-white">American</strong> — −110, +150 (default for U.S.
              sportsbooks)
            </li>
            <li>
              <strong className="text-white">Decimal</strong> — 1.91, 2.50 (common in Canada, Europe,
              Australia)
            </li>
            <li>
              <strong className="text-white">Fractional</strong> — 10/11, 3/2 (UK-style prices)
            </li>
          </ul>
          <p className="leading-relaxed text-white/75">
            Mixed slips still work: convert everything to decimal, multiply, then read payout. For a
            deeper walkthrough of combined prices and juice, read{" "}
            <Link href="/blog/parlay-odds-explained" className="text-violet-soft underline">
              parlay odds explained
            </Link>
            . New to parlays? Start with{" "}
            <Link href="/blog/what-is-a-parlay-bet" className="text-violet-soft underline">
              what is a parlay bet
            </Link>
            .
          </p>
        </section>

        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative order-2 aspect-video overflow-hidden rounded-2xl border border-white/10 md:order-1">
            <Image
              src={BRAND_FEATURE_3}
              alt="Parlay builder with multiple sports betting legs and odds formats"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Why use this free parlay bet calculator
            </h2>
            <ul className="space-y-4 text-white/80">
              <li>
                <h3 className="mb-1 font-display text-lg font-semibold text-white">
                  No sportsbook clutter
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  Price the ticket first. Decide where to bet second. Educational tool only — we do
                  not take wagers.
                </p>
              </li>
              <li>
                <h3 className="mb-1 font-display text-lg font-semibold text-white">
                  Honest implied probability
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  Big American numbers look exciting. Win-probability % keeps long parlays in
                  perspective.
                </p>
              </li>
              <li>
                <h3 className="mb-1 font-display text-lg font-semibold text-white">
                  Related tools that match real searches
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  NFL, moneyline, and round robin pages cover modifier keywords without thin
                  duplicate calculators.
                </p>
              </li>
            </ul>
            <p className="mt-6 text-sm text-white/70">
              Step-by-step product walkthrough:{" "}
              <Link href="/how-it-works" className="text-violet-soft underline">
                how Parlay Calculator works
              </Link>
              .
            </p>
          </div>
        </section>

        <FaqSection title="Parlay calculator FAQs" items={faqs} includeSchema={false} />

        <section className="mt-16 border-t border-white/10 pt-12 text-center">
          <div className="relative mx-auto mb-6 h-16 w-16">
            <Image src={BRAND_LOGO} alt="" width={64} height={64} className="object-contain" />
          </div>
          <h2 className="mb-3 font-display text-2xl font-bold text-white md:text-3xl">
            Ready to price your next parlay?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-white/75">
            Scroll up to the free calculator, stack your legs, and know the payout before you bet.
          </p>
          <CtaButton href="/#calculator" ariaLabel="Back to parlay calculator" icon="arrow">
            BACK TO CALCULATOR
          </CtaButton>
        </section>
      </div>
    </>
  );
}
