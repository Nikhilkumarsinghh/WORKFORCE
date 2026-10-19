export const runtime = "nodejs";
export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
  if (!client || !/^ca-pub-\d+$/.test(client)) return new Response("", { status: 204 });
  const publisher = client.replace(/^ca-/, "");
  return new Response(`google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
