import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_FEATURE_3, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "How Lightning Tracker Works",
  description:
    "Step-by-step: how Lightning Tracker’s live lightning map, lightning strike map view, distance calculator, and alert tips work together in a thunderstorm.",
  alternates: { canonical: `${SITE_ORIGIN}/how-it-works` },
  openGraph: {
    title: "How Lightning Tracker Works",
    description: "Walkthrough of the live lightning map, thunder tracking, and distance workflow.",
    url: `${SITE_ORIGIN}/how-it-works`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "How Lightning Tracker works" }],
  },
};

const faqs = [
  {
    question: "Do I need special hardware?",
    answer:
      "No. Use the web tools on any modern phone or computer. Optional lightning apps on your phone can add push notifications.",
  },
  {
    question: "Where does lightning data come from?",
    answer:
      "Lightning Tracker’s live map uses NOAA GOES GLM optical detections for the Americas. Other public maps may rely on radio networks. See our detection guide for how timing and delay work.",
  },
];

const steps = [
  {
    title: "Open the live lightning map",
    body: "Start on the homepage tracker to see recent strikes and how the storm is moving near you.",
  },
  {
    title: "Time flash to thunder",
    body: "When you see a flash, count until thunder and enter the seconds in the distance calculator.",
  },
  {
    title: "Read the risk hint",
    body: "Immediate and nearby results mean shelter now. Distant results still deserve monitoring on the map.",
  },
  {
    title: "Tune alerts ahead of time",
    body: "Set notification radius based on how long it takes you to reach solid shelter.",
  },
  {
    title: "Follow safety first",
    body: "Gadgets support decisions — they do not replace getting indoors when thunder is audible.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "How It Works", href: "/how-it-works" },
        ]}
      />
      <div className="container mx-auto max-w-5xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          How Lightning Tracker works
        </h1>
        <p className="mb-10 max-w-3xl text-lg text-white/80">
          A simple thunderstorm workflow: watch the live map, measure distance from flash to thunder,
          and act on alerts — without burying the important parts in weather jargon.
        </p>

        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <ol className="space-y-5">
            {steps.map((step, i) => (
              <li key={step.title} className="border-l-2 border-violet/50 pl-4">
                <span className="text-xs font-bold uppercase tracking-wide text-teal">
                  Step {i + 1}
                </span>
                <h2 className="mt-1 font-display text-xl font-semibold text-white">{step.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_3}
              alt="How Lightning Tracker tools fit into a thunderstorm monitoring workflow"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <p className="mb-8 leading-relaxed text-white/75">
          Deeper science is in{" "}
          <Link href="/blog/how-lightning-trackers-work" className="text-violet-soft underline">
            how lightning trackers work
          </Link>
          . For outdoor habits, see{" "}
          <Link href="/blog/lightning-safety-tips" className="text-violet-soft underline">
            lightning safety tips
          </Link>
          .
        </p>

        <div className="mb-12">
          <CtaButton href="/#tracker" icon="arrow">
            START WITH THE CALCULATOR
          </CtaButton>
        </div>

        <FaqSection title="How it works FAQs" items={faqs} />
      </div>
    </>
  );
}
