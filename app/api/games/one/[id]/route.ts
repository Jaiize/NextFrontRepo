// "use cache"
// import { cacheLife } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.RAWG_API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY cannot be fetched from environment variable");
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  
  const {id} = await params;
  
  
  try {
    // cacheLife('minutes')
    const res = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
    );
    if (!res.ok) {
      const er = res.text();
      console.error("RAWG API ERROR: ", er);
      return NextResponse.json(
        {
          message: "Something went wrong and could not get your data",
        },
        { status: res.status, statusText: res.statusText },
      );
    }
    const one = await res.json();
    return NextResponse.json(one);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "An error has occured!",
      },
      { status: 500 },
    );
  }
}
