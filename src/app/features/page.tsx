import Image from "next/image";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import {
  BRAND_FEATURE_2,
  BRAND_FEATURE_4,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Lightning Tracker Features — Live Map, Distance & Alerts",
  description:
    "Lightning Tracker features: live lightning map, lightning strike map view, distance calculator, thunder tracking tips, and free storm safety guides.",
  alternates: { canonical: `${SITE_ORIGIN}/features` },
  openGraph: {
    title: "Lightning Tracker Features — Live Map, Distance & Alerts",
    description: "Live lightning map, real-time strikes, distance calculator, and thunderstorm guides.",
    url: `${SITE_ORIGIN}/features`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Lightning Tracker features" }],
  },
};

const faqs = [
  {
    question: "Is Lightning Tracker a mobile app download?",
    answer:
      "Lightning Tracker is a fast web experience on lightningtracker.net. You can bookmark it on phones and desktops. Our guides also explain how popular lightning apps and maps fit into a full awareness workflow.",
  },
  {
    question: "What tools are included?",
    answer:
      "A live lightning strike map (NOAA GOES GLM for the Americas), flash-to-thunder distance calculator, lightning alerts guide, how-it-works walkthrough, and SERP-backed safety articles.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. Core tools run in the browser without signing up.",
  },
];

const features = [
  {
    title: "Live lightning map",
    body: "Watch near-real-time strikes on an interactive map — storm motion, nearby activity, and age-colored dots in one view.",
  },
  {
    title: "Flash-to-thunder distance",
    body: "Convert seconds into miles or kilometers with clear risk hints — the classic outdoor check, done properly.",
  },
  {
    title: "Map reading tips",
    body: "Learn strike age colors, zoom strategy, and detection delay so map dots become decisions.",
  },
  {
    title: "Alert configuration tips",
    body: "Choose radii and habits that reduce false alarm fatigue while still giving early notice.",
  },
  {
    title: "Safety-first content",
    body: "Guides aligned with common NWS/CDC outdoor lightning advice — shelter first, gadgets second.",
  },
  {
    title: "SERP-backed blog",
    body: "Only topics people search: best trackers, how detection works, distance, and safety.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Features", href: "/features" }]} />
      <div className="container mx-auto max-w-5xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Lightning Tracker features
        </h1>
        <p className="mb-10 max-w-3xl text-lg text-white/80">
          Everything on lightningtracker.net is built around one job: open a live lightning map,
          see lightning strikes near you, estimate how far a bolt is, and act sooner in a
          thunderstorm.
        </p>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="font-display text-lg font-semibold text-white">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_4}
              alt="Lightning Tracker feature overview with storm map style visual"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_2}
              alt="Lightning Tracker alerts and monitoring feature visual"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mb-12">
          <CtaButton href="/#tracker" icon="arrow" ariaLabel="Open Lightning Tracker">
            TRY THE TRACKER
          </CtaButton>
        </div>

        <FaqSection title="Features FAQs" items={faqs} />
      </div>
    </>
  );
}
