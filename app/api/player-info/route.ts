import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/players_info?apikey=${process.env.CRICKET_API_KEY}&id=${id}`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 });
  }
}