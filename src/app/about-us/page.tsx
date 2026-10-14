import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { BRAND_LOGO, CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Parlay Calculator",
  description:
    "About Parlay Calculator on parlaycalculator.net — a free sports betting odds tool and SERP-backed guides for parlays, moneylines, and round robins.",
  alternates: { canonical: `${SITE_ORIGIN}/about-us` },
  openGraph: {
    title: "About Parlay Calculator",
    description: `Independent parlay odds calculator and guides on ${SITE_DOMAIN}.`,
    url: `${SITE_ORIGIN}/about-us`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us", href: "/about-us" }]} />
      <div className="container mx-auto max-w-4xl px-4 pb-10 pt-8">
      <div className="mb-10 flex flex-col items-start gap-8 md:flex-row">
        <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-brand-soft">
          <Image
            src={BRAND_LOGO}
            alt="Parlay Calculator logo"
            fill
            sizes="160px"
            className="object-contain p-3"
            priority
          />
        </div>
        <div>
          <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
            About {SITE_NAME}
          </h1>
          <p className="text-lg leading-relaxed text-white/80">
            {SITE_NAME} is a free web tool on {SITE_DOMAIN} that helps sports bettors convert odds,
            price multi-leg tickets, and understand payout before they bet. We are not a sportsbook
            and we do not take wagers.
          </p>
        </div>
      </div>

      <section className="mb-10 space-y-4 text-white/80 leading-relaxed">
        <h2 className="font-display text-2xl font-bold text-white">What we build</h2>
        <p>
          The core product is a{" "}
          <Link href="/" className="text-violet-soft underline">
            parlay calculator
          </Link>{" "}
          with American, decimal, and fractional formats, plus focused tools for{" "}
          <Link href="/nfl-parlay-calculator" className="text-violet-soft underline">
            NFL parlays
          </Link>
          ,{" "}
          <Link href="/moneyline-parlay-calculator" className="text-violet-soft underline">
            moneyline parlays
          </Link>
          , and{" "}
          <Link href="/round-robin-calculator" className="text-violet-soft underline">
            round robins
          </Link>
          . Supporting guides cover how to calculate odds and what parlays are — topics people
          actually search.
        </p>
        <h2 className="font-display text-2xl font-bold text-white">Our approach</h2>
        <p>
          Clear math, honest disclaimers, and no fake “guaranteed winners.” Betting involves risk.
          Use the calculator for education and ticket pricing, then decide for yourself.
        </p>
        <p>
          Questions? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-soft underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or visit{" "}
          <Link href="/contact-us" className="text-violet-soft underline">
            Contact Us
          </Link>
          .
        </p>
      </section>

      <CtaButton href="/#calculator">OPEN CALCULATOR</CtaButton>
      </div>
    </>
  );
}
