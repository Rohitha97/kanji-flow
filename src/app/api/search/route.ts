import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const kanji = req.nextUrl.searchParams.get("kanji");

  if (!kanji) {
    return new NextResponse(JSON.stringify({ message: "Kanji parameter is missing!" }), { status: 400 });
  }

  try {
    const gifs = await Promise.all([searchKanjiAlive(kanji), searchKanjiVg(kanji), searchWikimedia(kanji)]);

    const allGifs = gifs.flatMap((gif) => gif);

    console.log(allGifs);

    return new NextResponse(JSON.stringify(allGifs), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
  }
};

async function searchKanjiAlive(kanji: string) {
  const url = `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${kanji}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function searchKanjiVg(kanji: string) {
  const url = `https://kanjiapi.dev/v1/kanji/${kanji}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function searchWikimedia(kanji: string) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${kanji}&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
