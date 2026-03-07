import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get("id");

    if (!matchId) {
      return NextResponse.json({ error: "Match ID required" }, { status: 400 });
    }

    const apiKey = process.env.CRICKET_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await fetch(
      `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&id=${matchId}`,
      { next: { revalidate: 60 } }
    );

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch match details" }, { status: 500 });
  }
}