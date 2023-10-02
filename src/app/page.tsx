"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import KanjiCard from "@/components/KanjiCard";
import Nav from "@/components/Nav";
export default function Home() {
  const [kanji, setKanji] = useState("");
  const [gifs, setGifs] = useState([]);
  const search = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/search?kanji=${kanji}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed!");
      }
      const data = await res.json();
      setGifs(data.gifs);
    } catch (error) {
      console.error(error);
    }
  };

  const copyLink = (gifUrl: string) => {
    navigator.clipboard.writeText(gifUrl);
  };

  return (
    <main className="lg:p-10 p-7 ">
      <Nav />
      <section className="py-12 flex flex-col gap-8 items-center text-center">
        <h1 className="lg:text-7xl text-5xl font-bold">Kanji Flow</h1>
        <p className="text-1xl text-muted-foreground">Explore the beauty and precision of Japanese Kanji stroke order with our GIF search engine. Watch characters come to life stroke by stroke.</p>
      </section>
      <div className="flex mt-4 gap-2 items-center justify-center">
        <Input type="text" value={kanji} onChange={(e) => setKanji(e.target.value)} className="lg:w-1/2 p-5  hover:shadow-xl  " placeholder="Search characters" theme="dark" />
        <Button onClick={search} variant="outline" size="icon" className="h-12 w-12" theme="dark" style={{ transition: "background-color 0.2s, box-shadow 0.2s" }}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <section className="results-section">
        {gifs?.map((gifUrl, index) => (
          <KanjiCard key={index} gifUrl={gifUrl} onCopyLink={() => copyLink(gifUrl)} />
        ))}
      </section>
    </main>
  );
}
