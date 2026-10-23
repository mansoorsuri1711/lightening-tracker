import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND_FEATURE_2, BRAND_FEATURE_3, BRAND_HERO, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Index Fund Blog — Guides People Actually Search",
  description:
    "SERP-backed index fund guides: what an index fund is, index vs mutual funds, and how expense ratios affect returns.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: {
    title: "Index Fund Blog — Guides People Actually Search",
    description: "Practical index fund articles from Index Fund Calculator.",
    url: `${SITE_ORIGIN}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const posts = [
  {
    href: "/blog/what-is-an-index-fund",
    title: "What Is an Index Fund? A Clear Beginner Guide",
    excerpt:
      "How index funds track markets, why costs stay low, and who they fit — without brokerage jargon.",
    date: "October 2026",
    read: "10 min read",
    image: BRAND_HERO,
    alt: "Index fund investing overview illustration",
  },
  {
    href: "/blog/index-fund-vs-mutual-fund",
    title: "Index Fund vs Mutual Fund: Key Differences",
    excerpt:
      "Passive tracking versus active management — fees, goals, and when each structure makes sense.",
    date: "October 2026",
    read: "9 min read",
    image: BRAND_FEATURE_3,
    alt: "Comparison of index funds and mutual funds",
  },
  {
    href: "/blog/expense-ratio-explained",
    title: "Expense Ratio Explained: Why Tiny Fees Matter",
    excerpt:
      "What an expense ratio is, typical index-fund ranges, and how fees compound against your balance.",
    date: "October 2026",
    read: "8 min read",
    image: BRAND_FEATURE_2,
    alt: "Expense ratio fee impact on investment growth",
  },
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
      <div className="container mx-auto max-w-5xl px-4 pb-10 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Index fund calculator blog
        </h1>
        <p className="mb-10 text-lg text-white/80">
          Only topics people search alongside an index fund calculator — definitions, comparisons,
          and fee explainers. No filler posts.
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
