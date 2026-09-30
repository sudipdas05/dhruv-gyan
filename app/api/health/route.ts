export const dynamic = "force-dynamic";

export async function GET() {
  const env = process.env.NODE_ENV ?? "development";
  return Response.json({
    status: "ok",
    application: "POLARIS",
    environment: env,
    services: {
      database: process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "demo",
      ai: process.env.AI_API_KEY ? "configured" : "demo",
    },
  });
}
