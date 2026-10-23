import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist. Return to Index Fund Calculator.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="mb-3 font-display text-3xl font-bold text-white">Page not found</h1>
      <p className="mb-8 text-white/75">
        That page is gone or never existed. Head back to Index Fund Calculator to project your next
        contribution plan.
      </p>
      <Link
        href="/"
        className="inline-flex rounded-xl bg-gradient-to-r from-violet to-teal px-5 py-3 text-sm font-bold text-brand-deep"
      >
        Back to calculator
      </Link>
    </div>
  );
}
