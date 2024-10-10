import React, { useState, useEffect } from "react";
import Nft1 from "../public/NFT1.png";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";

export default function categoryList() {
  const SellNft = useSelector((state) => state.data.SellNft);
  const [nftList, setNftList] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    setNftList(SellNft);

    const countCollectionTypes = (data) => {
      return data.reduce((acc, item) => {
        // Check if the collection type already exists in the accumulator
        if (acc[item.collectionType]) {
          acc[item.collectionType]++;
        } else {
          acc[item.collectionType] = 1;
        }
        return acc;
      }, {});
    };

    // Usage
    const collectionCount = countCollectionTypes(SellNft);
    setCount(collectionCount);
  }, [SellNft]);

  return (
    <div className="flex flex-col justify-center gap-4 w-full">
      <h2 className="text-4xl sm:text-5xl font-bold">Browse by Category</h2>
      <p className="mb-[2rem]">
        Explore the NFTs in the most featured categories.
      </p>
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}
      >
        {["Animal", "Sport", "Gaming", "Art", "Photography", "Fashion"].map(
          (item, index) => (
            <Link
              key={index}
              href="/collection/sds"
              className="flex flex-col items-center justify-center gap-3 w-full"
            >
              <Image
                src={Nft1}
                alt="category"
                className="w-full h-[200px] object-cover rounded-[5px]"
              />
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="w-[40px] h-[40px] rounded-[300px] bg-[#ECDFCC]"></div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-xl">{item}</h4>
                  <p className="text-md">{count[item] || 0} NFTs</p>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
