"use client";

import React from "react";
import Image from "next/image";

interface KanjiCardProps {
  gifUrl: string;
  onCopyLink: () => void;
}

const KanjiCard: React.FC<KanjiCardProps> = ({ gifUrl, onCopyLink }) => {
  return (
    <div className="kanji-card">
      <Image src={gifUrl} alt="Kanji stroke order GIF" />
      <div className="buttons">
        <button onClick={onCopyLink}>Copy Link</button>
        <a href={gifUrl} download>
          <button>Download</button>
        </a>
      </div>
    </div>
  );
};

export default KanjiCard;
