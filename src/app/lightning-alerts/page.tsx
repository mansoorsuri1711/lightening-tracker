import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_FEATURE_2, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Lightning Alerts — Radius, Timing & Notification Tips",
  description:
    "Set smarter lightning alerts: choose a useful radius, understand detection delay, and avoid alert fatigue during thunderstorms.",
  alternates: { canonical: `${SITE_ORIGIN}/lightning-alerts` },
  openGraph: {
    title: "Lightning Alerts — Radius, Timing & Notification Tips",
    description: "Practical lightning notification guidance from Lightning Tracker.",
    url: `${SITE_ORIGIN}/lightning-alerts`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Lightning alerts guide" }],
  },
};

const faqs = [
  {
    question: "What alert radius should I use?",
    answer:
      "Many outdoor users start around 10–25 miles (15–40 km). Tighter radii reduce noise; wider radii give earlier heads-up for fast-moving storms. Adjust for your activity and how quickly you can reach shelter.",
  },
  {
    question: "Why did I get an alert with no thunder?",
    answer:
      "Detection networks can report strikes you cannot hear yet, or activity just outside audible range. Maps may also include in-cloud lightning. Cross-check a live map and local sky conditions.",
  },
  {
    question: "Are app alerts the same as NWS warnings?",
    answer:
      "No. Official watches and warnings come from meteorological agencies. Lightning apps are supplemental awareness tools — keep wireless emergency alerts enabled on your phone.",
  },
];

const habits = [
  {
    title: "Match radius to escape time",
    body: "If it takes 20 minutes to leave a trail or lake, a tiny radius may warn too late. Build in travel time.",
  },
  {
    title: "Expect a short delay",
    body: "Near-real-time still means seconds to minutes. Never wait for the notification if thunder is already loud overhead.",
  },
  {
    title: "Quiet hours vs storm days",
    body: "On quiet days, a wide radius is fine. On active severe-weather days, tighten settings so alerts stay actionable.",
  },
  {
    title: "Share the plan, not just the ping",
    body: "Tell your group what you will do when an alert fires — pack up, leave the ridge, or move indoors — before the storm arrives.",
  },
];

export default function LightningAlertsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Lightning Alerts", href: "/lightning-alerts" },
        ]}
      />
      <div className="container mx-auto max-w-5xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Lightning alerts that stay useful
        </h1>
        <p className="mb-8 max-w-3xl text-lg text-white/80">
          Notification apps dominate “lightning tracker” searches because people want a tap on the
          shoulder before thunder arrives. Here is how to configure alerts so they help instead of
          crying wolf.
        </p>

        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4 leading-relaxed text-white/80">
            <h2 className="font-display text-2xl font-bold text-white">
              Alerts are a second layer — not the first
            </h2>
            <p>
              If you can hear thunder, you are already in a risk zone. Alerts shine when you are
              indoors, driving, or focused on an activity and need a nudge that a cell is entering
              your chosen radius.
            </p>
            <p>
              Combine alerts with a{" "}
              <Link href="/live-lightning-map" className="text-violet-soft underline">
                live lightning map reading habit
              </Link>{" "}
              and the{" "}
              <Link href="/lightning-distance-calculator" className="text-violet-soft underline">
                distance calculator
              </Link>{" "}
              when you see a flash yourself.
            </p>
            <CtaButton href="/blog/lightning-safety-tips" size="sm" icon="arrow">
              Safety tips
            </CtaButton>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_2}
              alt="Lightning Tracker alert style screen for nearby thunderstorm notifications"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <section className="mb-12 grid gap-4 sm:grid-cols-2">
          {habits.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</p>
            </div>
          ))}
        </section>

        <FaqSection title="Lightning alert FAQs" items={faqs} />
      </div>
    </>
  );
}
