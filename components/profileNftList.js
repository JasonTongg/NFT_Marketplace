import React, { useState } from "react";
import Nft1 from "../public/NFT1.png";
import { FaRegHeart } from "react-icons/fa6";
import Profile from "../public/profile.svg";
import { LuTimer } from "react-icons/lu";

export default function profileNftList() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col w-full gap-2 justify-center mb-[3rem]">
      <div className="flex items-center gap-8 my-8">
        <p
          style={{
            color: `${active === 0 ? "#181C14" : "#ECDFCC"}`,
            backgroundColor: `${active === 0 ? "#ECDFCC" : "transparent"}`,
          }}
          onClick={() => setActive(0)}
          className="cursor-pointer rounded-[100px] text-lg px-4 py-2 border-[2px] border-[#ECDFCC]"
        >
          Listed NFTs
        </p>
        <p
          style={{
            color: `${active === 1 ? "#181C14" : "#ECDFCC"}`,
            backgroundColor: `${active === 1 ? "#ECDFCC" : "transparent"}`,
          }}
          onClick={() => setActive(1)}
          className="cursor-pointer rounded-[100px] text-lg px-4 py-2 border-[2px] border-[#ECDFCC]"
        >
          Own NFT
        </p>
        <p
          style={{
            color: `${active === 2 ? "#181C14" : "#ECDFCC"}`,
            backgroundColor: `${active === 2 ? "#ECDFCC" : "transparent"}`,
          }}
          onClick={() => setActive(2)}
          className="cursor-pointer rounded-[100px] text-lg px-4 py-2 border-[2px] border-[#ECDFCC]"
        >
          Liked
        </p>
        <p
          style={{
            color: `${active === 3 ? "#181C14" : "#ECDFCC"}`,
            backgroundColor: `${active === 3 ? "#ECDFCC" : "transparent"}`,
          }}
          onClick={() => setActive(3)}
          className="cursor-pointer rounded-[100px] text-lg px-4 py-2 border-[2px] border-[#ECDFCC]"
        >
          Following
        </p>
        <p
          style={{
            color: `${active === 4 ? "#181C14" : "#ECDFCC"}`,
            backgroundColor: `${active === 4 ? "#ECDFCC" : "transparent"}`,
          }}
          onClick={() => setActive(4)}
          className="cursor-pointer rounded-[100px] text-lg px-4 py-2 border-[2px] border-[#ECDFCC]"
        >
          Followers
        </p>
      </div>
      <div
        className="grid gap-x-6 gap-y-12"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {Array.from({ length: 15 }).map((item, index) => (
          <div className="flex flex-col items-center justify-center gap-4">
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
            <h2 className="text-2xl font-bold">Time Traval</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
