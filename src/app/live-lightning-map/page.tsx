import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import LiveLightningMapLoader from "@/components/LiveLightningMapLoader";
import { BRAND_FEATURE_4, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Live Lightning Strike Map — Near Me & Last Hour",
  description:
    "Free live lightning strike map powered by NOAA GOES East/West GLM. Check lightning near you, read strike age, toggle radar, and pair the map with flash-to-thunder distance.",
  alternates: { canonical: `${SITE_ORIGIN}/live-lightning-map` },
  openGraph: {
    title: "Live Lightning Strike Map — Near Me & Last Hour",
    description:
      "Search your area on a live lightning map: recent GOES GLM flashes, radar overlay, and clear coverage limits — free in the browser.",
    url: `${SITE_ORIGIN}/live-lightning-map`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Live lightning strike map — real-time tracker",
      },
    ],
  },
};

const faqs = [
  {
    question: "Is there lightning in my area right now?",
    answer:
      "Open the live map below, allow location or pan to your city, and watch the newest markers. If you hear thunder, shelter even when the nearest dot looks distant — maps can lag.",
  },
  {
    question: "Where was the nearest lightning strike?",
    answer:
      "Recenter on your GPS pin and compare nearby dots by age. For a flash you saw yourself, use the flash-to-thunder distance calculator for a ground-level estimate.",
  },
  {
    question: "Where can I see lightning strikes from the last 24 hours?",
    answer:
      "This hub emphasizes decision-relevant recent activity with windows up to about 60 minutes. Longer archives belong in official climate products; for “right now” risk, prefer fresh markers plus thunder.",
  },
  {
    question: "What does a lightning map show?",
    answer:
      "Reported location and time of detected flashes. On Lightning Tracker, markers are primarily NOAA GOES East/West GLM optical flash centroids — not guaranteed cloud-to-ground impact points.",
  },
  {
    question: "Is lightning radar the same as a lightning map?",
    answer:
      "No. Radar shows precipitation; a lightning map shows electrical detections. Toggle both here when available: rain structure plus where the storm is electrically active.",
  },
  {
    question: "Is it lightning or lightening?",
    answer:
      "The weather spelling is lightning. Lightening means making something lighter. Searches mix both; this page is for lightning strikes and live lightning maps.",
  },
  {
    question: "Is it thundering near me?",
    answer:
      "Audible thunder means you are close enough to be at risk. Use the map for storm motion, then stay sheltered until 30 minutes after the last thunder.",
  },
  {
    question: "Does this cover the UK, Canada, or Europe?",
    answer:
      "Americas coverage comes from NOAA GOES GLM (including much of Canada and adjacent oceans). Europe/Africa can appear when EUMETSAT MTG-LI credentials are configured. Always check the live coverage and status chips on the map.",
  },
  {
    question: "Can I use this lightning map on mobile without an app?",
    answer:
      "Yes. The live lightning map is a free browser tool — bookmark lightningtracker.net. No store install required for the map or distance calculator.",
  },
];

const readTips = [
  {
    title: "Markers are detections",
    body: "Each point is a reported flash location from satellite optics (or optional European MTG data) — not a surveyed CG impact stake. Many flashes never reach the ground.",
  },
  {
    title: "Recency matters more than count",
    body: "Choose a short time window when storms are close. A dense hour-old cluster can look scary while new activity has already shifted.",
  },
  {
    title: "Clusters show the electrical core",
    body: "Tight groups of fresh dots mark where a cell is still producing lightning. Watch the direction of new dots to judge motion.",
  },
  {
    title: "An empty map is not an all-clear",
    body: "Processing delay, zoom level, or coverage edges can hide activity. If thunder is audible, seek substantial shelter immediately.",
  },
];

const workflow = [
  {
    n: "01",
    title: "Start broad",
    body: "Pan the live lightning strike map for regional clusters powered by NOAA GOES East/West GLM across the Americas.",
  },
  {
    n: "02",
    title: "Go local (near me)",
    body: "Use Find my location / recenter, zoom to your metro, and focus on the newest markers — that answers “lightning near me.”",
  },
  {
    n: "03",
    title: "Use the right guide",
    body: "Open distance math, alerts tips, or detection science when you need more than dots — then shelter if thunder is close.",
  },
];

