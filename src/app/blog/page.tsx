import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Lightning Tracker Blog — Maps, Distance & Safety",
  description:
    "SERP-backed lightning tracker guides: best apps, how detection works, how far lightning is, and thunderstorm safety tips.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: {
    title: "Lightning Tracker Blog — Maps, Distance & Safety",
    description: "Practical lightning tracker articles from Lightning Tracker.",
    url: `${SITE_ORIGIN}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const posts = [
  {
    href: "/blog/best-lightning-tracker-apps",
    title: "Best Lightning Tracker Apps & Maps (What Actually Matters)",
    excerpt:
      "A practical checklist for live maps, alerts, delay, and battery — beyond star ratings alone.",
    date: "October 2026",
    read: "9 min read",
    image: "/blog/best-lightning-tracker-apps.webp",
    alt: "Comparison view for choosing the best lightning tracker apps and maps",
  },
  {
    href: "/blog/how-lightning-trackers-work",
    title: "How Lightning Trackers Work: Detection, Delay & Accuracy",
    excerpt:
      "How sensor networks locate strikes and why “live” usually means near real time.",
    date: "October 2026",
    read: "10 min read",
    image: "/blog/how-lightning-trackers-work.webp",
    alt: "Illustration of how lightning detection networks feed tracker maps",
  },
  {
    href: "/blog/how-far-away-is-lightning",
    title: "How Far Away Is Lightning? Flash-to-Thunder Explained",
    excerpt:
      "Use the rule of five, sound-speed math, and our free distance calculator outdoors.",
    date: "October 2026",
    read: "8 min read",
    image: "/blog/how-far-away-is-lightning.webp",
    alt: "Visual guide to estimating how far away lightning is",
  },
  {
    href: "/blog/lightning-safety-tips",
    title: "Lightning Safety Tips for Thunderstorms",
    excerpt:
      "Shelter rules, 30-30 thinking, and how trackers fit into a safety plan — not replace it.",
    date: "October 2026",
    read: "9 min read",
    image: "/blog/lightning-safety-tips.webp",
    alt: "Lightning safety tips for outdoor thunderstorm awareness",
  },
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
      <div className="container mx-auto max-w-5xl px-4 pb-10 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Lightning Tracker blog
        </h1>
        <p className="mb-10 text-lg text-white/80">
          Only topics people search alongside a lightning tracker — apps, detection science,
          distance, and safety. No filler posts.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group block overflow-hidden border border-white/10 bg-white/5 transition-colors hover:border-violet/50 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
            >
              <article>
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="mb-3 font-display text-xl font-bold text-white group-hover:text-violet-soft">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-white/75">{post.excerpt}</p>
                  <div className="mb-4 flex items-center gap-2 text-sm text-white/55">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.read}</span>
                  </div>
                  <span className="font-semibold text-violet-soft group-hover:underline">
                    Read more →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
