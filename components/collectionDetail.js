import React, { useState, useEffect } from "react";
import Nft1 from "../public/NFT1.png";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { ethers } from "ethers";

export default function collectionDetail({ nftList }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);
  const [lowestPrice, setLowestPrice] = useState(0);

  useEffect(() => {
    // Convert Gwei to ETH using ethers.js
    const pricesInEth = nftList.map((item) =>
      ethers.formatUnits(item.price, "gwei")
    );

    const total = pricesInEth.reduce(
      (sum, price) => sum + parseFloat(price),
      0
    );
    const highest = Math.max(...pricesInEth.map((price) => parseFloat(price)));
    const lowest = Math.min(...pricesInEth.map((price) => parseFloat(price)));

    setTotalPrice(total);
    setHighestPrice(highest);
    setLowestPrice(lowest);
  }, [nftList]);

  return (
    <div className="border-[2px] border-[#ECDFCC] rounded-[15px] p-6 flex md:flex-row flex-col items-center gap-6 mb-[2rem] w-full">
      {nftList?.length > 0 ? (
        <Image
          src={nftList[0]?.imageURI}
          alt="nft1"
          className="w-[100%] md:w-[300px] h-[400px] md:h-full object-cover rounded-[15px]"
          width={300}
          height={400}
        />
      ) : (
        <Skeleton
          variant="rectangular !w-[400px] !h-[300px]"
          width={400}
          sx={{ bgcolor: "grey.300", borderRadius: "10px" }}
          height={200}
        />
      )}

      <div className="flex flex-col justify-center gap-5">
        <h1 className="text-4xl sm:text-5xl font-bold">{nftList[0]?.name}</h1>
        <p>
          Karafuru is home to 5,555 generative arts where colors reign supreme.
          Leave the drab reality and enter the world od karafuru by Museum of
          Toys
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 flex flex-col items-center justify-center gap-4 border-[2px] border-[#ECDFCC] rounded-[15px]">
            <p>Total Volume</p>
            <div className="flex flex-col items-center justify-center gap-1">
              <h3 className="text-xl font-bold text-center">
                {totalPrice > 0 ? totalPrice.toFixed(5) : 0} SepoliaETH
              </h3>
            </div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center gap-4 border-[2px] border-[#ECDFCC] rounded-[15px]">
            <p>Floor Price</p>
            <div className="flex flex-col items-center justify-center gap-1">
              <h3 className="text-xl font-bold text-center">
                {lowestPrice > 0 ? lowestPrice : 0} SepoliaETH
              </h3>
            </div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center gap-4 border-[2px] border-[#ECDFCC] rounded-[15px]">
            <p>Best offer</p>
            <div className="flex flex-col items-center justify-center gap-1">
              <h3 className="text-xl font-bold text-center">
                {highestPrice > 0 ? highestPrice : 0} SepoliaETH
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
