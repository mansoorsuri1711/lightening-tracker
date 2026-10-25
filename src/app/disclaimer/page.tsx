import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Legal disclaimer for ${SITE_NAME} — educational weather awareness tools, not official emergency alerts.`,
  alternates: { canonical: `${SITE_ORIGIN}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer", href: "/disclaimer" }]} />
      <div className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <h1 className="mb-6 font-display text-3xl font-bold text-white">Disclaimer</h1>
        <div className="space-y-5 text-white/80 leading-relaxed">
          <p>Last updated: October 25, 2026</p>
          <p>
            {SITE_NAME} on {SITE_DOMAIN} provides educational lightning awareness tools and articles.
            We are not a meteorological agency, emergency service, or official warning provider. We
            do not issue watches, warnings, or evacuation orders.
          </p>
          <h2 className="font-display text-xl font-semibold text-white">No guarantees</h2>
          <p>
            Distance estimates use simplified sound-speed assumptions. The live lightning map and related guidance describe
            how public trackers typically work; actual third-party maps may differ in delay,
            coverage, and accuracy. Always verify with local conditions and official sources.
          </p>
          <h2 className="font-display text-xl font-semibold text-white">Not emergency advice</h2>
          <p>
            Nothing on this site replaces National Weather Service (or equivalent) alerts, local
            emergency instructions, or common-sense shelter decisions. Lightning can injure or kill.
            Seek substantial shelter when thunder is audible.
          </p>
          <h2 className="font-display text-xl font-semibold text-white">Accuracy</h2>
          <p>
            We strive for clear, accurate educational content, but pages may contain errors or become
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
