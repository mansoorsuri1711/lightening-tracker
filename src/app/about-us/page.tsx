import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { BRAND_LOGO, CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Florida Paycheck Calculator",
  description:
    "Learn why Florida Paycheck Calculator exists: clear take-home pay estimates, Florida-specific $0 state tax context, and free tools without signup walls.",
  alternates: { canonical: `${SITE_ORIGIN}/about-us` },
  openGraph: {
    title: "About Florida Paycheck Calculator",
    description: `Independent educational paycheck tools on ${SITE_DOMAIN}.`,
    url: `${SITE_ORIGIN}/about-us`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
        <div className="relative w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-secondary">
          <Image
            src={BRAND_LOGO}
            alt="Florida Paycheck Calculator logo"
            fill
            sizes="160px"
            className="object-contain p-3"
            priority
          />
        </div>
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            About {SITE_NAME}
          </h1>
          <p className="text-gray-300 leading-relaxed mb-4">
            {SITE_NAME} is an independent educational site at {SITE_DOMAIN}. We built a free Florida
            paycheck calculator so workers can estimate take-home pay after federal tax and FICA —
            with Florida&apos;s $0 state income tax shown clearly — without creating an account.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our guides explain how Florida paychecks work, pay frequency differences, FICA, and federal
            brackets. Everything is educational; always confirm with your payroll provider or a tax
            professional.
          </p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-accent mb-3">What we publish?</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="rounded-2xl border border-white/10 bg-secondary p-4">
            A working Florida take-home pay calculator for salary and hourly wages
          </li>
          <li className="rounded-2xl border border-white/10 bg-secondary p-4">
            Guides on paycheck mechanics, no state income tax, and pay schedules
          </li>
          <li className="rounded-2xl border border-white/10 bg-secondary p-4">
            SERP-driven articles on calculating take-home pay, FICA, and 2026 federal brackets
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-accent mb-3">Contact</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Questions or corrections:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or our{" "}
          <Link href="/contact-us" className="text-accent hover:underline">
            contact page
          </Link>
          .
        </p>
        <CtaButton href="/#calculator" ariaLabel="Open the Florida paycheck calculator">
          TRY THE CALCULATOR
        </CtaButton>
      </section>
    </div>
  );
}
