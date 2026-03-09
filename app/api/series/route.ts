import { NextRequest, NextResponse } from "next/server";

const MAJOR_KEYWORDS = [
  "india", "australia", "england", "pakistan", "south africa", "new zealand",
  "sri lanka", "west indies", "bangladesh", "zimbabwe", "afghanistan",
  "ipl", "bbl", "psl", "cpl", "sa20", "the hundred", "big bash",
  "world cup", "champions trophy", "asia cup", "test championship",
  "legends league", "icc", "series", "tri-series", "bilateral"
];

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/series?apikey=${process.env.CRICKET_API_KEY}&offset=0`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    const all = data.data || [];

    const filtered = all.filter((s: any) => {
      const name = (s.name || "").toLowerCase();
      return MAJOR_KEYWORDS.some((k) => name.includes(k));
    });

    return NextResponse.json({ data: filtered });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch series" }, { status: 500 });
  }
}