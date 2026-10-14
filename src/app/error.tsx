"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-brand px-4 text-white">
      <h2 className="mb-3 font-display text-2xl font-bold">Something went wrong</h2>
      <p className="mb-6 max-w-md text-center text-white/70">
        Please try again. If the problem continues, refresh the page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-xl bg-violet px-5 py-2.5 text-sm font-semibold text-brand-deep transition hover:brightness-110"
      >
        Try again
      </button>
    </div>
  );
}
