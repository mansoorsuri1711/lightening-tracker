import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "Best Lightning Tracker Apps & Maps (What Actually Matters)";
const DESC =
  "Compare lightning tracker apps and live maps on alerts, delay, map clarity, and battery — a practical 2026 checklist.";
const SLUG = "best-lightning-tracker-apps";
const DATE = "2026-10-25";
const IMAGE = "/blog/best-lightning-tracker-apps.webp";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE_ORIGIN}/blog/${SLUG}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
};

const faqs = [
  {
    question: "What is the best lightning tracker app?",
    answer:
      "The best app depends on your needs: push alerts with a custom radius, a clear strike-age map, and acceptable battery use. Store leaders and web maps like LightningMaps-style viewers each win different jobs — use the checklist below instead of chasing a single #1 label.",
  },
  {
    question: "Are free lightning trackers accurate enough?",
    answer:
      "Consumer networks are excellent for awareness but can lag and occasionally misplace strikes. Use them with thunder you hear, official warnings, and common-sense shelter rules.",
  },
  {
    question: "Do I need both an app and a website?",
    answer:
      "Many people use a phone app for alerts and a web map for big-picture storm motion. Lightning Tracker focuses on distance math and reading skills that transfer to either interface.",
  },
];

export default function BestLightningTrackerAppsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Best Apps & Maps", href: `/blog/${SLUG}` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <BlogPostSchema
          title={TITLE}
          description={DESC}
          slug={SLUG}
          datePublished={DATE}
          image={`${SITE_ORIGIN}${IMAGE}`}
        />
        <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">{TITLE}</h1>
        <p className="mb-6 text-sm text-white/50">Updated October 25, 2026 · 9 min read</p>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={IMAGE}
            alt="Choosing the best lightning tracker apps and live strike maps"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            Search for <strong className="text-white">best lightning tracker app</strong> and you
            will see store listings, Reddit threads, and photographer roundups. Star ratings help,
            but they do not tell you whether the map shows strike age clearly, how noisy alerts
            become on an active day, or how the tool behaves when you are on a hike with limited
            battery.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">
            What “best” should mean for a lightning tracker
          </h2>
          <p>
            A strong lightning tracker does three jobs: show recent strikes, explain how fresh those
            strikes are, and optionally warn you when activity enters a radius you chose. Secondary
            jobs — radar overlays, sharing, hotspot history — are nice only if the core map stays
            readable.
          </p>
          <p>
            Web maps such as LightningMaps.org / Blitzortung-style viewers excel at global or
            regional context. Phone apps marketed as “My Lightning Tracker” style tools often win on
            push notifications. Weather suites (for example Spark-style lightning layers) win when
            you already live inside a full weather app. Pick the category that matches your main
            risk: early notice vs. map study vs. all-in-one weather.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Checklist before you install</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-white">Strike age encoding</strong> — colors or fade so new
              bolts stand out from old ones.
            </li>
            <li>
              <strong className="text-white">Configurable alert radius</strong> — useful for trails,
              ball fields, and campsites with different escape times.
            </li>
            <li>
              <strong className="text-white">Honest delay</strong> — near real time is fine; pretend
              zero-latency marketing is not.
            </li>
            <li>
              <strong className="text-white">Battery & data</strong> — background location plus
              frequent map refresh can drain phones on long outdoor days.
            </li>
            <li>
              <strong className="text-white">Offline honesty</strong> — if the network dies, you still
              need shelter rules and flash-to-bang timing.
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-white">
            How Lightning Tracker fits the workflow
          </h2>
          <p>
            Lightning Tracker on lightningtracker.net is not trying to replace every store app. It
            teaches the skills those apps assume you already have: estimating{" "}
            <Link href="/lightning-distance-calculator" className="text-violet-soft underline">
              strike distance
            </Link>
            , reading a{" "}
            <Link href="/live-lightning-map" className="text-violet-soft underline">
              live lightning map
            </Link>
            , and setting{" "}
            <Link href="/lightning-alerts" className="text-violet-soft underline">
              alerts
            </Link>{" "}
            that stay useful. Use this site as the playbook; use your preferred map or app as the
            live feed.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">
            Who should prioritize which tool
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Campers and hikers — radius alerts + distance math + early leave plan</li>
            <li>Drivers — regional map motion + official severe weather alerts</li>
            <li>Photographers — strike-age clarity and history windows for timing shots safely</li>
            <li>Parents at sports fields — loud alerts, simple radius, shelter location scouted ahead</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-white">Bottom line</h2>
          <p>
            The best lightning tracker is the one you will actually check — and the one that does
            not lull you into ignoring thunder. Pair a trustworthy live map with distance estimates
            and{" "}
            <Link href="/blog/lightning-safety-tips" className="text-violet-soft underline">
              lightning safety tips
            </Link>
            , and you will outperform anyone who only installed an app for the icon.
          </p>

          <div className="pt-2">
            <CtaButton href="/#calculator" icon="arrow">
              OPEN LIGHTNING TRACKER
            </CtaButton>
          </div>
        </div>

        <div className="mt-12">
          <FaqSection title="FAQs" items={faqs} />
        </div>
      </article>
    </>
  );
}
