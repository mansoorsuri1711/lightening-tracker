import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Body Fat Blog — Measure, Calculate & Ideal Ranges",
  description:
    "SERP-focused body fat articles on measuring body fat, calculating percentage, and ideal ranges for men and women.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: {
    title: "Body Fat Blog — Measure, Calculate & Ideal Ranges",
    description: "Educational body fat guides from Body Fat Calculator.",
    url: `${SITE_ORIGIN}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const posts = [
  {
    href: "/blog/how-to-measure-body-fat",
    title: "How to Measure Body Fat at Home",
    excerpt:
      "Tape, calipers, smart scales, and lab methods — what each measures and when to use them.",
    date: "October 2026",
    read: "10 min read",
  },
  {
    href: "/blog/how-to-calculate-body-fat-percentage",
    title: "How to Calculate Body Fat Percentage",
    excerpt:
      "Step-by-step Navy formulas, BMI estimate math, and how to turn percentage into fat mass.",
    date: "October 2026",
    read: "9 min read",
  },
  {
    href: "/blog/ideal-body-fat-percentage",
    title: "Ideal Body Fat Percentage by Sex and Age",
    excerpt:
      "Healthy and ideal ranges, why charts differ for men and women, and how to set realistic targets.",
    date: "October 2026",
    read: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1 className="mb-3 font-display text-3xl font-bold text-black md:text-4xl">
        Body Fat Blog
      </h1>
      <p className="mb-10 text-lg text-black">
        Only high-intent topics people search alongside body fat calculators — measuring, calculating,
        and ideal percentage ranges.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.href}
            className="rounded-2xl border border-black/15 bg-white p-6 transition-colors hover:border-black/40"
          >
            <h2 className="mb-3 font-display text-xl font-bold text-black">{post.title}</h2>
            <p className="mb-4 text-black">{post.excerpt}</p>
            <div className="mb-4 flex items-center gap-2 text-sm text-black">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.read}</span>
            </div>
            <Link href={post.href} className="font-semibold text-black hover:underline">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
