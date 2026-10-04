import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Return to the Florida Paycheck Calculator.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-display text-4xl font-bold text-white mb-3">404</h1>
      <p className="text-gray-300 mb-6 max-w-md">
        That page is gone or never existed. Head back to the Florida paycheck calculator.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-[#041820] transition hover:bg-[#5eead4]"
      >
        Back to calculator
      </Link>
    </div>
  );
}
