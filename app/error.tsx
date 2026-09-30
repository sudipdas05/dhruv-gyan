"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] grid place-items-center text-center px-4">
      <div>
        <h2 className="text-xl font-semibold text-accent mb-2">Something went wrong</h2>
        <p className="text-muted mb-4">The page hit an unexpected error.</p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-md bg-cyan-500 text-polar-950 font-medium focus-ring"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
