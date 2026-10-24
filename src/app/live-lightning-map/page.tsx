import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import LiveLightningMapLoader from "@/components/LiveLightningMapLoader";
import { BRAND_FEATURE_4, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Live Lightning Map — How to Read Strike Activity",
  description:
    "Learn how a live lightning map works: strike age colors, detection delay, zoom levels, and how to pair maps with distance estimates.",
  alternates: { canonical: `${SITE_ORIGIN}/live-lightning-map` },
  openGraph: {
    title: "Live Lightning Map — How to Read Strike Activity",
    description: "Practical guide to reading real-time lightning maps during thunderstorms.",
    url: `${SITE_ORIGIN}/live-lightning-map`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Live lightning map guide" }],
  },
};

const faqs = [
  {
    question: "What is a live lightning map?",
    answer:
      "It is a map that plots recent lightning detections from a sensor network. Newer strikes usually appear brighter or in a different color than older ones so you can see how a storm is moving.",
  },
  {
    question: "Why do strikes appear a minute or two late?",
    answer:
      "Networks need time to detect, locate, and deliver data. Consumer maps often lag by seconds to a few minutes. Treat “live” as near-real-time awareness, not a stopwatch for each bolt.",
  },
  {
    question: "Should I use a lightning map instead of radar?",
    answer:
      "Use both when you can. Radar shows rain; lightning maps show electrical activity that may extend beyond the heaviest precip core.",
  },
];

const tips = [
  {
    title: "Watch strike age, not just density",
    body: "A busy cluster of old strikes can look scary while new activity has already shifted. Prefer maps that encode time with color or fade.",
  },
  {
    title: "Zoom to your route, then zoom out",
    body: "Local zoom shows nearby risk. Regional zoom shows whether cells are organizing into a line that may reach you later.",
  },
  {
    title: "Compare with thunder you hear",
    body: "If the map shows distant strikes but thunder is loud, trust your ears and shelter. Map delay or a different cell may explain the mismatch.",
  },
  {
    title: "Combine with distance math",
    body: "When you see a flash, use the Lightning Tracker distance calculator while the map shows where the broader storm is headed.",
  },
];

export default function LiveLightningMapPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Live Lightning Map", href: "/live-lightning-map" },
        ]}
      />
      <div className="container mx-auto max-w-5xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Live lightning map guide
        </h1>
        <p className="mb-8 max-w-3xl text-lg text-white/80">
          Real-time lightning maps dominate search for a reason — they show where storms are firing.
          Use the live map below (NOAA GOES GLM for the Americas), then read how age colours, delay,
          and zoom work so the dots stay useful.
        </p>

        <div id="map" className="mb-12 scroll-mt-20">
          <LiveLightningMapLoader />
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_4}
              alt="Live lightning map style overview used in Lightning Tracker guides"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4 leading-relaxed text-white/80">
            <h2 className="font-display text-2xl font-bold text-white">What you are looking at</h2>
            <p>
              Most public live lightning maps plot detections from networks similar to those behind
              LightningMaps.org, Blitzortung-style stations, or commercial weather providers. Each
              point is a located discharge — cloud-to-ground or in-cloud depending on the product.
            </p>
            <p>
              Lightning Tracker explains how to use those maps alongside{" "}
              <Link href="/lightning-distance-calculator" className="text-violet-soft underline">
                distance estimates
              </Link>{" "}
              and{" "}
              <Link href="/lightning-alerts" className="text-violet-soft underline">
                alert settings
              </Link>
              , so the dots turn into decisions.
            </p>
            <CtaButton href="/#tracker" size="sm" icon="arrow">
              Open tracker tools
            </CtaButton>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-white">
            Practical reading tips
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-display text-lg font-semibold text-white">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mb-10 leading-relaxed text-white/75">
          Want the detection science? Read{" "}
          <Link href="/blog/how-lightning-trackers-work" className="text-violet-soft underline">
            how lightning trackers work
          </Link>
          . Comparing apps? See our{" "}
          <Link href="/blog/best-lightning-tracker-apps" className="text-violet-soft underline">
            best lightning tracker apps
          </Link>{" "}
          checklist.
        </p>

        <FaqSection title="Live map FAQs" items={faqs} />
      </div>
    </>
  );
}
