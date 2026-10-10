import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Educational disclaimer for ${SITE_NAME} BMI estimates and women’s health guides.`,
  alternates: { canonical: `${SITE_ORIGIN}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <h1 className="mb-6 font-display text-3xl font-bold text-brand">Disclaimer</h1>
      <div className="space-y-5 leading-relaxed text-ink">
        <p>
          {SITE_NAME} provides educational calculators and articles about body mass index (BMI),
          women’s BMI charts, healthy weight ranges, and related formulas. Nothing on this site is
          medical, dietary, or clinical advice.
        </p>
        <p>
          BMI depends on the height and weight you enter and uses simplified published formulas. It
          does not measure body fat directly. Pregnancy, high muscle mass, edema, age, and ethnicity
          guidelines can change interpretation. Always consult a qualified professional before making
          health decisions.
        </p>
        <p>
          We are not affiliated with WHO, CDC, NHLBI, or any clinical device manufacturer. Links to
          external resources are for convenience only.
        </p>
        <p>
          Questions:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand underline hover:no-underline">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-sm text-ink/70">Last updated: October 11, 2026</p>
      </div>
    </div>
  );
}
