import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "BMI Blog for Women — Calculate, Meaning & Charts",
  description:
    "SERP-focused BMI articles for women: how to calculate BMI, what BMI means, the BMI formula, and height–weight charts.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: {
    title: "BMI Blog for Women — Calculate, Meaning & Charts",
    description: "Educational BMI guides from BMI Calculator Women.",
    url: `${SITE_ORIGIN}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const posts = [
  {
    href: "/blog/how-to-calculate-bmi",
    title: "How to Calculate BMI (Step by Step)",
    excerpt:
      "Metric and imperial walkthroughs so you can compute body mass index without a spreadsheet.",
    date: "October 2026",
    read: "9 min read",
  },
  {
    href: "/blog/what-is-bmi",
    title: "What Is BMI? Meaning, Uses, and Limits",
    excerpt:
      "Plain-language body mass index meaning for women — what the number measures and what it misses.",
    date: "October 2026",
    read: "8 min read",
  },
  {
    href: "/blog/bmi-formula",
    title: "BMI Formula — Metric & Imperial Equations",
    excerpt:
      "The exact BMI formulas with worked examples for kg/m² and the 703 imperial shortcut.",
    date: "October 2026",
    read: "7 min read",
  },
  {
    href: "/blog/height-and-weight-chart-for-women",
    title: "Height and Weight Chart for Women",
    excerpt:
      "Healthy weight ranges by height — the practical answer to “how much should I weigh?”",
    date: "October 2026",
    read: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1 className="mb-3 font-display text-3xl font-bold text-brand md:text-4xl">
        BMI blog for women
      </h1>
      <p className="mb-10 text-lg text-ink/85">
        Only high-intent topics people search with a BMI calculator for women — how to calculate,
        meaning, formula, and height–weight charts.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.href}
            className="rounded-2xl border border-pink/20 bg-white/90 p-6 transition-colors hover:border-pink/50"
          >
            <h2 className="mb-3 font-display text-xl font-bold text-brand">{post.title}</h2>
            <p className="mb-4 text-ink/85">{post.excerpt}</p>
            <div className="mb-4 flex items-center gap-2 text-sm text-ink/65">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.read}</span>
            </div>
            <Link href={post.href} className="font-semibold text-pink-deep hover:underline">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
