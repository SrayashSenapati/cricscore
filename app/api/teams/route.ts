import { NextRequest, NextResponse } from "next/server";

const MAJOR_TEAMS = [
  "india", "australia", "england", "pakistan", "south africa",
  "new zealand", "sri lanka", "west indies", "bangladesh",
  "zimbabwe", "afghanistan", "ireland", "mumbai indians",
  "chennai super kings", "royal challengers", "kolkata knight",
  "sunrisers", "delhi capitals", "punjab kings", "rajasthan royals"
];

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/teams?apikey=${process.env.CRICKET_API_KEY}&offset=0`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    const all = data.data || [];
    const filtered = all.filter((t: any) => {
      const name = (t.name || "").toLowerCase();
      return MAJOR_TEAMS.some((k) => name.includes(k));
    });
    return NextResponse.json({ data: filtered });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
  }
}