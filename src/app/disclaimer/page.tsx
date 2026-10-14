import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Legal disclaimer for ${SITE_NAME} — educational odds tool, not a sportsbook.`,
  alternates: { canonical: `${SITE_ORIGIN}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer", href: "/disclaimer" }]} />
      <div className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
      <h1 className="mb-6 font-display text-3xl font-bold text-white">Disclaimer</h1>
      <div className="space-y-5 text-white/80 leading-relaxed">
        <p>Last updated: October 14, 2026</p>
        <p>
          {SITE_NAME} on {SITE_DOMAIN} provides educational sports betting calculators and articles.
          We are not a sportsbook, casino, or gambling operator. We do not accept wagers, hold
          balances, or pay out bets.
        </p>
        <h2 className="font-display text-xl font-semibold text-white">No guarantees</h2>
        <p>
          Calculator results use standard odds conversion and multiplication. Sportsbooks may apply
          different parlay juice, boosted odds, same-game pricing, or house rules. Always confirm
          the price on your ticket. Past examples are illustrative only.
        </p>
        <h2 className="font-display text-xl font-semibold text-white">Gambling risk</h2>
        <p>
          Sports betting involves risk of loss. Only wager what you can afford to lose. If gambling
          is a problem, seek help from a licensed support service in your region. You are
          responsible for complying with local laws and age restrictions.
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
