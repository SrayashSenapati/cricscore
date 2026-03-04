import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.CRICKET_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`,
      { next: { revalidate: 30 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch matches");
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cricket data" },
      { status: 500 }
    );
  }
}