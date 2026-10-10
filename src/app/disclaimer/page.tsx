import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Educational disclaimer for ${SITE_NAME} body fat estimates and health guides.`,
  alternates: { canonical: `${SITE_ORIGIN}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <h1 className="mb-6 font-display text-3xl font-bold text-black">Disclaimer</h1>
      <div className="space-y-5 leading-relaxed text-black">
        <p>
          {SITE_NAME} provides educational calculators and articles about body fat percentage, the
          U.S. Navy circumference method, BMI estimates, and related charts. Nothing on this site is
          medical, dietary, or clinical advice.
        </p>
        <p>
          Estimates depend on the measurements you enter and simplified published formulas. Tape
          placement, hydration, and body proportions affect accuracy. Tools such as DEXA, Bod Pod, or
          clinician-administered tests are more precise. Always consult a qualified professional
          before making health decisions.
        </p>
        <p>
          We are not affiliated with the U.S. Navy, Department of Defense, or any clinical device
          manufacturer. Links to external resources are for convenience only.
        </p>
        <p>
          Questions:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-black hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-sm text-black">Last updated: October 11, 2026</p>
      </div>
    </div>
  );
}
