import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact BMI Calculator Women",
  description:
    "Contact the BMI Calculator Women team with feedback, correction requests, or partnership questions.",
  alternates: { canonical: `${SITE_ORIGIN}/contact-us` },
  openGraph: {
    title: "Contact BMI Calculator Women",
    description: "Reach the BMI Women team by form or email.",
    url: `${SITE_ORIGIN}/contact-us`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <h1 className="mb-4 font-display text-3xl font-bold text-brand md:text-4xl">Contact us</h1>
      <p className="mb-6 leading-relaxed text-ink">
        Send feedback about the calculator, request a content correction, or ask a general question.
        We typically reply within 1–2 business days. For medical advice, consult a qualified
        professional — we provide educational BMI tools only.
      </p>
      <p className="mb-8 text-ink">
        Email:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand underline hover:no-underline">
          {CONTACT_EMAIL}
        </a>
      </p>
      <ContactForm />
    </div>
  );
}
