import React from "react";
import Nft1 from "../public/NFT1.png";
import Image from "next/image";

export default function collectionDetail() {
  return (
    <div className="border-[2px] border-[#ECDFCC] rounded-[15px] p-6 flex items-center gap-6 mb-[2rem] w-full">
      <Image
        src={Nft1}
        alt="nft1"
        className="w-[300px] h-full object-cover rounded-[15px]"
      />
      <div className="flex flex-col justify-center gap-5">
        <h1 className="text-5xl font-bold">Awesome NFTs Collection</h1>
        <p>
          Karafuru is home to 5,555 generative arts where colors reign supreme.
          Leave the drab reality and enter the world od karafuru by Museum of
          Toys
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 flex flex-col items-center justify-center gap-4 border-[2px] border-[#ECDFCC] rounded-[15px]">
            <p>Total Volume</p>
            <div className="flex flex-col items-center justify-center gap-1">
              <h3 className="text-xl font-bold">100 Sepolia ETH</h3>
              <p>+2.11%</p>
            </div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center gap-4 border-[2px] border-[#ECDFCC] rounded-[15px]">
            <p>Floor Price</p>
            <div className="flex flex-col items-center justify-center gap-1">
              <h3 className="text-xl font-bold">0.003 Sepolia ETH</h3>
              <p>+2.11%</p>
            </div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center gap-4 border-[2px] border-[#ECDFCC] rounded-[15px]">
            <p>Best offer</p>
            <div className="flex flex-col items-center justify-center gap-1">
              <h3 className="text-xl font-bold">12 Sepolia ETH</h3>
              <p>+2.11%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
