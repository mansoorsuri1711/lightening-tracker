import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Florida Paycheck Blog — Take-Home Pay, FICA & Tax Brackets",
  description:
    "SERP-focused Florida paycheck articles on take-home pay math, FICA taxes, and 2026 federal tax brackets.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: {
    title: "Florida Paycheck Blog — Take-Home Pay, FICA & Tax Brackets",
    description: "Educational paycheck guides from Florida Paycheck Calculator.",
    url: `${SITE_ORIGIN}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const posts = [
  {
    href: "/blog/how-to-calculate-florida-take-home-pay",
    title: "How to Calculate Florida Take-Home Pay",
    excerpt:
      "A practical checklist from gross wages to net deposit, including Florida’s $0 state income tax step.",
    date: "October 2026",
    read: "9 min read",
  },
  {
    href: "/blog/fica-taxes-explained",
    title: "FICA Taxes Explained for Florida Paychecks",
    excerpt:
      "Social Security, Medicare, the 2026 wage base, and why FICA still appears when Florida has no state income tax.",
    date: "October 2026",
    read: "8 min read",
  },
  {
    href: "/blog/federal-tax-brackets-2026",
    title: "2026 Federal Tax Brackets for Paycheck Planning",
    excerpt:
      "Current federal rates, standard deductions, and how brackets feed into Florida paycheck estimates.",
    date: "October 2026",
    read: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1 className="font-display text-3xl md:text-4xl font-bold text-accent mb-3">
        Florida Paycheck Blog
      </h1>
      <p className="text-gray-300 text-lg mb-10">
        Only high-intent topics people search alongside Florida paycheck calculators — take-home pay
        math, FICA, and federal brackets.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article
            key={post.href}
            className="rounded-2xl border border-white/10 bg-secondary p-6 hover:border-accent/50 transition-colors"
          >
            <h2 className="font-display text-xl font-bold text-white mb-3">{post.title}</h2>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.read}</span>
            </div>
            <Link href={post.href} className="text-accent hover:underline font-semibold">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
