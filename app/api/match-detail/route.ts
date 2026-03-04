import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiKey = process.env.CRICKET_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Get the match ID from the URL query parameter
    // e.g. /api/match-detail?id=abc123
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get("id");

    if (!matchId) {
      return NextResponse.json(
        { error: "Match ID required" },
        { status: 400 }
      );
    }

    // Fetch specific match details from CricketData API
    const response = await fetch(
      `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&id=${matchId}`,
      { next: { revalidate: 30 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch match details");
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch match details" },
      { status: 500 }
    );
  }
}