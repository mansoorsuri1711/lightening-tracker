export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureIngest } = await import("@/lib/glm/ingest");
    ensureIngest();
  }
}
