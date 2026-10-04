import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Educational disclaimer for ${SITE_NAME} paycheck estimates and Florida tax guides.`,
  alternates: { canonical: `${SITE_ORIGIN}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <h1 className="font-display text-3xl font-bold text-white mb-6">Disclaimer</h1>
      <div className="space-y-5 text-gray-300 leading-relaxed">
        <p>
          {SITE_NAME} provides educational calculators and articles about Florida take-home pay,
          federal withholding estimates, and FICA. Nothing on this site is tax, legal, payroll, or
          financial advice.
        </p>
        <p>
          Estimates depend on assumptions you enter and simplified models of IRS brackets, standard
          deductions, and SSA rates. Actual employer withholding uses Form W-4 details, IRS
          Publication 15-T methods, benefits elections, and payroll system settings that can differ.
          Always confirm numbers with your employer and consult a qualified professional before making
          decisions.
        </p>
        <p>
          We are not affiliated with the IRS, Social Security Administration, State of Florida, ADP,
          or any employer payroll provider named in educational comparisons. Links to external
          resources are for convenience only.
        </p>
        <p>
          Questions:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-sm text-gray-500">Last updated: October 4, 2026</p>
      </div>
    </div>
  );
}
