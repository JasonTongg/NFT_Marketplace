import React, { useState, useEffect } from "react";
import Nft1 from "../public/NFT1.png";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import Sport from "../public/SPORT.png";
import Art from "../public/ART.png";
import Gaming from "../public/GAMING.png";
import Photography from "../public/PHOTOGRAPHY.png";
import Fashion from "../public/FASHION.png";
import Animal from "../public/ANIMAL.png";

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

  const getImage = (type) => {
    console.log(type);
    if (type === "Animal") return Animal;
    else if (type === "Sport") return Sport;
    else if (type === "Gaming") return Gaming;
    else if (type === "Art") return Art;
    else if (type === "Photography") return Photography;
    else if (type === "Fashion") return Fashion;
  };

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
              href={`/collection/${item}`.toLowerCase()}
              className="flex flex-col items-center justify-center gap-3 w-full"
            >
              <Image
                src={getImage(item)}
                alt="category"
                className="w-full h-[200px] object-cover rounded-[5px]"
              />
              <div className="flex items-center justify-center w-full gap-4">
                <h4 className="font-bold text-xl">{item}</h4>
                <p className="text-md">{count[item] || 0} NFTs</p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
