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
    question: "Does this parlay odds calculator support moneyline bets?",
    answer:
      "Yes. Enter each moneyline in American format (like −150 or +180), switch formats if needed, and the calculator returns the combined moneyline parlay price and payout.",
  },
  {
    question: "Is this parlay calculator free?",
    answer:
      "Yes. The full parlay payout calculator is free on parlaycalculator.net — no account required. It is an educational odds tool, not a sportsbook.",
  },
  {
    question: "Can I use this for NFL parlays?",
    answer:
      "Absolutely. Build any NFL (or NBA, MLB, soccer) multi-leg ticket here, or open the dedicated NFL parlay calculator page for football-focused examples and links.",
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
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_ORIGIN}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
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

      <section className="relative min-h-[72vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={BRAND_HERO}
            alt="Parlay Calculator interface showing multi-leg sports betting odds and payout"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/88 to-brand/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand via-transparent to-brand/55" />
          <div className="hero-glow pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-violet/25 blur-3xl" />
          <div
            className="hero-glow pointer-events-none absolute -right-10 bottom-20 h-72 w-72 rounded-full bg-teal/20 blur-3xl"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl animate-fade-up">
            <span className="brand-gradient-text">{SITE_NAME}</span>
          </p>
          <h1
            className="mb-5 max-w-2xl font-display text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Calculate parlay odds and payout before you lock the ticket
          </h1>
          <p
            className="mb-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg animate-fade-up"
            style={{ animationDelay: "140ms" }}
          >
            Free parlay odds calculator for American, decimal, and fractional prices — built for
            moneyline, spread, and total parlays across NFL and every major sport.
          </p>
          <div
            className="flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <CtaButton href="/#calculator" ariaLabel="Open the free parlay calculator" icon="play">
              OPEN CALCULATOR
            </CtaButton>
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-violet-soft underline-offset-4 hover:underline"
            >
              See how the math works →
            </Link>
          </div>
          <div
            className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/70 animate-fade-up"
            style={{ animationDelay: "260ms" }}
          >
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
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <section id="calculator" className="mb-16 scroll-mt-24">
          <ParlayCalculator title="Free parlay odds & payout calculator" />
        </section>

        <section className="mb-20">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Why bettors use a parlay payout calculator
          </h2>
          <p className="mb-10 max-w-3xl text-lg leading-relaxed text-white/80">
            Multi-leg tickets look simple on a slip, but juice and format switches hide the real
            return. A dedicated{" "}
            <strong className="font-semibold text-white">parlay calculator</strong> turns every leg
            into clear combined odds, profit, and total payout before you submit.
          </p>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={BRAND_FEATURE_2}
                alt="Parlay Calculator results panel with combined odds and total payout"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <ul className="space-y-5 text-white/85">
              {[
                {
                  title: "Instant combined odds",
                  body: "Multiply legs correctly across American, decimal, or fractional formats without manual conversion errors.",
                },
                {
                  title: "True stake → payout",
                  body: "See profit and total return for any stake so you can compare a 3-leg ticket to a round robin or straight bets.",
                },
                {
                  title: "Implied probability",
                  body: "Understand how unlikely a long parlay really is — the same insight sharp bettors check before stacking legs.",
                },
              ].map((item) => (
                <li key={item.title}>
                  <h3 className="mb-1 font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="leading-relaxed text-white/75">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            How this parlay bet calculator works
          </h2>
          <p className="mb-10 max-w-3xl text-white/80">
            Four steps from slip to payout — the same flow covered in{" "}
            <Link href="/how-it-works" className="text-violet-soft underline hover:no-underline">
              how it works
            </Link>{" "}
            and{" "}
            <Link
              href="/blog/how-to-calculate-parlay-odds"
              className="text-violet-soft underline hover:no-underline"
            >
              how to calculate parlay odds
            </Link>
            .
          </p>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Pick format", d: "American, decimal, or fractional — match your book." },
              { n: "02", t: "Set stake", d: "Enter the amount risked on the full multi-leg ticket." },
              { n: "03", t: "Add legs", d: "Type each price. Labels help you track teams or props." },
              { n: "04", t: "Read results", d: "Combined odds, profit, payout, and win probability." },
            ].map((step) => (
              <li key={step.n} className="border-t border-violet/40 pt-4">
                <span className="font-display text-sm font-bold text-teal">{step.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-20 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Cover every parlay search intent
            </h2>
            <p className="mb-6 leading-relaxed text-white/80">
              People searching for a parlay calculator also look for NFL tickets, moneyline stacks,
              round robins, and the formula behind the payout. Dedicated tools and guides close those
              gaps without thin duplicate pages.
            </p>
            <ul className="space-y-3">
              {[
                { href: "/nfl-parlay-calculator", label: "NFL parlay calculator" },
                { href: "/moneyline-parlay-calculator", label: "Moneyline parlay calculator" },
                { href: "/round-robin-calculator", label: "Round robin bet calculator" },
                { href: "/blog/what-is-a-parlay-bet", label: "What is a parlay bet?" },
                { href: "/blog/parlay-odds-explained", label: "Parlay odds explained" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-medium text-violet-soft hover:underline">
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_3}
              alt="Sports betting parlay builder with multiple legs and odds formats"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        <FaqSection title="Parlay calculator FAQs" items={faqs} />

        <section className="mt-16 border-t border-white/10 pt-12 text-center">
          <div className="relative mx-auto mb-6 h-16 w-16">
            <Image src={BRAND_LOGO} alt="" width={64} height={64} className="object-contain" />
          </div>
          <h2 className="mb-3 font-display text-2xl font-bold text-white md:text-3xl">
            Ready to price your next parlay?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-white/75">
            Open the free calculator, stack your legs, and know the payout before you bet.
          </p>
          <CtaButton href="/#calculator" ariaLabel="Back to parlay calculator" icon="arrow">
            CALCULATE NOW
          </CtaButton>
        </section>
      </div>
    </>
  );
}
