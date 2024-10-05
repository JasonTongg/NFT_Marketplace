import React from "react";
import Nft1 from "../public/NFT1.png";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

export default function featuredNft() {
  return (
    <div className="flex flex-col items-start justify-center gap-4 w-full">
      <h2 className="text-4xl sm:text-5xl font-bold">Featured NFTs</h2>
      <p>Discover the most outstanding NFTs in all topics of life.</p>
      <div className="flex items-center justify-center gap-x-8 md:gap-x-16 gap-y-4 my-8 flex-wrap">
        <p className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center">
          NFTs
        </p>
        <p className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center">
          Arts
        </p>
        <p className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center">
          Musics
        </p>
        <p className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center">
          Sports
        </p>
        <p className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center">
          Photography
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 w-full">
        {Array.from({ length: 6 }).map((item, index) => (
          <div
            key={index}
            className="bg-no-repeat cursor-pointer bg-cover bg-center w-full h-[400px] rounded-[10px] relative"
            style={{ backgroundImage: `url(${Nft1.src})` }}
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
          </div>
        ))}
      </div>
    </div>
  );
}
