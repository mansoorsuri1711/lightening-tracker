import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Legal disclaimer for ${SITE_NAME} — educational investment calculator, not financial advice.`,
  alternates: { canonical: `${SITE_ORIGIN}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer", href: "/disclaimer" }]} />
      <div className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <h1 className="mb-6 font-display text-3xl font-bold text-white">Disclaimer</h1>
        <div className="space-y-5 text-white/80 leading-relaxed">
          <p>Last updated: October 23, 2026</p>
          <p>
            {SITE_NAME} on {SITE_DOMAIN} provides educational investment calculators and articles.
            We are not a broker-dealer, investment adviser, or fund company. We do not open accounts,
            custody assets, or recommend specific securities.
          </p>
          <h2 className="font-display text-xl font-semibold text-white">No guarantees</h2>
          <p>
            Calculator results use simplified compounding assumptions. Actual fund returns, fees,
            taxes, timing of contributions, and market volatility will differ. Past performance does
            not guarantee future results. Figures are illustrative only.
          </p>
          <h2 className="font-display text-xl font-semibold text-white">Not investment advice</h2>
          <p>
            Nothing on this site is personalized financial, tax, or legal advice. Investing involves
            risk, including possible loss of principal. Consider your goals and consult a qualified
            professional when needed. You are responsible for complying with applicable laws.
          </p>
          <h2 className="font-display text-xl font-semibold text-white">Accuracy</h2>
          <p>
            We strive for accurate formulas and clear guides, but content may contain errors or become
            outdated. Use the site at your own risk. For questions, contact{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-soft underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
