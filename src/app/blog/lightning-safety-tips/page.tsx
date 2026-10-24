import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "Lightning Safety Tips for Thunderstorms";
const DESC =
  "Practical lightning safety tips: when to seek shelter, the 30-30 idea, outdoor risks, and how a lightning tracker supports — not replaces — good judgment.";
const SLUG = "lightning-safety-tips";
const DATE = "2026-10-25";
const IMAGE = "/blog/lightning-safety-tips.webp";

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
    question: "Where is the safest place during lightning?",
    answer:
      "A substantial building with wiring and plumbing, or a fully enclosed metal-top vehicle with windows up. Avoid open shelters, tall isolated trees, and open fields.",
  },
  {
    question: "What is the 30-30 rule?",
    answer:
      "A common guideline: if the time between flash and thunder is 30 seconds or less, seek shelter; wait at least 30 minutes after the last thunder before resuming outdoor activity. Local conditions and official warnings always come first.",
  },
  {
    question: "Can a lightning tracker keep me completely safe?",
    answer:
      "No tool can. Trackers improve awareness. Shelter decisions, forecasts, and official alerts remain essential.",
  },
];

export default function LightningSafetyTipsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Safety Tips", href: `/blog/${SLUG}` },
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
            alt="Lightning safety tips for thunderstorms and outdoor awareness"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            <strong className="text-white">Lightning safety tips</strong> from agencies such as the
            National Weather Service, CDC, and Ready.gov share a blunt message: if you can hear
            thunder, you are close enough to be struck. Gadgets help you notice storms earlier;
            they do not make an open field safe.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Shelter that actually helps</h2>
          <p>
            Prioritize a sturdy building or a hard-top vehicle. Picnic shelters, dugouts, tents, and
            isolated trees are poor choices. Inside a building, avoid corded phones, wiring, and
            plumbing that can conduct surges. Indoors is better than “almost indoors.”
          </p>

          <h2 className="font-display text-2xl font-bold text-white">
            Timing rules that keep groups aligned
          </h2>
          <p>
            Many coaches and camp leaders use a 30-30 style guideline: short flash-to-bang times
            mean stop activity; wait a full half hour after the last thunder before restarting. Pair
            that culture with a{" "}
            <Link href="/lightning-distance-calculator" className="text-violet-soft underline">
              distance estimate
            </Link>{" "}
            so everyone agrees the storm is close — not just “maybe over there.”
          </p>

          <h2 className="font-display text-2xl font-bold text-white">High-risk outdoor moments</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Open water, beaches, and boats without a cabin</li>
            <li>Ridgelines, golf courses, and wide agricultural fields</li>
            <li>Tall metal objects and lone trees that make you the next tallest target</li>
            <li>Events that take minutes to clear — plan the exit before kickoff</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-white">
            Where Lightning Tracker helps — and where it must not lead
          </h2>
          <p>
            Check a{" "}
            <Link href="/live-lightning-map" className="text-violet-soft underline">
              live lightning map
            </Link>{" "}
            while packing for outdoor plans. Configure{" "}
            <Link href="/lightning-alerts" className="text-violet-soft underline">
              lightning alerts
            </Link>{" "}
            with a radius that matches your escape time. When a flash happens near you, count and
            estimate distance immediately. Never stay exposed because an app has not pinged yet —
            thunder is already a notification.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">After the storm</h2>
          <p>
            Wait for a clear period after the last thunder before resuming swimming, climbing, or
            field sports. Help others who may have been injured only when the scene is reasonably
            safe, and call emergency services when needed. Review what worked in your group’s plan
            so the next cell is less chaotic.
          </p>

          <div className="pt-2">
            <CtaButton href="/#tracker" icon="arrow">
              PRACTICE WITH THE TRACKER
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
