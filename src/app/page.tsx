import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import FaqSection from "@/components/FaqSection";
import LightningDistanceCalculator from "@/components/LightningDistanceCalculator";
import LiveLightningMapLoader from "@/components/LiveLightningMapLoader";
import CtaButton from "@/components/CtaButton";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import {
  BRAND_FEATURE_2,
  BRAND_FEATURE_3,
  BRAND_FEATURE_4,
  BRAND_HERO,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_RATING,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "Live Lightning Map & Tracker — Real-Time Strikes Near Me",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free live lightning map and lightning tracker: real-time NOAA GOES strikes, optional radar & heatmap, lightning near me location tools, and a flash-to-thunder distance calculator.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Live Lightning Map & Tracker — Real-Time Strikes Near Me",
    description:
      "Track live lightning maps, thunderstorm activity, and strike distance in one free browser tool — no signup.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Lightning Tracker — live lightning map and strike tracker",
      },
    ],
  },
};

const faqs = [
  {
    question: "Where is it lightning right now?",
    answer:
      "Open the live lightning map at the top of this page. Warmer or brighter dots mark newer strikes; cooler or faded dots are older. Coverage focuses on the Americas via NOAA GOES East/West GLM, with Europe/Africa when EUMETSAT MTG-LI credentials are configured.",
  },
  {
    question: "Is there lightning in my area right now?",
    answer:
      "Recenter the map on your location, zoom in, and check the newest markers. If you hear thunder, treat yourself as at risk even if the nearest dot looks far — delay and in-cloud flashes can hide the true hazard.",
  },
  {
    question: "Where was the closest lightning strike to me?",
    answer:
      "Use Find my location / recenter on the live map, then compare nearby dots by age and distance. For a flash you personally saw, use the distance calculator (flash-to-thunder seconds) for a ground-truth estimate from your ears.",
  },
  {
    question: "Can I see lightning strikes from the last 24 hours?",
    answer:
      "Lightning Tracker’s live map focuses on recent activity with selectable windows up to about 60 minutes so the view stays decision-relevant. For longer climate archives or official tallies, use NWS products; for “right now” risk, prefer the newest dots plus thunder you hear.",
  },
  {
    question: "What does a lightning map show?",
    answer:
      "Reported locations and times of detected flashes. On this site markers are primarily satellite optical flash centroids from NOAA GOES GLM — not guaranteed cloud-to-ground impact points. Many flashes are in-cloud.",
  },
  {
    question: "Is lightning radar the same as a lightning map?",
    answer:
      "No. Weather radar shows precipitation such as rain and hail. A lightning map shows electrical activity. Use both: radar for storm structure, lightning detections for where the cell is electrically active.",
  },
  {
    question: "Is it lightning or lightening?",
    answer:
      "The weather word is lightning. Lightening means making something lighter. People often search both spellings; Lightning Tracker is built for lightning strikes, lightning maps, and thunderstorm awareness.",
  },
  {
    question: "Is it thundering near me?",
    answer:
      "If you can hear thunder, a storm is close enough to be dangerous. Confirm with the live map for motion, then shelter. Maps can lag; thunder is immediate evidence.",
  },
  {
    question: "What is a lightning tracker?",
    answer:
      "A lightning tracker (or thunder tracker) shows recent lightning strikes on a map or timeline. Lightning Tracker pairs a live lightning map with a flash-to-thunder distance calculator for field estimates.",
  },
  {
    question: "How accurate are these live lightning maps?",
    answer:
      "Optical GLM detections are excellent for storm overview and motion. Publication, processing, and delivery add variable delay (often seconds to a few minutes). An empty map is not an all-clear if you hear thunder.",
  },
  {
    question: "What do the colored dots on the lightning map mean?",
    answer:
      "Color or brightness usually encodes strike age: newest discharges are warmer or brighter; older ones fade. Dense fresh clusters mark an electrically active core.",
  },
  {
    question: "What map layers can I toggle?",
    answer:
      "Basemaps (dark, satellite, light), density heatmap, precipitation radar when available, time window (up to ~60 minutes), units, and optional sound/browser alerts for nearby activity.",
  },
  {
    question: "How often do the live lightning maps refresh?",
    answer:
      "New satellite files are ingested continuously while the server runs. The browser updates over a live stream or short polling interval so fresh strikes appear without reloading the page.",
  },
  {
    question: "How do I tell how far away lightning is?",
    answer:
      "Count seconds from flash to thunder, then divide by five for miles (or by three for a rough km estimate). Our lightning distance calculator does the math and adds a plain-language risk hint.",
  },
  {
    question: "Can I use the lightning map on mobile without an app?",
    answer:
      "Yes. Lightning Tracker runs in the browser on phones and desktops — bookmark the site. No store download or account is required for the core map and calculator.",
  },
  {
    question: "Is Lightning Tracker free?",
    answer:
      "Yes. The live map, distance calculator, and guides are free — no signup wall. It is an educational weather safety aid, not an official emergency alert system.",
  },
  {
    question: "Should I rely only on a lightning app outdoors?",
    answer:
      "No. Use trackers as an extra layer of awareness, follow official warnings, seek substantial shelter when thunder is audible, and remember lightning can strike ahead of or outside the heaviest rain.",
  },
];

