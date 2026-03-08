import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/players?apikey=${process.env.CRICKET_API_KEY}&offset=0&search=${search}`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch players" }, { status: 500 });
  }
}