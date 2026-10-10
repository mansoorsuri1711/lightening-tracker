'use client';

import CtaButton from '@/components/CtaButton';

export default function Error({
  reset,
}: {
  error?: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 text-black">
      <h2 className="mb-4 text-2xl font-bold text-black">Something went wrong!</h2>
      <p className="mb-6 text-center text-black">
        We apologize for the inconvenience. Please try again.
      </p>
      <CtaButton as="button" icon="arrow" onClick={reset}>
        Try again
      </CtaButton>
    </div>
  );
}
