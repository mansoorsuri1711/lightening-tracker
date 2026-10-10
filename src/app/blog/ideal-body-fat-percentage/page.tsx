import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BlogPostSchema from "@/components/BlogPostSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_CHART, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "Ideal Body Fat Percentage by Sex and Age";
const description =
  "Ideal and healthy body fat percentage ranges for men and women, how age changes targets, and how to use a calculator to set goals.";
const slug = "ideal-body-fat-percentage";
const datePublished = "2026-10-11";

export const metadata: Metadata = {
  title: "Ideal Body Fat Percentage — Healthy Ranges by Age",
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${slug}` },
  openGraph: {
    title,
    description,
    url: `${SITE_ORIGIN}/blog/${slug}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
  },
};

const faqs = [
  {
    question: "What is the ideal body fat percentage?",
    answer:
      "There is no single ideal. Jackson & Pollock–style tables raise targets with age, and ACE categories define fitness bands separately for men and women.",
  },
  {
    question: "Is lower always better?",
    answer:
      "No. Dropping below essential fat ranges can harm hormones, immunity, and performance. Sustainable fitness or average ranges beat extreme cuts for most people.",
  },
];

export default function IdealBlogPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished={datePublished}
        image={`${SITE_ORIGIN}${BRAND_CHART}`}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: title },
        ]}
      />

      <article>
        <h1 className="mb-4 font-display text-3xl font-bold text-black md:text-4xl">{title}</h1>
        <p className="mb-8 text-lg leading-relaxed text-black">
          Searches for <strong className="font-semibold text-black">ideal body fat percentage</strong>{" "}
          usually mean “what should I aim for?” The honest answer depends on sex, age, sport, and
          health history — charts give a starting map, not a prescription.
        </p>

        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl border border-black/15 bg-white">
          <Image
            src={BRAND_CHART}
            alt="Ideal body fat percentage ranges illustrated on a category chart"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Category ranges vs age-based ideals
          </h2>
          <p className="leading-relaxed text-black">
            ACE-style categories (essential, athletes, fitness, average, obese) describe lifestyle
            bands. Age-adjusted ideals from research tables often sit near the fitness or lean-average
            zone and creep upward as people get older. Our calculator shows both your Navy percentage
            and an age-aware ideal estimate.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">Men vs women</h2>
          <p className="mb-3 leading-relaxed text-black">
            Women carry more essential fat. Comparing a woman&apos;s percentage to male athletic
            photos is misleading. Use the dedicated charts for{" "}
            <Link href="/body-fat-percentage-men" className="text-black hover:underline">
              men
            </Link>{" "}
            and{" "}
            <Link href="/body-fat-percentage-women" className="text-black hover:underline">
              women
            </Link>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Setting a realistic target
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-black">
            <li>Measure with a consistent method every few weeks</li>
            <li>Note your category, not only the decimal</li>
            <li>Aim for the next healthier band before chasing extremes</li>
            <li>
              Watch waist trends with the{" "}
              <Link href="/visceral-fat-calculator" className="text-black hover:underline">
                visceral fat calculator
              </Link>{" "}
              if abdominal risk is a concern
            </li>
          </ol>
        </section>

        <FaqSection items={faqs} />

        <section className="mt-12 rounded-2xl border border-black/15 bg-white p-8 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-black">
            Compare your number to an ideal target
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-black">
            Calculate body fat percentage and see fat mass to lose (if any) toward an age-based ideal.
          </p>
          <CtaButton href="/#calculator" ariaLabel="Open body fat calculator">
            OPEN CALCULATOR
          </CtaButton>
        </section>
      </article>
    </div>
  );
}