const toc = [
  { href: "#near-me", label: "Lightning near me" },
  { href: "#what-is-a-lightning-map", label: "What is a lightning map?" },
  { href: "#lightning-right-now", label: "Where is lightning right now?" },
  { href: "#how-to-read", label: "How to read the map" },
  { href: "#map-vs-radar", label: "Lightning map vs radar" },
  { href: "#how-detection-works", label: "How detection works" },
  { href: "#cg-vs-ic", label: "Cloud-to-ground vs in-cloud" },
  { href: "#safety-3030", label: "Safety & the 30/30 rule" },
  { href: "#flash-to-bang", label: "Calculating storm distance" },
  { href: "#faq", label: "FAQs" },
];

const capabilities = [
  {
    title: "Live lightning map",
    body: "Near-real-time strike dots from NOAA GOES GLM (Americas), with optional EUMETSAT MTG-LI when configured — storm motion you can pan and zoom.",
  },
  {
    title: "Lightning near me",
    body: "Recenter on your location, set an alert radius, and watch nearby activity while you still have time to reach solid shelter.",
  },
  {
    title: "Radar & heatmap layers",
    body: "Toggle precipitation radar and a density heatmap to see whether electrical activity sits inside a rain core or out ahead of it.",
  },
  {
    title: "Flash-to-thunder distance",
    body: "Convert seconds into miles or kilometers with risk context — the classic outdoor check, built into the same page as the map.",
  },
  {
    title: "Sound & browser alerts",
    body: "Optional chimes and notifications when strikes enter your chosen radius so you are not staring at the screen every second.",
  },
  {
    title: "Free in the browser",
    body: "No account required for the core tools. Bookmark Lightning Tracker on your phone and use it during the next thunderstorm.",
  },
];

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: SITE_NAME,
        description:
          "Free lightning tracker and live lightning map with real-time lightning strikes, distance calculator, and thunderstorm safety guides.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: "Live Lightning Map & Tracker — Real-Time Strikes Near Me",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}${BRAND_HERO}`,
          width: 1200,
          height: 630,
          ...imageObjectLicensing,
        },
      },
      {
        ...WEB_APPLICATION_JSON_LD,
        "@id": `${SITE_ORIGIN}/#software`,
        description:
          "Web lightning tracker with live lightning map, real-time lightning strike map, flash-to-thunder distance calculator, and storm alert tips.",
      },
      {
        "@type": "HowTo",
        name: "How to track lightning in three steps",
        description:
          "Locate your area on the live lightning map, monitor strikes and radar, then shelter early if thunder is close.",
        step: [
          {
            "@type": "HowToStep",
            name: "Locate your geographic area",
            text: "Allow geolocation or drop a pin, then zoom so lightning near you is visible on the map.",
          },
          {
            "@type": "HowToStep",
            name: "Monitor live lightning maps and radar",
            text: "Watch fresh strike markers and optional radar or heatmap layers for storm motion.",
          },
          {
            "@type": "HowToStep",
            name: "Assess threat and take early shelter",
            text: "If thunder is audible or flash-to-bang is short, move indoors or into a hard-top vehicle.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <section id="tracker" className="relative scroll-mt-14">
        <LiveLightningMapLoader fullBleed />
      </section>

      <section
        id="calculator"
        className="scroll-mt-14 mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:px-8"
      >
        <header className="mb-6 max-w-3xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Live Lightning Map & Tracker
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
            Track live lightning maps, thunderstorm activity, and lightning strikes near you — then
            estimate distance with the flash-to-thunder calculator below.
          </p>
        </header>

        <LightningDistanceCalculator />

        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-white/70 sm:gap-3">
          <span
            className="inline-flex items-center gap-1.5"
            aria-label={`Rated ${SITE_RATING.ratingValue} out of 5`}
          >
            <span className="font-semibold text-gold">{SITE_RATING.ratingValue}</span>
            <span className="tracking-tight text-gold" aria-hidden="true">
              ★★★★★
            </span>
            <span>({Number(SITE_RATING.ratingCount).toLocaleString()})</span>
          </span>
          <span className="text-white/40">·</span>
          <span>Free</span>
          <span className="text-white/40">·</span>
          <span>Web</span>
          <span className="text-white/40">·</span>
          <span>Live lightning map</span>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Lightning map + tracker built for fast decisions
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-white/80">
              When a thunderstorm starts, you need distance and direction — not a wall of weather
              jargon. <strong className="text-white">Lightning Tracker</strong> puts a live
              lightning map and a flash-to-bang distance calculator in one place so campers,
              drivers, photographers, and families can see lightning strikes near them and react
              sooner.
            </p>
            <p className="mb-4 leading-relaxed text-white/75">
              People search “lightning map,” “lightning maps,” “live lightning map,” and “thunder
              map” for the same reason: they want live strike dots, not just rain on radar. Dense
              global maps help, but they rarely explain how far a bolt is from <em>you</em>. This
              free lightning tracker fills that gap.
            </p>
            <p className="leading-relaxed text-white/75">
              Jump to the{" "}
              <Link href="/#tracker" className="text-violet-soft underline">
                live map
              </Link>
              ,{" "}
              <Link href="/#calculator" className="text-violet-soft underline">
                distance calculator
              </Link>
              , or the{" "}
              <Link href="/live-lightning-map" className="text-violet-soft underline">
                live lightning map guide
              </Link>
              .
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_HERO}
              alt="Live lightning map showing real-time lightning strikes and thunderstorm activity"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover"
              priority
            />
          </div>
        </section>

        <nav
          aria-label="On this page"
          className="mb-16 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <h2 className="mb-3 font-display text-lg font-semibold text-white">On this page</h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {toc.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-violet-soft underline-offset-2 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="near-me" className="mb-16 scroll-mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Find lightning near me (fast path)
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-white/80">
            Most “lightning near me” and “closest lightning strike” searches want the same three
            moves — from broad storm view to your street, then a shelter decision.
          </p>
          <ol className="mb-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Start broad",
                d: "Open the live lightning map and scan for active clusters in your region (Americas via NOAA GOES East/West GLM).",
              },
              {
                n: "02",
                t: "Go local",
                d: "Tap Find my location / recenter, zoom in, and watch only the newest markers — age matters more than total count.",
              },
              {
                n: "03",
                t: "Confirm with thunder",
                d: "If you hear thunder or flash-to-bang is short, shelter now. Use the distance calculator for the flash you just saw.",
              },
            ].map((step) => (
              <li key={step.n} className="border-t border-violet/40 pt-4">
                <span className="font-display text-sm font-bold text-teal">{step.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.d}</p>
              </li>
            ))}
          </ol>
          <p className="leading-relaxed text-white/75">
            Prefer a dedicated map page? Open the{" "}
            <Link href="/live-lightning-map" className="text-violet-soft underline">
              live lightning strike map hub
            </Link>
            .
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-3 font-display text-2xl font-bold text-white md:text-3xl">
            What you get with Lightning Tracker
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-white/75">
            Practical storm intelligence in the browser: live lightning maps, layers you can toggle,
            and distance math when you see the flash yourself.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="map-vs-radar" className="mb-16 scroll-mt-14">
          <h2 className="mb-3 font-display text-2xl font-bold text-white md:text-3xl">
            Lightning map vs traditional weather radar
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-white/75">
            Radar answers “where is the rain?” A lightning map answers “where is the electricity?”
            Use both when you can — especially ahead of outdoor plans.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm text-white/80">
              <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-white/55">
                <tr>
                  <th className="px-4 py-3 font-semibold">Capability</th>
                  <th className="px-4 py-3 font-semibold">Lightning map</th>
                  <th className="px-4 py-3 font-semibold">Doppler radar</th>
                  <th className="px-4 py-3 font-semibold">Many weather apps</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["What it shows", "Electrical discharges", "Precipitation", "Often rain + alerts"],
                  ["Typical refresh", "Seconds to a few minutes", "Often 5–10+ minutes", "Varies widely"],
                  ["In-cloud activity", "Yes (optical GLM/MTG)", "No (rain only)", "Limited"],
                  ["Ocean / remote coverage", "Strong via satellites", "Limited by radar sites", "Depends on product"],
                  ["Best paired with", "Radar + your ears", "Lightning map", "Official warnings"],
                  ["On this site", "Free live map + distance tool", "Optional radar overlay", "—"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-white/10">
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        className={`px-4 py-3 ${i === 0 ? "font-medium text-white" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="what-is-a-lightning-map" className="mb-16 scroll-mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            What is a real-time lightning map?
          </h2>
          <div className="space-y-4 leading-relaxed text-white/80">
            <p>
              A <strong className="text-white">lightning map</strong> (also called live lightning
              maps or a lightning strike map) plots atmospheric electrical discharges as they are
              detected. Unlike a static radar frame that may refresh every several minutes, a modern{" "}
              <strong className="text-white">live lightning map</strong> updates as new optical or
              radio detections arrive — so you can see thunderstorms intensify before heavy rain
              reaches your location.
            </p>
            <p>
              Pair interactive lightning maps with a{" "}
              <Link href="/#calculator" className="text-violet-soft underline">
                distance calculator
              </Link>{" "}
              and{" "}
              <Link href="/lightning-alerts" className="text-violet-soft underline">
                alert habits
              </Link>{" "}
              so the dots become decisions for outdoor workers, drivers, pilots-in-training
              (awareness only), and families watching a cell approach.
            </p>
          </div>
        </section>

        <section id="lightning-right-now" className="mb-16 scroll-mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Where is it lightning right now?
          </h2>
          <p className="mb-6 leading-relaxed text-white/80">
            Roughly thousands of thunderstorms are active worldwide at any moment. If you are asking
            “where is it lightning right now?”, use the{" "}
            <Link href="/#tracker" className="text-violet-soft underline">
              live map above
            </Link>{" "}
            and focus on these regions:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Americas & Atlantic",
                d: "NOAA GOES-18 (West) and GOES-19 (East) Geostationary Lightning Mappers track optical flashes from Canada through the U.S., Caribbean, and South America.",
              },
              {
                t: "Europe, Africa & nearby seas",
                d: "When EUMETSAT MTG-LI credentials are enabled, Europe and Africa optical lightning can appear alongside GLM for broader storm context.",
              },
              {
                t: "Lightning near you",
                d: "Recenter the map on your GPS pin, zoom in, and use the distance calculator if you see a flash and hear thunder — that is your local risk check.",
              },
            ].map((card) => (
              <div key={card.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-lg font-semibold text-white">{card.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{card.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Why satellite lightning maps beat legacy-only detectors
          </h2>
          <ol className="grid gap-6 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Free & uncluttered",
                d: "Lightning Tracker keeps the focus on the map and calculator — no signup wall for core tools, built for quick storm checks on mobile.",
              },
              {
                n: "02",
                t: "Space-based optical view",
                d: "Geostationary sensors see flashes over oceans and remote terrain where sparse ground radio networks struggle.",
              },
              {
                n: "03",
                t: "Radar when you need rain",
                d: "Toggle a radar overlay with strike dots to separate isolated updrafts from broad convective lines.",
              },
            ].map((s) => (
              <li key={s.n} className="border-t border-violet/40 pt-4">
                <span className="font-display text-sm font-bold text-teal">{s.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="how-detection-works" className="mb-16 scroll-mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            How lightning detection works: satellites, TOA & VLF
          </h2>
          <div className="space-y-4 leading-relaxed text-white/80">
            <p>
              Every flash can emit bright optical pulses (seen from geostationary orbit) and radio
              energy called a <em>sferic</em>. Ground networks often listen in the Very Low Frequency
              (VLF) band. Because those waves travel long distances, multiple receivers can
              timestamp the same pulse.
            </p>
            <h3 className="font-display text-xl font-semibold text-white">
              Time of arrival (TOA) in plain language
            </h3>
            <p>
              If station A hears a sferic slightly before station B, the lightning is closer to A
              along a hyperbolic locus. Combine enough station pairs and you get a location. Modern
              consumer lightning maps blend that idea with orbital optical products (NOAA GOES GLM
              and EUMETSAT MTG-LI) for continuous continental and ocean coverage. Deeper detail:{" "}
              <Link href="/blog/how-lightning-trackers-work" className="text-violet-soft underline">
                how lightning trackers work
              </Link>
              .
            </p>
          </div>
        </section>

        <section id="how-to-read" className="mb-16 scroll-mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            How to read a lightning strike map
          </h2>
          <p className="mb-6 leading-relaxed text-white/80">
            What each marker means, how far back the window goes, and what a map cannot tell you —
            the same questions people ask after opening Blitzortung-style or GOES-powered maps.
          </p>
          <ul className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Markers = detections",
                d: "Each dot is a reported flash location (often a satellite optical centroid), not a surveyed cloud-to-ground impact stake in the dirt.",
              },
              {
                t: "Recency over count",
                d: "Our live window focuses on recent minutes (up to ~60). A cluster from an hour ago is history; one from five minutes ago is a decision.",
              },
              {
                t: "Density = active core",
                d: "Tight fresh clusters show where a cell is electrically active. Watch which way new dots appear to judge motion toward or away from you.",
              },
              {
                t: "Empty ≠ all-clear",
                d: "Delay, zoom, coverage edges, or in-cloud activity can hide risk. If you hear thunder, shelter immediately even with no nearby marker.",
              },
            ].map((item) => (
              <li key={item.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-lg font-semibold text-white">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.d}</p>
              </li>
            ))}
          </ul>
          <p className="leading-relaxed text-white/75">
            Toggle radar when you need rain structure; keep the lightning layer for electrical
            activity. More detail on the{" "}
            <Link href="/live-lightning-map" className="text-violet-soft underline">
              live lightning map hub
            </Link>
            .
          </p>
        </section>

        <section id="cg-vs-ic" className="mb-16 scroll-mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Cloud-to-ground vs in-cloud lightning
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-display text-lg font-semibold text-white">Cloud-to-ground (CG)</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                The discharge connects cloud charge to the ground, trees, or structures — the hazard
                people usually fear outdoors. Positive CG flashes are rarer but can carry very high
                peak current and start fires.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-display text-lg font-semibold text-white">In-cloud (IC / CC)</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Most lightning never reaches the ground. Optical satellite maps often include strong
                in-cloud activity. A sudden jump in flash rate can precede severe hail or tornadoes
                — another reason to shelter early, not wait for a visible bolt to ground.
              </p>
            </div>
          </div>
        </section>

        <section id="safety-3030" className="mb-16 scroll-mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Lightning safety & the 30/30 rule
          </h2>
          <p className="mb-6 leading-relaxed text-white/80">
            Lightning remains a leading weather-related killer. NOAA-aligned guidance popularized
            the <strong className="text-white">30/30 rule</strong> as a memorable outdoor checklist
            — maps support it; they do not replace it.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-violet/30 bg-brand-soft/50 p-5">
              <h3 className="font-display text-lg font-semibold text-white">30 seconds</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                See flash, count until thunder. If the gap is 30 seconds or less, the storm is
                roughly within 10 km / 6 miles. Seek a substantial building or hard-top vehicle now.
              </p>
            </div>
            <div className="rounded-xl border border-violet/30 bg-brand-soft/50 p-5">
              <h3 className="font-display text-lg font-semibold text-white">30 minutes</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Wait at least 30 minutes after the last thunder (or last nearby flash on the live
                map) before returning outdoors. Many injuries happen after people think the storm
                has “passed.”
              </p>
            </div>
          </div>
          <p className="mt-6 leading-relaxed text-white/75">
            More habits that matter:{" "}
            <Link href="/blog/lightning-safety-tips" className="text-violet-soft underline">
              lightning safety tips
            </Link>
            .
          </p>
        </section>

        <section id="flash-to-bang" className="mb-16 scroll-mt-14">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            How to calculate storm distance (flash-to-bang)
          </h2>
          <div className="space-y-4 leading-relaxed text-white/80">
            <p>
              Light arrives almost instantly; sound in air is roughly 343 m/s (~1,125 ft/s). That
              gap is a free rangefinder:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-white/75">
              <li>
                <strong className="text-white">Miles ≈ seconds ÷ 5</strong> (rule of five)
              </li>
              <li>
                <strong className="text-white">Kilometers ≈ seconds ÷ 3</strong> (rough guide)
              </li>
            </ul>
            <p>
              Example: 15 seconds between flash and thunder ≈ 3 miles or about 5 km. Prefer
              automatic math? Use the{" "}
              <Link href="/#calculator" className="text-violet-soft underline">
                lightning distance calculator
              </Link>{" "}
              above, or read{" "}
              <Link href="/blog/how-far-away-is-lightning" className="text-violet-soft underline">
                how far away is lightning
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-16 grid gap-6 md:grid-cols-3">
          {[
            {
              href: "/lightning-distance-calculator",
              title: "Lightning distance calculator",
              body: "Convert flash-to-thunder seconds into miles or kilometers with risk context.",
              image: BRAND_FEATURE_3,
              alt: "Lightning Tracker distance tool interface",
            },
            {
              href: "/live-lightning-map",
              title: "Live lightning map",
              body: "Full guide to strike age colors, delay, zoom, and lightning near me habits.",
              image: BRAND_FEATURE_4,
              alt: "Live lightning map and lightning strike map for thunderstorm tracking",
            },
            {
              href: "/lightning-alerts",
              title: "Lightning alerts",
              body: "Radius, delay, and false-alarm tips so notifications stay useful.",
              image: BRAND_FEATURE_2,
              alt: "Lightning Tracker alerts on a mobile-style screen",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-violet/50"
            >
              <div className="relative aspect-video">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-white group-hover:text-violet-soft">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{card.body}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative order-2 aspect-video overflow-hidden rounded-2xl border border-white/10 md:order-1">
            <Image
              src={BRAND_FEATURE_2}
              alt="Lightning Tracker view for monitoring nearby thunderstorms"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Why lightning awareness matters
            </h2>
            <p className="mb-4 leading-relaxed text-white/80">
              Lightning can strike more than 10 miles from heavy rain. If you can hear thunder, you
              are close enough to be at risk. A good lightning tracker does not replace official
              warnings — it helps you leave exposed ridges, fields, and open water sooner.
            </p>
            <CtaButton href="/#calculator" icon="arrow" ariaLabel="Open the lightning distance calculator">
              OPEN CALCULATOR
            </CtaButton>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Guides for map, near-me, radar & alerts intent
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-white/75">
            SERP favorites — lightning near me, last-hour strike checks, radar vs map, distance, and
            safety — covered here without thin doorway pages for every city. Maps show recent
            detections; use National Weather Service forecasts and outlooks before storms develop.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              {
                href: "/live-lightning-map",
                title: "Live lightning strike map hub",
                desc: "Near-me workflow, coverage limits, and how to read markers.",
              },
              {
                href: "/blog/best-lightning-tracker-apps",
                title: "Best lightning tracker apps & maps",
                desc: "What to look for beyond star ratings.",
              },
              {
                href: "/blog/how-lightning-trackers-work",
                title: "How lightning trackers work",
                desc: "GOES GLM, delay, and accuracy limits.",
              },
              {
                href: "/blog/how-far-away-is-lightning",
                title: "How far away is lightning?",
                desc: "Flash-to-bang math made practical.",
              },
              {
                href: "/blog/lightning-safety-tips",
                title: "Lightning safety tips",
                desc: "30/30 rule and shelter habits that still save lives.",
              },
              {
                href: "/lightning-alerts",
                title: "Lightning alerts near me",
                desc: "Radius and delay tips vs official warnings.",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet/40"
                >
                  <span className="font-display text-lg font-semibold text-white">{item.title}</span>
                  <span className="mt-2 text-sm text-white/65">{item.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection title="Live lightning map FAQs" items={faqs} includeSchema={false} />
      </div>
    </>
  );
}
