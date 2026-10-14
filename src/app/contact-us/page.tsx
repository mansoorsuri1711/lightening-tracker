import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact Parlay Calculator",
  description:
    "Contact the Parlay Calculator team for product questions, feedback, or support on parlaycalculator.net.",
  alternates: { canonical: `${SITE_ORIGIN}/contact-us` },
  openGraph: {
    title: "Contact Parlay Calculator",
    description: `Reach the ${SITE_NAME} team.`,
    url: `${SITE_ORIGIN}/contact-us`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us", href: "/contact-us" }]} />
      <div className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">Contact us</h1>
        <p className="mb-8 text-lg text-white/80">
          Feedback on the calculator, odds formats, or guides? Send a message or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-soft underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <ContactForm />
      </div>
    </>
  );
}
