import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "../public/HeroImage.png";

export default function hero() {
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-8">
      <div className="flex flex-col gap-5">
        <h1 className="text-6xl font-bold ">
          Discover, collect and sell NFT 🖼️
        </h1>
        <p>
          Discover the most outstanding NFTs in all topics of life. Creative
          your NFTs and sell them.
        </p>
        <Link href="#" className="hover-button">
          Start your search
        </Link>
      </div>
      <div>
        <Image src={HeroImage} className="w-[500px]" />
      </div>
    </div>
  );
}
