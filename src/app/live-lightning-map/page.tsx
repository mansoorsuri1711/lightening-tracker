import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import LiveLightningMapLoader from "@/components/LiveLightningMapLoader";
import { BRAND_FEATURE_4, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Live Lightning Map — Real-Time Lightning Strike Map",
  description:
    "Free live lightning map and real-time lightning strike map (NOAA GOES GLM). Watch lightning strikes near you, compare with thunder, and pair the map with distance estimates.",
  alternates: { canonical: `${SITE_ORIGIN}/live-lightning-map` },
  openGraph: {
    title: "Live Lightning Map — Real-Time Lightning Strike Map",
    description:
      "Watch a live lightning map with real-time strikes. Thunder map style tracking for thunderstorm awareness — free on Lightning Tracker.",
    url: `${SITE_ORIGIN}/live-lightning-map`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Live lightning map — real-time strike tracker" }],
  },
};

const faqs = [
  {
    question: "What is a live lightning map?",
    answer:
      "A live lightning map (also called a lightning strike map or real time lightning map) plots recent lightning detections on a map. Newer strikes usually appear brighter or in a different color so you can see how a thunderstorm is moving.",
  },
  {
    question: "Is this the same as lightning radar or a thunder map?",
    answer:
      "People often search “lightning radar,” “thunder map,” or “thunder tracker” when they want strike dots. Classic weather radar shows rain; our lightning maps show electrical activity that may reach beyond the heaviest precip core.",
  },
  {
    question: "Can I check lightning strikes near me?",
    answer:
      "Yes. Use the live map below, zoom to your area, and watch for new lightning strikes near you. If thunder is loud but dots look distant, trust your ears and shelter — map delay or another cell may explain the gap.",
  },
  {
    question: "Why do strikes appear a minute or two late?",
    answer:
      "Networks need time to detect, locate, and deliver data. Consumer lightning maps often lag by seconds to a few minutes. Treat “live” as near-real-time awareness, not a stopwatch for each bolt.",
  },
  {
    question: "Does this cover the UK lightning map or Europe?",
    answer:
      "This tool’s live layer uses NOAA GOES GLM coverage over the Americas. Searches like “UK lightning map” usually need a Europe-focused network; use our distance calculator and safety guides anywhere you hear thunder.",
  },
];

const tips = [
  {
    title: "Watch strike age, not just density",
    body: "A busy cluster of old lightning strikes can look scary while new activity has already shifted. Prefer lightning maps that encode time with color or fade.",
  },
  {
    title: "Zoom for lightning strikes near you",
    body: "Local zoom shows nearby risk on the lightning strike map. Regional zoom shows whether cells are organizing into a line that may reach you later.",
  },
  {
    title: "Compare with thunder you hear",
    body: "If the thunder map view shows distant strikes but thunder is loud, trust your ears and shelter. Map delay or a different cell may explain the mismatch.",
  },
  {
    title: "Combine with distance math",
    body: "When you see a flash, use the Lightning Tracker distance calculator while the live lightning map shows where the broader storm is headed.",
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
          Live lightning map
        </h1>
        <p className="mb-8 max-w-3xl text-lg text-white/80">
          Free live lightning map and real-time lightning strike map from Lightning Tracker (NOAA
          GOES GLM for the Americas). Watch lightning strikes as they update, check activity near
          you, then read how age colours, delay, and zoom keep a thunder-map view useful during a
          thunderstorm.
        </p>

        <div id="map" className="mb-12 scroll-mt-20">
          <LiveLightningMapLoader />
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_4}
              alt="Live lightning map and lightning strike map used in Lightning Tracker"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4 leading-relaxed text-white/80">
            <h2 className="font-display text-2xl font-bold text-white">
              Lightning maps vs radar
            </h2>
            <p>
              Searches for lightning map, lightning maps, lightning radar, and thunder tracker all
              point at the same need: see where lightning strikes are firing. Our live layer plots
              optical detections from NOAA’s GOES GLM satellites — each point is a located
              discharge, with newer bolts usually warmer or brighter than older ones.
            </p>
            <p>
              Pair the map with{" "}
              <Link href="/lightning-distance-calculator" className="text-violet-soft underline">
                distance estimates
              </Link>{" "}
              when you hear thunder, and use{" "}
              <Link href="/lightning-alerts" className="text-violet-soft underline">
                alert tips
              </Link>{" "}
              so the dots turn into decisions — not just decoration.
            </p>
            <CtaButton href="/#calculator" size="sm" icon="arrow">
              Open calculator
            </CtaButton>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="mb-6 font-display text-2xl font-bold text-white">
            How to read a real-time lightning map
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

        <FaqSection title="Live lightning map FAQs" items={faqs} />
      </div>
    </>
  );
}
