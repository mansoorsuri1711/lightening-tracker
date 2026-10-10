import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Return to the BMI Calculator Women.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center text-ink">
      <h1 className="mb-3 font-display text-4xl font-bold text-brand">404</h1>
      <p className="mb-6 max-w-md text-ink/85">
        That page is gone or never existed. Head back to the BMI calculator for women.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-gradient-to-r from-coral to-pink px-6 py-3 text-sm font-bold text-white transition hover:from-coral-deep hover:to-pink-deep"
      >
        Back to calculator
      </Link>
    </div>
  );
}
