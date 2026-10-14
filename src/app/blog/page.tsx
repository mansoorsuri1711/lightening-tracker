import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Parlay Calculator Blog — Odds Guides & How-Tos",
  description:
    "SERP-backed parlay guides: how to calculate parlay odds, what a parlay bet is, and how combined parlay odds work.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: {
    title: "Parlay Calculator Blog — Odds Guides & How-Tos",
    description: "Practical parlay betting articles from Parlay Calculator.",
    url: `${SITE_ORIGIN}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const posts = [
  {
    href: "/blog/how-to-calculate-parlay-odds",
    title: "How to Calculate Parlay Odds (Step-by-Step)",
    excerpt:
      "Convert American odds, multiply legs, and turn any stake into profit and payout — with worked examples.",
    date: "October 2026",
    read: "12 min read",
  },
  {
    href: "/blog/what-is-a-parlay-bet",
    title: "What Is a Parlay Bet? How Parlays Work",
    excerpt:
      "Definition, why parlays pay more, risks vs. straight bets, and when a multi-leg ticket makes sense.",
    date: "October 2026",
    read: "9 min read",
  },
  {
    href: "/blog/parlay-odds-explained",
    title: "Parlay Odds Explained: Combined Price & Probability",
    excerpt:
      "How combined odds, juice, and implied probability change as you add legs to a parlay.",
    date: "October 2026",
    read: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
        Parlay calculator blog
      </h1>
      <p className="mb-10 text-lg text-white/80">
        Only topics people search alongside a parlay calculator — how-tos, definitions, and odds
        explainers. No filler posts.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="group block border border-white/10 bg-white/5 p-6 transition-colors hover:border-violet/50 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            <article>
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
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
