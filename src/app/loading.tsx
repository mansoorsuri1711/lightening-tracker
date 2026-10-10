export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white">
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent" />
      </div>
    </div>
  );
}
