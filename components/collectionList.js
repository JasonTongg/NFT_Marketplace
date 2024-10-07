import React, { useState } from "react";
import Nft1 from "../public/NFT1.png";
import { FaRegHeart } from "react-icons/fa6";
import Profile from "../public/profile.svg";
import { LuTimer } from "react-icons/lu";
import Link from "next/link";

export default function collectionList() {
  const [category, setCategory] = useState("NFTs");
  return (
    <div className="flex flex-col w-full gap-2 justify-center mb-[3rem]">
      <div className="flex items-center gap-y-4 gap-x-16 my-8 flex-wrap">
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
      <div
        className="grid gap-x-6 gap-y-12"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {Array.from({ length: 15 }).map((item, index) => (
          <Link
            href="/nft/sjdhb"
            className="flex flex-col items-center justify-center gap-4"
          >
            <div
              key={index}
              className="rounded-[20px] object-cover relative w-full h-[200px] bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url('${Nft1.src}')` }}
            >
              <div className="px-4 py-1 rounded-[20px] absolute top-[10px] right-[10px] flex items-center justify-center gap-2 bg-[#ECDFCC] text-[#181C14]">
                <FaRegHeart />
                <p>22</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-no-repeat bg-cover bg-center border-[2px] border-[#ECDFCC] rounded-[100px] w-[20px] h-[20px]"
                    style={{ backgroundImage: `url('${Profile.src}')` }}
                  ></div>
                ))}
              </div>
              <p>50</p>
            </div>
            <div className="p-2 rounded-[10px] border-[2px] border-[#ECDFCC] flex items-center justify-center w-full gap-3">
              <div className="text-center rounded-[10px] bg-[#ECDFCC] py-1 px-4 text-[#181C14]">
                Current Bid
              </div>
              <p className="text-center">0.002 SepoliaETH</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <LuTimer />
              <p>2 hours left</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
