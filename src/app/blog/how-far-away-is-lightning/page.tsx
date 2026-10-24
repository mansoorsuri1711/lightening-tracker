import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "How Far Away Is Lightning? Flash-to-Thunder Explained";
const DESC =
  "Learn how to tell how far away lightning is by counting seconds from flash to thunder, plus the rule of five and calculator tips.";
const SLUG = "how-far-away-is-lightning";
const DATE = "2026-10-25";
const IMAGE = "/blog/how-far-away-is-lightning.webp";

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
    question: "How far away is lightning if thunder is 10 seconds later?",
    answer:
      "About 2 miles using the rule of five (10 ÷ 5), or roughly 3.4 km using the speed of sound. Always treat the result as an estimate.",
  },
  {
    question: "Does the 5-second rule work in every climate?",
    answer:
      "It is a handy approximation. Temperature and humidity change the exact speed of sound slightly. For safety decisions, the approximation is usually enough.",
  },
  {
    question: "If I cannot hear thunder, am I safe?",
    answer:
      "Not necessarily. You may be outside audible range while a storm still approaches, or wind and terrain may muffle sound. Check maps and forecasts too.",
  },
];

export default function HowFarAwayIsLightningPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "How Far Is Lightning?", href: `/blog/${SLUG}` },
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
        <p className="mb-6 text-sm text-white/50">Updated October 25, 2026 · 8 min read</p>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={IMAGE}
            alt="Estimating how far away lightning is using flash-to-thunder timing"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            <strong className="text-white">How far away is lightning?</strong> is one of the most
            searched thunderstorm questions for a reason: your eyes see the flash long before your
            ears hear the boom. That time gap is a built-in rangefinder — rough, free, and available
            even when your phone has no signal.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">The rule of five</h2>
          <p>
            Count the seconds between the flash and the thunder, then divide by five. The result is
            an approximate distance in miles. Ten seconds ≈ 2 miles. Fifteen seconds ≈ 3 miles.
            National Weather Service education pages teach the same flash-to-bang idea because it
            works well enough for personal safety decisions.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">
            Why sound lags behind light
          </h2>
          <p>
            Light travels so fast that for storm distances you can treat the flash as instantaneous.
            Sound in air is on the order of 343 meters per second near room temperature — roughly a
            kilometer every three seconds, or a mile every five. Multiply your count by that speed
            and you have a physics-based estimate. Lightning Tracker’s{" "}
            <Link href="/lightning-distance-calculator" className="text-violet-soft underline">
              lightning distance calculator
            </Link>{" "}
            does the arithmetic and adds a plain-language risk hint.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Worked examples</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>3 seconds — roughly 0.6 miles / 1 km — treat as immediate risk</li>
            <li>5 seconds — about 1 mile — nearby; shelter without delay</li>
            <li>15 seconds — about 3 miles — still close enough for outdoor plans to change</li>
            <li>30 seconds — about 6 miles — monitor; storms can close that gap quickly</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-white">Common mistakes</h2>
          <p>
            Matching the wrong thunder to the wrong flash skews the count. Waiting through a long
            rumble instead of noting the first boom adds error. Assuming a distant estimate means
            “safe to stay on the water” ignores storms that produce lightning far from rain cores.
            When in doubt, combine timing with a{" "}
            <Link href="/live-lightning-map" className="text-violet-soft underline">
              live lightning map
            </Link>{" "}
            and{" "}
            <Link href="/blog/lightning-safety-tips" className="text-violet-soft underline">
              safety habits
            </Link>
            .
          </p>

          <h2 className="font-display text-2xl font-bold text-white">
            Put it into practice with Lightning Tracker
          </h2>
          <p>
            Open the homepage tool, enter your count, and read miles or kilometers instantly. Then
            decide: continue monitoring, or move to a substantial building or hard-top vehicle. That
            loop — see, count, estimate, act — is the heart of practical lightning awareness.
          </p>

          <div className="pt-2">
            <CtaButton href="/lightning-distance-calculator" icon="arrow">
              OPEN DISTANCE CALCULATOR
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
