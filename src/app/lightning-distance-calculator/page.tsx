import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import LightningDistanceCalculator from "@/components/LightningDistanceCalculator";
import CtaButton from "@/components/CtaButton";
import { BRAND_FEATURE_3, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Lightning Distance Calculator — Flash to Thunder",
  description:
    "Free lightning distance calculator: count seconds from flash to thunder and estimate miles or kilometers instantly.",
  alternates: { canonical: `${SITE_ORIGIN}/lightning-distance-calculator` },
  openGraph: {
    title: "Lightning Distance Calculator — Flash to Thunder",
    description: "Estimate how far lightning is with a simple flash-to-bang timer.",
    url: `${SITE_ORIGIN}/lightning-distance-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Lightning distance calculator" }],
  },
};

const faqs = [
  {
    question: "How accurate is the lightning distance calculator?",
    answer:
      "It uses the speed of sound (~343 m/s). Temperature, wind, terrain, and which flash you matched to which thunder all affect real-world accuracy. Treat results as estimates for safety decisions, not survey-grade ranging.",
  },
  {
    question: "What is the rule of five for lightning?",
    answer:
      "Divide the seconds between flash and thunder by five to get an approximate distance in miles. Our calculator also shows kilometers and a plain-language risk hint.",
  },
  {
    question: "Can lightning strike farther than I can hear thunder?",
    answer:
      "Yes. Under some conditions thunder may not travel as far as the flash is visible. If a live lightning map shows nearby strikes — or skies look threatening — seek shelter even if thunder is faint.",
  },
];

export default function LightningDistancePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Distance Calculator", href: "/lightning-distance-calculator" },
        ]}
      />
      <div className="container mx-auto max-w-5xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Lightning distance calculator
        </h1>
        <p className="mb-8 max-w-3xl text-lg text-white/80">
          See a flash, count until thunder, and estimate how far the strike was — the classic outdoor
          check, upgraded with miles, kilometers, and risk context from Lightning Tracker.
        </p>

        <LightningDistanceCalculator className="mb-12" />

        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4 text-white/80 leading-relaxed">
            <h2 className="font-display text-2xl font-bold text-white">Why flash-to-bang works</h2>
            <p>
              Light from a strike reaches you almost instantly. Sound is slower, so the gap between
              flash and thunder grows with distance. That is why searches for{" "}
              <strong className="text-white">how far away is lightning</strong> and lightning
              distance calculators stay popular every storm season.
            </p>
            <p>
              Pair this tool with a{" "}
              <Link href="/live-lightning-map" className="text-violet-soft underline">
                live lightning map
              </Link>{" "}
              when you need direction of travel, and read{" "}
              <Link href="/blog/how-far-away-is-lightning" className="text-violet-soft underline">
                our full distance guide
              </Link>{" "}
              for examples and caveats.
            </p>
            <CtaButton href="/lightning-alerts" size="sm" icon="arrow">
              Lightning alerts tips
            </CtaButton>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_3}
              alt="Lightning Tracker tool used to estimate strike distance from flash to thunder"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <FaqSection title="Distance calculator FAQs" items={faqs} />
      </div>
    </>
  );
}