const intentGuides = [
  {
    href: "/#tracker",
    title: "Lightning near me",
    desc: "Homepage live map with recenter and nearby strike awareness.",
  },
  {
    href: "/lightning-distance-calculator",
    title: "Closest flash distance",
    desc: "Flash-to-thunder calculator for the bolt you just saw and heard.",
  },
  {
    href: "/lightning-alerts",
    title: "Lightning alerts",
    desc: "Radius, delay, and habits so notifications stay useful.",
  },
  {
    href: "/blog/how-lightning-trackers-work",
    title: "How detection works",
    desc: "GOES GLM, delay, and what markers can (and cannot) mean.",
  },
  {
    href: "/blog/best-lightning-tracker-apps",
    title: "Best lightning tracker apps",
    desc: "Compare maps, alerts, and data sources without hype.",
  },
  {
    href: "/blog/lightning-safety-tips",
    title: "Lightning safety tips",
    desc: "30/30 rule, shelter choices, and post-storm timing.",
  },
  {
    href: "/blog/how-far-away-is-lightning",
    title: "How far away is lightning?",
    desc: "Rule of five, sound speed, and caveats outdoors.",
  },
  {
    href: "/#map-vs-radar",
    title: "Lightning radar vs map",
    desc: "Why rain radar and strike maps answer different questions.",
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
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-violet-soft">
          Live lightning strike map hub
        </p>
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Live lightning strike map
        </h1>
        <p className="mb-8 max-w-3xl text-lg text-white/80">
          Check lightning in your area with a free real-time lightning strike map powered by{" "}
          <strong className="text-white">NOAA GOES East/West GLM</strong> satellite data. Recenter
          for lightning near you, toggle radar or heatmap, and pair recent flashes with flash-to-
          thunder distance — no app install required.
        </p>

        <div id="map" className="mb-12 scroll-mt-20">
          <LiveLightningMapLoader />
        </div>

        <section className="mb-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <h2 className="mb-2 font-display text-xl font-bold text-white sm:text-2xl">
            Find lightning in your area
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-white/70 sm:text-base">
            Search visually: pan to your state or city, or use location recenter on the map chrome.
            Save a bookmark to this page so the next storm check is one tap away.
          </p>
          <div className="flex flex-wrap gap-3">
            <CtaButton href="/#tracker" size="sm" icon="arrow">
              Open homepage map
            </CtaButton>
            <CtaButton href="/lightning-distance-calculator" size="sm" icon="arrow">
              Distance calculator
            </CtaButton>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-3 font-display text-2xl font-bold text-white">
            How to use this lightning map hub
          </h2>
          <p className="mb-6 leading-relaxed text-white/75">
            Fast path from “lightning near me” to the view that answers your storm question.
          </p>
          <ol className="grid gap-6 sm:grid-cols-3">
            {workflow.map((step) => (
              <li key={step.n} className="border-t border-violet/40 pt-4">
                <span className="font-display text-sm font-bold text-teal">{step.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_4}
              alt="Live lightning strike map showing recent NOAA GOES GLM flashes"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4 leading-relaxed text-white/80">
            <h2 className="font-display text-2xl font-bold text-white">
              Coverage: Americas now, Europe when enabled
            </h2>
            <p>
              Primary live detections come from NOAA GOES-18 (West) and GOES-19 (East) Geostationary
              Lightning Mappers — strong over the United States, Canada, Latin America, and adjacent
              oceans. When EUMETSAT MTG-LI credentials are configured, Europe and Africa optical
              flashes can join the same tracker UI.
            </p>
            <p>
              We do not publish empty country directories. If a region has no live source on this
              deployment, use your ears, official warnings, and the{" "}
              <Link href="/lightning-distance-calculator" className="text-violet-soft underline">
                distance calculator
              </Link>{" "}
              for any flash you personally observe.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="mb-3 font-display text-2xl font-bold text-white">
            How to read a lightning map
          </h2>
          <p className="mb-6 leading-relaxed text-white/75">
            What each marker means, how far back the window goes, and what a map cannot tell you.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {readTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-display text-lg font-semibold text-white">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{tip.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 leading-relaxed text-white/75">
            Detection science (ground VLF/TOA vs space optical):{" "}
            <Link href="/blog/how-lightning-trackers-work" className="text-violet-soft underline">
              how lightning trackers work
            </Link>
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-3 font-display text-2xl font-bold text-white">
            Lightning map vs weather radar
          </h2>
          <p className="mb-4 leading-relaxed text-white/80">
            Radar answers where the rain is. A lightning strike map answers where the electricity
            is. Toggle the radar overlay on the tracker when you need both — isolated updrafts can
            flash with little rain on your location, while broad squall lines show dense reflectivity
            and dense strike clusters together.
          </p>
          <p className="leading-relaxed text-white/75">
            Full comparison table:{" "}
            <Link href="/#map-vs-radar" className="text-violet-soft underline">
              lightning map vs Doppler radar
            </Link>
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-3 font-display text-2xl font-bold text-white">
            Best guides for map, near-me, and alerts intent
          </h2>
          <p className="mb-6 leading-relaxed text-white/75">
            These pages answer the highest-value search questions around lightning tracking — without
            a doorway farm of empty city URLs.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {intentGuides.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet/40"
                >
                  <span className="font-display text-lg font-semibold text-white">{g.title}</span>
                  <span className="mt-2 text-sm text-white/65">{g.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection title="Lightning map FAQ" items={faqs} />
      </div>
    </>
  );
}
