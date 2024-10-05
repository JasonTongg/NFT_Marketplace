import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "../public/HeroImage.png";

export default function hero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-8">
      <div className="flex flex-col gap-5 lg:items-start items-center">
        <h1 className="text-3xl lg:text-6xl font-bold lg:text-start text-center">
          Discover, collect and sell NFT 🖼️
        </h1>
        <p className="lg:text-start text-center">
          Discover the most outstanding NFTs in all topics of life. Creative
          your NFTs and sell them.
        </p>
        <Link href="#" className="hover-button">
          Start your search
        </Link>
      </div>
      <div className="lg:block flex lg:justify-start justify-center lg:row-start-auto row-start-1">
        <Image src={HeroImage} className="w-[70vw] sm:w-[40vw] lg:w-[500px]" />
      </div>
    </div>
  );
}
