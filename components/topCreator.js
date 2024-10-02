import React, { useState } from "react";
import Profile from "../public/profile.svg";
import Image from "next/image";
import { RiMedalLine } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import Nft1 from "../public/NFT1.png";

export default function topCreator() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-5xl font-bold">Top Creator List</h2>
      <div className="border-[2px] border-[#ECDFCC] rounded-[15px] p-2">
        <button
          className="rounded-[15px] transition-all ease-out py-2 px-4"
          style={{
            backgroundColor: `${active === 0 ? "#ECDFCC" : "#181C14"}`,
            color: `${active === 0 ? "#181C14" : "#ECDFCC"}`,
          }}
          onClick={() => setActive(0)}
        >
          Popular
        </button>
        <button
          className="rounded-[15px] transition-all ease-out py-2 px-4"
          style={{
            backgroundColor: `${active === 1 ? "#ECDFCC" : "#181C14"}`,
            color: `${active === 1 ? "#181C14" : "#ECDFCC"}`,
          }}
          onClick={() => setActive(1)}
        >
          Following
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {[0, 0, 0, 0].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-10"
          >
            <div
              className="bg-no-repeat bg-cover bg-center w-[300px] h-[200px] rounded-[10px] relative"
              style={{ backgroundImage: `url(${Nft1.src})` }}
            >
              <Image
                src={Profile}
                className="rounded-[60px] absolute bottom-0 left-1/2 translate-y-[50%] translate-x-[-50%] w-[65px] border-[8px] border-[#181C14]"
              />
              <div className="text-[#181C14] flex items-center justify-center gap-2 bg-[#ECDFCC] py-1 px-4 rounded-[15px] absolute top-[20px] left-[20px]">
                <p>#{index + 1}</p>
                <RiMedalLine className="text-xl" />
              </div>
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <div className="flex flex-col justify-center">
                <p className="font-bold flex items-center gap-1">
                  0x000000 <MdVerified />
                </p>
                <p>0.0003 Sepolia ETH</p>
              </div>
              <button className="bg-[#ECDFCC] text-[#181C14] px-4 py-2 rounded-[15px]">
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-[#ECDFCC] text-[#181C14] px-4 py-2 rounded-[15px]">
        Become Author
      </button>
    </div>
  );
}
