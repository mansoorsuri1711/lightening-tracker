import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export type Crumb = {
  label: string;
  href?: string;
};

function absoluteUrl(href: string): string {
  if (href === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${href}`;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      {/* Full-width row, same left align on every page — no bar/background */}
      <nav aria-label="Breadcrumb" className="w-full">
        <div className="container mx-auto px-4 pt-5 pb-2 sm:px-6 md:px-8">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/60">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span className="text-white/35" aria-hidden="true">
                      /
                    </span>
                  ) : null}
                  {isLast || !item.href ? (
                    <span className="font-semibold text-white" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-violet-soft underline-offset-2 hover:underline"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
