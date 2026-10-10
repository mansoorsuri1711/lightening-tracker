import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME} at ${SITE_DOMAIN}.`,
  alternates: { canonical: `${SITE_ORIGIN}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <h1 className="mb-6 font-display text-3xl font-bold text-brand">Privacy Policy</h1>
      <div className="space-y-5 leading-relaxed text-ink">
        <p>
          {SITE_NAME} ({SITE_DOMAIN}) respects your privacy. This policy explains what information we
          collect and how we use it when you visit our website or use the BMI calculator for women.
        </p>
        <h2 className="text-xl font-semibold text-brand">Information we collect</h2>
        <p>
          Calculator inputs stay in your browser session for estimates and are not stored on our
          servers as account data. If you email us or submit the contact form, we receive the details
          you choose to send (such as name, email, and message).
        </p>
        <h2 className="text-xl font-semibold text-brand">Analytics and cookies</h2>
        <p>
          We may use privacy-conscious analytics or similar technologies to understand aggregate
          traffic, popular pages, and performance. You can block cookies in your browser settings.
        </p>
        <h2 className="text-xl font-semibold text-brand">How we use information</h2>
        <p>
          Contact details are used only to respond to your message, improve the site, or address
          legal obligations. We do not sell personal information.
        </p>
        <h2 className="text-xl font-semibold text-brand">Third parties</h2>
        <p>
          Hosting, email, and analytics providers may process limited technical data as needed to
          operate the site. Those providers have their own privacy terms.
        </p>
        <h2 className="text-xl font-semibold text-brand">Contact</h2>
        <p>
          Privacy questions:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand underline hover:no-underline">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-sm text-ink/70">Last updated: October 11, 2026</p>
      </div>
    </div>
  );
}
