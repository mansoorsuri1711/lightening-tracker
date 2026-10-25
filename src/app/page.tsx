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
    default: "Lightning Tracker — Live Lightning Map & Strike Distance",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free lightning tracker and live lightning map: watch real-time lightning strikes near you, use a lightning strike map view, and estimate distance from flash to thunder.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Lightning Tracker — Live Lightning Map & Strike Distance",
    description:
      "Track thunderstorms with a live lightning map, real-time strike dots, and a flash-to-thunder distance calculator.",
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
    question: "What is a lightning tracker?",
    answer:
      "A lightning tracker (also called a thunder tracker) shows recent lightning strikes on a map or timeline so you can see where thunderstorms are active. Lightning Tracker includes a live lightning map for the Americas (NOAA GOES GLM) plus a flash-to-thunder distance calculator.",
  },
  {
    question: "How does a live lightning map work?",
    answer:
      "A live lightning map — sometimes searched as a lightning strike map or real time lightning map — plots detections from optical or radio networks. Points update within seconds to a few minutes so you can see storm motion, not just rain on radar.",
  },
  {
    question: "Can I see lightning strikes near me?",
    answer:
      "Yes. Open the homepage lightning map, allow location if prompted, and zoom to your area to check lightning strikes near you. Pair nearby dots with the distance calculator when you hear thunder.",
  },
  {
    question: "How do I tell how far away lightning is?",
    answer:
      "Count the seconds between the flash and the thunder, then divide by five for a rough distance in miles (or use our lightning distance calculator for kilometers and risk context). Sound travels slower than light, so the gap grows with distance.",
  },
  {
    question: "Is a lightning map the same as lightning radar?",
    answer:
      "Not exactly. Weather radar shows precipitation; a lightning map (or thunder map) shows electrical discharges. People often say “lightning radar” when they mean a live strike map. Use both when a thunderstorm is nearby.",
  },
  {
    question: "Is Lightning Tracker free?",
    answer:
      "Yes. The lightning maps, tracker tools, and guides on lightningtracker.net are free in your browser — no account required. It is an educational weather safety aid, not an official emergency alert system.",
  },
  {
    question: "Should I rely only on a lightning app outdoors?",
    answer:
      "No. Use trackers as an extra layer of awareness, but follow National Weather Service warnings, seek substantial shelter when thunder is audible, and remember lightning can strike ahead of or outside the heaviest rain.",
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
        name: "Lightning Tracker — Live Lightning Map & Strike Distance",
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
        name: "How to use Lightning Tracker during a storm",
        description:
          "Watch the live lightning map, estimate strike distance with flash-to-thunder timing, and shelter when needed.",
        step: [
          {
            "@type": "HowToStep",
            name: "Watch the live map",
            text: "Open Lightning Tracker and check recent strikes and storm motion near you.",
          },
          {
            "@type": "HowToStep",
            name: "Count flash to thunder",
            text: "When you see lightning, start counting and stop when you hear the thunder.",
          },
          {
            "@type": "HowToStep",
            name: "Enter the seconds",
            text: "Type the count into the Lightning Tracker distance calculator for miles or kilometers.",
          },
          {
            "@type": "HowToStep",
            name: "Shelter and keep monitoring",
            text: "If the strike is close, move indoors or into a hard-top vehicle and keep watching the live map.",
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
        <header className="mb-6 max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Lightning Tracker
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
            Watch the live lightning map above, then estimate how far a strike is with the
            flash-to-thunder calculator.
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
              lightning map (real-time lightning strike map) and a flash-to-bang distance calculator
              in one place so campers, drivers, photographers, and families can see lightning
              strikes near them and react sooner.
            </p>
            <p className="mb-4 leading-relaxed text-white/75">
              People search “lightning map,” “lightning maps,” and “thunder map” for the same
              reason: they want live strike dots, not just rain on radar. Store apps and dense
              global maps help, but they rarely explain how far a bolt is from <em>you</em> or what
              to do next. This free lightning tracker fills that gap.
            </p>
            <p className="leading-relaxed text-white/75">
              Use the{" "}
              <Link href="/#tracker" className="text-violet-soft underline">
                live lightning map and calculator above
              </Link>
              , then open the{" "}
              <Link href="/live-lightning-map" className="text-violet-soft underline">
                live lightning map page
              </Link>{" "}
              and{" "}
              <Link href="/lightning-alerts" className="text-violet-soft underline">
                lightning alerts overview
              </Link>{" "}
              when you want deeper monitoring tips.
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

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            How to use Lightning Tracker in four steps
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-white/80">
            People search for live lightning maps and “how far away is lightning” for the same
            reason: they want a simple workflow they can trust during a storm — watch the map, time
            the flash, then shelter.
          </p>
          <ol className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "Watch the live map",
                d: "See recent strikes and storm motion near you on the homepage tracker.",
              },
              {
                n: "02",
                t: "Count flash to thunder",
                d: "When you see a bolt, time until the boom. Closer storms mean shorter gaps.",
              },
              {
                n: "03",
                t: "Estimate distance",
                d: "Use the calculator for miles/km and a plain-language risk hint.",
              },
              {
                n: "04",
                t: "Shelter & monitor",
                d: "Move to solid shelter, then keep watching the map as the cell moves.",
              },
            ].map((step) => (
              <li key={step.n} className="border-t border-violet/40 pt-4">
                <span className="font-display text-sm font-bold text-teal">{step.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.d}</p>
              </li>
            ))}
          </ol>
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
              body: "Open a real-time lightning strike map, check storms near you, then learn age colors, delay, and zoom.",
              image: BRAND_FEATURE_4,
              alt: "Live lightning map and lightning strike map for thunderstorm tracking",
            },
            {
              href: "/lightning-alerts",
              title: "Lightning alerts",
              body: "Set smarter notification habits with radius, delay, and false-alarm tips.",
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
              alt="Lightning Tracker app-style view for monitoring nearby thunderstorms"
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
              are close enough to be at risk. A good{" "}
              <strong className="text-white">lightning tracker</strong> does not replace official
              warnings — it helps you notice cells earlier and leave exposed ridges, fields, and
              open water sooner.
            </p>
            <p className="mb-6 leading-relaxed text-white/75">
              Read our{" "}
              <Link href="/blog/lightning-safety-tips" className="text-violet-soft underline">
                lightning safety tips
              </Link>{" "}
              and{" "}
              <Link href="/blog/how-far-away-is-lightning" className="text-violet-soft underline">
                how far away is lightning
              </Link>{" "}
              guides for NWS-aligned habits you can practice every storm season.
            </p>
            <CtaButton href="/#calculator" icon="arrow" ariaLabel="Open the lightning distance calculator">
              OPEN CALCULATOR
            </CtaButton>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Guides people search with Lightning Tracker
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              {
                href: "/blog/best-lightning-tracker-apps",
                title: "Best lightning tracker apps & maps",
                desc: "What to look for beyond star ratings.",
              },
              {
                href: "/blog/how-lightning-trackers-work",
                title: "How lightning trackers work",
                desc: "Detection networks, delay, and accuracy.",
              },
              {
                href: "/blog/how-far-away-is-lightning",
                title: "How far away is lightning?",
                desc: "Flash-to-bang math made practical.",
              },
              {
                href: "/blog/lightning-safety-tips",
                title: "Lightning safety tips",
                desc: "Shelter rules that still save lives.",
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

        <FaqSection
          title="Lightning Tracker FAQs"
          items={faqs}
          includeSchema={false}
        />
      </div>
    </>
  );
}
