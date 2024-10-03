import React from "react";
import Nft1 from "../public/NFT1.png";
import Image from "next/image";

export default function categoryList() {
  return (
    <div className="flex flex-col justify-center gap-4 w-full">
      <h2 className="text-5xl font-bold">Browse by Category</h2>
      <p className="mb-[2rem]">
        Explore the NFTs in the most featured categories.
      </p>
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
      >
        {Array.from({ length: 11 }).map((item, index) => (
          <div className="flex flex-col items-center justify-center gap-3 w-full">
            <Image
              src={Nft1}
              alt="category"
              className="w-full h-[100px] object-cover rounded-[5px]"
            />
            <div className="flex items-center gap-3 w-full justify-center">
              <div className="w-[40px] h-[40px] rounded-[300px] bg-[#ECDFCC]"></div>
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-xl">Sports</h4>
                <p className="text-md">2995 NFTs</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
