import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { BRAND_LOGO, CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Index Fund Calculator",
  description:
    "About Index Fund Calculator on indexfundcalculator.com — a free investment growth tool and SERP-backed guides for index funds, fees, and compounding.",
  alternates: { canonical: `${SITE_ORIGIN}/about-us` },
  openGraph: {
    title: "About Index Fund Calculator",
    description: `Independent index fund calculator and guides on ${SITE_DOMAIN}.`,
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
              alt="Index Fund Calculator logo"
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
              {SITE_NAME} is a free web tool on {SITE_DOMAIN} that helps investors project index fund
              growth, understand compounding, and see how expense ratios affect long-term balances.
              We are not a brokerage and we do not sell investments.
            </p>
          </div>
        </div>

        <section className="mb-10 space-y-4 text-white/80 leading-relaxed">
          <h2 className="font-display text-2xl font-bold text-white">What we build</h2>
          <p>
            The core product is an{" "}
            <Link href="/" className="text-violet-soft underline">
              index fund calculator
            </Link>{" "}
            with contributions, expected return, and expense ratio, plus focused tools for{" "}
            <Link href="/compound-interest-calculator" className="text-violet-soft underline">
              compound interest
            </Link>
            ,{" "}
            <Link href="/expense-ratio-calculator" className="text-violet-soft underline">
              expense ratios
            </Link>
            , and{" "}
            <Link href="/investment-growth-calculator" className="text-violet-soft underline">
              investment growth
            </Link>
            . Supporting guides cover what index funds are, how they compare to mutual funds, and
            why fees matter — topics people actually search.
          </p>
          <h2 className="font-display text-2xl font-bold text-white">Our approach</h2>
          <p>
            Clear math, honest disclaimers, and no fake return guarantees. Markets involve risk.
            Use the calculator for education and planning, then decide for yourself with a licensed
            advisor if you need personalized advice.
          </p>
          <p>
            Questions? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-soft underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <CtaButton href="/#calculator" ariaLabel="Open calculator">
          OPEN CALCULATOR
        </CtaButton>
      </div>
    </>
  );
}
