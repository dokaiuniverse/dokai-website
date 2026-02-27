import { NextResponse } from "next/server";

function pick(content: string, name: string) {
  const r = new RegExp(
    `<meta[^>]+(?:property|name)=["']${name}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i",
  );
  const m = content.match(r);
  return m?.[1];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) return NextResponse.json({ error: "missing url" }, { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol))
      throw new Error("bad protocol");
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  try {
    const res = await fetch(parsed.toString(), {
      redirect: "follow",
      headers: {
        // 일부 사이트가 UA 없으면 막음
        "user-agent":
          "Mozilla/5.0 (compatible; DokaiEditor/1.0; +https://example.com)",
        accept: "text/html,*/*",
      },
    });

    const html = await res.text();

    const title =
      pick(html, "og:title") ??
      pick(html, "twitter:title") ??
      pick(html, "title");
    const description =
      pick(html, "og:description") ??
      pick(html, "twitter:description") ??
      pick(html, "description");
    const image = pick(html, "og:image") ?? pick(html, "twitter:image");
    const canonical = pick(html, "og:url") ?? parsed.toString();

    return NextResponse.json({
      title,
      description,
      image,
      url: canonical,
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}
