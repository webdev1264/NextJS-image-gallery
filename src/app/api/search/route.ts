import { UnsplashSearchResponse } from "@/models/unshplash-image";
import { NextResponse } from "next/server";

const clientId = process.env.UNSPLASH_ACCESS_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 404 });
  }
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${clientId}`;
  const response = await fetch(url);
  const data: UnsplashSearchResponse = await response.json();
  return NextResponse.json(data, { status: 200 });
}
