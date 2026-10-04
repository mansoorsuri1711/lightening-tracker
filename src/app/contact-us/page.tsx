import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact Florida Paycheck Calculator",
  description:
    "Contact the Florida Paycheck Calculator team with feedback, correction requests, or partnership questions.",
  alternates: { canonical: `${SITE_ORIGIN}/contact-us` },
  openGraph: {
    title: "Contact Florida Paycheck Calculator",
    description: "Reach the FL Paycheck Calc team by form or email.",
    url: `${SITE_ORIGIN}/contact-us`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Contact us</h1>
      <p className="text-gray-300 leading-relaxed mb-6">
        Send feedback about the calculator, request a content correction, or ask a general question.
        We typically reply within 1–2 business days. For employer payroll or personal tax advice,
        contact your payroll provider or a licensed professional — we provide educational tools only.
      </p>
      <p className="text-gray-300 mb-8">
        Email:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
          {CONTACT_EMAIL}
        </a>
      </p>
      <ContactForm />
    </div>
  );
}
