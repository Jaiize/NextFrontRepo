import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export async function GET(req: NextRequest) {
  const API_KEY = process.env.RAWG_API_KEY;
  try {
    const { searchParams } = new URL(req.url)
    const pageNum = searchParams.get('page') || '1'
    const search = searchParams.get('search') || ''
    const pageSize = searchParams.get('page_size') || '40'
    const order = searchParams.get('ordering') || ''

    const url = new URL('https://api.rawg.io/api/games')
    url.searchParams.set('key', (API_KEY as string))
    url.searchParams.set('page', pageNum)
    url.searchParams.set('search', search)
    url.searchParams.set('page_size', pageSize)
    url.searchParams.set('ordering', order)

    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (!res.ok) {
      const er = res.text();
      console.error("RAWG API ERROR: ", er);
      return NextResponse.json(
        {
          message: "Something went wrong and could not get a proper response",
        },
        { status: res.status, statusText: res.statusText },
      );
    }
    const fetched = await res.json();
    return NextResponse.json(fetched);
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
