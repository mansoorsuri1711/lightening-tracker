import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { BRAND_LOGO, CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Body Fat Calculator",
  description:
    "Learn why Body Fat Calculator exists: clear Navy-method estimates, category charts, and free tools without signup walls.",
  alternates: { canonical: `${SITE_ORIGIN}/about-us` },
  openGraph: {
    title: "About Body Fat Calculator",
    description: `Independent educational body fat tools on ${SITE_DOMAIN}.`,
    url: `${SITE_ORIGIN}/about-us`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <div className="mb-10 flex flex-col items-start gap-8 md:flex-row">
        <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border border-black/15 bg-white">
          <Image
            src={BRAND_LOGO}
            alt="Body Fat Calculator logo"
            fill
            sizes="160px"
            className="object-contain p-3"
            priority
          />
        </div>
        <div>
          <h1 className="mb-4 font-display text-3xl font-bold text-black md:text-4xl">
            About {SITE_NAME}
          </h1>
          <p className="mb-4 leading-relaxed text-black">
            {SITE_NAME} is an independent educational site at {SITE_DOMAIN}. We built a free body fat
            percentage calculator so anyone can estimate composition with the U.S. Navy method — plus
            BMI comparison and category context — without creating an account.
          </p>
          <p className="leading-relaxed text-black">
            Our guides cover Navy formulas, men&apos;s and women&apos;s ranges, visceral fat screening,
            and how to measure or calculate body fat. Everything is educational; confirm important
            health decisions with a clinician.
          </p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold text-black">What we publish</h2>
        <ul className="space-y-3 text-black">
          <li className="rounded-2xl border border-black/15 bg-white p-4">
            A working body fat calculator with imperial and metric units
          </li>
          <li className="rounded-2xl border border-black/15 bg-white p-4">
            Navy method, men/women charts, and visceral fat risk tools
          </li>
          <li className="rounded-2xl border border-black/15 bg-white p-4">
            SERP-driven articles on measuring, calculating, and ideal body fat percentage
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-display text-2xl font-bold text-black">Contact</h2>
        <p className="mb-4 leading-relaxed text-black">
          Questions or corrections:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-black hover:underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or our{" "}
          <Link href="/contact-us" className="text-black hover:underline">
            contact page
          </Link>
          .
        </p>
        <CtaButton href="/#calculator" ariaLabel="Open body fat calculator">
          TRY THE CALCULATOR
        </CtaButton>
      </section>
    </div>
  );
}
