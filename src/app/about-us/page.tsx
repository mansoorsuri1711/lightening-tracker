import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { BRAND_LOGO, CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Lightning Tracker",
  description:
    "About Lightning Tracker on lightningtracker.net — free tools and guides for live lightning awareness, distance estimates, and thunderstorm safety.",
  alternates: { canonical: `${SITE_ORIGIN}/about-us` },
  openGraph: {
    title: "About Lightning Tracker",
    description: `Independent lightning tracker tools and guides on ${SITE_DOMAIN}.`,
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
              alt="Lightning Tracker logo"
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
              {SITE_NAME} is a free web resource on {SITE_DOMAIN} that helps people estimate lightning
              distance, understand live strike maps, and practice safer thunderstorm habits. We are
              not a government weather service and we do not issue official warnings.
            </p>
          </div>
        </div>

        <section className="mb-10 space-y-4 text-white/80 leading-relaxed">
          <h2 className="font-display text-2xl font-bold text-white">What we build</h2>
          <p>
            The core experience is a{" "}
            <Link href="/" className="text-violet-soft underline">
              lightning tracker
            </Link>{" "}
            workflow with a{" "}
            <Link href="/lightning-distance-calculator" className="text-violet-soft underline">
              distance calculator
            </Link>
            ,{" "}
            <Link href="/live-lightning-map" className="text-violet-soft underline">
              live map guidance
            </Link>
            , and{" "}
            <Link href="/lightning-alerts" className="text-violet-soft underline">
              alert tips
            </Link>
            , plus SERP-backed articles on detection, distance, apps, and safety.
          </p>
          <p>
            Our goal is clear educational content that ranks for real searches without keyword
            stuffing, doorway pages, or fake urgency. When storms are close, shelter first — then
            use tools to stay informed.
          </p>
        </section>

        <section className="mb-10 space-y-4 text-white/80 leading-relaxed">
          <h2 className="font-display text-2xl font-bold text-white">Contact</h2>
          <p>
            Questions or corrections? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-soft underline">
              {CONTACT_EMAIL}
            </a>{" "}
            or use our{" "}
            <Link href="/contact-us" className="text-violet-soft underline">
              contact form
            </Link>
            .
          </p>
        </section>

        <CtaButton href="/#tracker" icon="arrow">
          OPEN LIGHTNING TRACKER
        </CtaButton>
      </div>
    </>
  );
}
