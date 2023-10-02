"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export default function SearchBar() {
  const [kanji, setKanji] = useState("");
  const [gifs, setGifs] = useState([]);

  const search = async () => {
    const res = await fetch(`/api/search?kanji=${kanji}`);
    const data = await res.json();
    setGifs(data.gifs);
  };

  const copyLink = (gifUrl: string) => {
    navigator.clipboard.writeText(gifUrl);
  };
  return (
    <>
      <Input type="text" value={kanji} onChange={(e) => setKanji(e.target.value)} className="lg:w-1/2 p-5  hover:shadow-xl  " placeholder="Search characters" theme="dark" />
      <Button onClick={search} variant="outline" size="icon" className="h-12 w-12" theme="dark" style={{ transition: "background-color 0.2s, box-shadow 0.2s" }}>
        <Search className="h-4 w-4" />
      </Button>
    </>
  );
}
