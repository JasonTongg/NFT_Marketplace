import React, { useState } from "react";
import Nft1 from "../public/NFT1.png";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import Link from "next/link";

export default function featuredNft() {
  const [category, setCategory] = useState("NFTs");

  return (
    <div className="flex flex-col items-start justify-center gap-4 w-full">
      <h2 className="text-4xl sm:text-5xl font-bold">Featured NFTs</h2>
      <p>Discover the most outstanding NFTs in all topics of life.</p>
      <div className="flex items-center justify-center gap-x-8 md:gap-x-16 gap-y-4 my-8 flex-wrap">
        <p
          onClick={() => setCategory("NFTs")}
          style={{
            color: `${category === "NFTs" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center"
        >
          NFTs
        </p>
        <p
          onClick={() => setCategory("Arts")}
          style={{
            color: `${category === "Arts" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center transition-all"
        >
          Arts
        </p>
        <p
          onClick={() => setCategory("Musics")}
          style={{
            color: `${category === "Musics" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center"
        >
          Musics
        </p>
        <p
          onClick={() => setCategory("Sports")}
          style={{
            color: `${category === "Sports" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center"
        >
          Sports
        </p>
        <p
          onClick={() => setCategory("Photographies")}
          style={{
            color: `${category === "Photographies" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center"
        >
          Photographies
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 w-full">
        {Array.from({ length: 6 }).map((item, index) => (
          <Link
            key={index}
            className="bg-no-repeat cursor-pointer bg-cover bg-center w-full h-[400px] rounded-[10px] relative"
            style={{ backgroundImage: `url(${Nft1.src})` }}
            href="/nft/sdfsd"
          >
            <div className="absolute flex items-center justify-center gap-2 top-[20px] left-[20px] px-4 py-1 cursor-pointer rounded-[15px] bg-[#ECDFCC] text-[#181C14]">
              <IoIosHeartEmpty className="text-lg" />
              <p>22</p>
            </div>
            <div className="absolute top-0 right-0 w-[190px] flex flex-col items-end justify-center bg-[#181C14] py-2 px-8 rounded-bl-[300px]">
              <p className="text-sm">Remaining Time</p>
              <p className="text-xl font-bold">12h:19m:4s</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full sm:w-[350px] flex flex-col items-start justify-center bg-[#181C14] p-2 gap-2 rounded-tr-[300px]">
              <p className="text-2xl font-bold">Time Traval #11</p>
              <div className="border-[2px] border-[#3C3D37] rounded-[15px] p-3 flex items-center gap-2">
                <div className="bg-[#3C3D37] py-2 px-4">Current Bid</div>
                <p>0.0004 Sepolia ETH</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
