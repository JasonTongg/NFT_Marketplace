import React, { useState } from "react";
import Nft1 from "../public/NFT1.png";
import { FaRegHeart } from "react-icons/fa6";
import Profile from "../public/profile.svg";
import { LuTimer } from "react-icons/lu";
import Link from "next/link";
import { ethers } from "ethers";
import Skeleton from "@mui/material/Skeleton";

export default function collectionList({ nftList }) {
  const [category, setCategory] = useState("NFTs");
  return (
    <div className="flex flex-col w-full gap-2 justify-center mb-[3rem]">
      <div
        className="grid gap-x-6 gap-y-12"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {nftList?.length > 0
          ? nftList.map((item, index) => (
              <Link
                href={`/nft/${item?.tokenId}`}
                className="flex flex-col items-center justify-center gap-4"
              >
                <div
                  key={index}
                  className="rounded-[20px] object-cover relative w-full h-[200px] bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: `url('${item?.imageURI}')` }}
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
                  <p className="text-center">
                    {item?.price
                      ? ethers.formatUnits(BigInt(item?.price), "gwei")
                      : "0"}{" "}
                    SepoliaETH
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <LuTimer />
                  <p>2 hours left</p>
                </div>
              </Link>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular !w-full !h-[200px]"
                width={700}
                sx={{ bgcolor: "grey.300", borderRadius: "10px" }}
                height={200}
              />
            ))}
      </div>
    </div>
  );
}
