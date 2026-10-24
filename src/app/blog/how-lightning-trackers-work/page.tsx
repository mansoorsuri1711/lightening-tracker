import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "How Lightning Trackers Work: Detection, Delay & Accuracy";
const DESC =
  "Learn how lightning trackers and live maps detect strikes, locate them, and why data can lag by seconds or minutes.";
const SLUG = "how-lightning-trackers-work";
const DATE = "2026-10-25";
const IMAGE = "/blog/how-lightning-trackers-work.webp";

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
    question: "How do lightning tracker websites work?",
    answer:
      "Receivers detect electromagnetic or optical signals from lightning. Timing differences across stations help estimate location. Servers plot those points on a map you refresh in a browser or app.",
  },
  {
    question: "Why is my lightning map a minute behind?",
    answer:
      "Detection, location processing, and delivery each take time. Consumer products optimize for coverage and cost, not laboratory latency. Near real time is still valuable for awareness.",
  },
  {
    question: "Can trackers see all lightning?",
    answer:
      "No network catches every discharge perfectly. Density of sensors, storm type, and filtering all affect what appears on your screen.",
  },
];

export default function HowLightningTrackersWorkPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "How Trackers Work", href: `/blog/${SLUG}` },
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
        <p className="mb-6 text-sm text-white/50">Updated October 25, 2026 · 10 min read</p>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={IMAGE}
            alt="How lightning detection networks feed Lightning Tracker style maps"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            People ask <strong className="text-white">how lightning trackers work</strong> after
            watching dots bloom across a storm on their phone. The short version: sensors listen for
            the electromagnetic fingerprint of lightning, computers estimate where each pulse came
            from, and your map draws the result. The longer version helps you trust the tool without
            over-trusting it.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">From flash to map pin</h2>
          <p>
            A lightning discharge radiates energy across a wide spectrum. Ground-based networks use
            antennas that pick up those radio impulses. When multiple stations hear the same event,
            differences in arrival time (and sometimes direction) support a location estimate —
            similar in spirit to how GPS uses timing, but applied to a naturally occurring signal.
          </p>
          <p>
            Educational pages from agencies such as NOAA’s National Severe Storms Laboratory
            describe lightning detection as a mix of radio and optical methods depending on the
            system. Consumer lightning tracker apps and websites typically subscribe to or mirror
            one of these data streams, then style strikes by age so newer activity pops visually.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Why delay exists</h2>
          <p>
            “Live” rarely means instantaneous. A strike must be detected, associated across
            stations, quality-checked, packaged, and delivered to your device. Then your app may
            batch refreshes to save battery. A delay of tens of seconds to a couple of minutes is
            common and still useful for deciding whether to leave a ridge — as long as you do not
            wait for the perfect pin when thunder is already overhead.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Accuracy in plain language</h2>
          <p>
            Location error varies with network density and storm geometry. A strike may appear a few
            kilometers from the true ground contact, or an in-cloud flash may plot in a way that
            surprises someone expecting only cloud-to-ground bolts. That is why Lightning Tracker
            pairs map literacy with{" "}
            <Link href="/blog/how-far-away-is-lightning" className="text-violet-soft underline">
              flash-to-thunder distance
            </Link>{" "}
            — your ears remain a local sensor no API can fully replace.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">
            What this means for Lightning Tracker users
          </h2>
          <p>
            Use a{" "}
            <Link href="/live-lightning-map" className="text-violet-soft underline">
              live lightning map
            </Link>{" "}
            to see regional motion. Use the{" "}
            <Link href="/lightning-distance-calculator" className="text-violet-soft underline">
              distance calculator
            </Link>{" "}
            when you personally see a flash. Use{" "}
            <Link href="/lightning-alerts" className="text-violet-soft underline">
              alert tips
            </Link>{" "}
            so notifications reinforce, rather than replace, those checks. Understanding the
            pipeline makes each of those steps calmer under a dark sky.
          </p>

          <div className="pt-2">
            <CtaButton href="/how-it-works" icon="arrow">
              SEE THE WORKFLOW
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
