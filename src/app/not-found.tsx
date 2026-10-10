import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Return to the Body Fat Calculator.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center bg-white px-4 py-16 text-center text-black">
      <h1 className="mb-3 font-display text-4xl font-bold text-black">404</h1>
      <p className="mb-6 max-w-md text-black">
        That page is gone or never existed. Head back to the body fat calculator.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-black/85"
      >
        Back to calculator
      </Link>
    </div>
  );
}
