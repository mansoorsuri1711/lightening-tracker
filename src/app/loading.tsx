export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-brand">
      <div className="relative" role="status" aria-label="Loading">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet/30 border-t-violet" />
      </div>
    </div>
  );
}
