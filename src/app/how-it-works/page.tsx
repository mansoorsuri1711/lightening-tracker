import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_FEATURE_3, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "How Index Fund Calculator Works — Growth Math",
  description:
    "Learn how Index Fund Calculator compounds contributions, applies expected return, and subtracts expense ratios to project ending balance.",
  alternates: { canonical: `${SITE_ORIGIN}/how-it-works` },
  openGraph: {
    title: "How Index Fund Calculator Works — Growth Math",
    description: "Step-by-step: from contributions and return to projected index fund balance.",
    url: `${SITE_ORIGIN}/how-it-works`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "How Index Fund Calculator works" }],
  },
};

const faqs = [
  {
    question: "How is net return calculated?",
    answer:
      "Net annual return ≈ expected return % − expense ratio %. That net rate is converted to a monthly or yearly period rate depending on contribution frequency.",
  },
  {
    question: "When are contributions applied?",
    answer:
      "Contributions are added at the start of each period before growth is applied — a common planning default. Real-world timing varies by broker and payday.",
  },
];

const steps = [
  {
    title: "1. Enter starting balance",
    body: "Your initial investment is the principal that begins compounding immediately.",
  },
  {
    title: "2. Set contributions & frequency",
    body: "Choose monthly or yearly deposits that match how you actually invest.",
  },
  {
    title: "3. Choose years and expected return",
    body: "Pick a horizon and a planning return assumption — stress-test lower rates too.",
  },
  {
    title: "4. Subtract expense ratio",
    body: "Net rate compounds each period. Results show ending balance, growth, and fee drag.",
  },
];

export default function HowItWorksPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to project index fund growth with Index Fund Calculator",
    step: steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.body,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "How It Works", href: "/how-it-works" }]}
      />
      <div className="container mx-auto max-w-4xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          How the index fund calculator works
        </h1>
        <p className="mb-8 text-lg text-white/80">
          Index fund balances grow when contributions and market returns compound — after fees. Here
          is the math behind every projection on this site.
        </p>

        <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_3}
            alt="Illustration of compounding contributions over time in an index fund"
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        <ol className="mb-12 space-y-6">
          {steps.map((s) => (
            <li key={s.title} className="border-t border-violet/30 pt-4">
              <h2 className="font-display text-xl font-semibold text-white">{s.title}</h2>
              <p className="mt-2 text-white/75">{s.body}</p>
            </li>
          ))}
        </ol>

        <p className="mb-8 text-white/80">
          New to indexing? Read{" "}
          <Link href="/blog/what-is-an-index-fund" className="text-violet-soft underline">
            what is an index fund
          </Link>
          , then open the{" "}
          <Link href="/" className="text-violet-soft underline">
            free calculator
          </Link>
          .
        </p>

        <FaqSection title="How it works FAQs" items={faqs} />

        <div className="mt-12 text-center">
          <CtaButton href="/#calculator" ariaLabel="Open calculator">
            TRY IT NOW
          </CtaButton>
        </div>
      </div>
    </>
  );
}
