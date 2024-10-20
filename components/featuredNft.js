import React, { useEffect, useState } from "react";
import Nft1 from "../public/NFT1.png";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import Skeleton from "@mui/material/Skeleton";

export default function featuredNft({ timers }) {
  const [category, setCategory] = useState("NFTs");
  const SellNft = useSelector((state) => state.data.SellNft);
  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    setNftList(SellNft);

    if (category !== "NFTs") {
      setNftList(SellNft.filter((item) => item.collectionType === category));
    }
  }, [SellNft, category]);

  return (
    <div className="flex flex-col items-start justify-center gap-4 w-full">
      <h2 className="text-4xl sm:text-5xl font-bold">Featured NFTs</h2>
      <p>Discover the most outstanding NFTs in all topics of life.</p>
      <div className="flex items-center justify-center gap-x-8 md:gap-x-16 gap-y-4 my-8 flex-wrap">
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
          onClick={() => setCategory("Animal")}
          style={{
            color: `${category === "Animal" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center"
        >
          Animal
        </p>
        <p
          onClick={() => setCategory("Sport")}
          style={{
            color: `${category === "Sport" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center transition-all"
        >
          Sport
        </p>
        <p
          onClick={() => setCategory("Gaming")}
          style={{
            color: `${category === "Gaming" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center"
        >
          Gaming
        </p>
        <p
          onClick={() => setCategory("Art")}
          style={{
            color: `${category === "Art" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center"
        >
          Art
        </p>
        <p
          onClick={() => setCategory("Photography")}
          style={{
            color: `${category === "Photography" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center"
        >
          Photography
        </p>
        <p
          onClick={() => setCategory("Fashion")}
          style={{
            color: `${category === "Fashion" ? "#ECDFCC" : "#697565"}`,
          }}
          className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center"
        >
          Fashion
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        {nftList?.length > 0
          ? nftList.map((item, index) => (
              <Link
                key={index}
                className="bg-no-repeat cursor-pointer bg-cover bg-center w-full h-[400px] rounded-[10px] relative"
                style={{ backgroundImage: `url(${item.imageURI})` }}
                href={`/nft/${item.tokenId}`}
              >
                <div className="absolute flex items-center justify-center gap-2 top-[20px] left-[20px] px-4 py-1 cursor-pointer rounded-[15px] bg-[#ECDFCC] text-[#181C14]">
                  <IoIosHeartEmpty className="text-lg" />
                  <p>22</p>
                </div>
                <div className="absolute top-0 right-0 w-[190px] flex flex-col items-end justify-center bg-[#181C14] py-2 px-8 rounded-bl-[300px]">
                  <p className="text-sm">Remaining Time</p>
                  <p className="text-xl font-bold">
                    {timers[index]?.hours + timers[index]?.days * 24 < 10
                      ? "0" + timers[index]?.hours + timers[index]?.days * 24
                      : timers[index]?.hours + timers[index]?.days * 24}
                    h:
                    {timers[index]?.mins < 10
                      ? "0" + timers[index]?.mins
                      : timers[index]?.mins}
                    m:
                    {timers[index]?.secs < 10
                      ? "0" + timers[index]?.secs
                      : timers[index]?.secs}
                    s
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full flex flex-col items-start justify-center bg-[#181C14] p-2 gap-2 rounded-tr-[300px]">
                  <p className="text-2xl font-bold">
                    {item.name} #{item.tokenId}
                  </p>
                  <div className="border-[2px] w-[90%] border-[#3C3D37] rounded-[15px] p-3 flex items-center gap-2">
                    <div className="bg-[#3C3D37] py-2 px-4">Current Bid</div>
                    <p>
                      {item?.price
                        ? ethers.formatEther(BigInt(item?.price))
                        : "0"}{" "}
                      SepoliaETH
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular !w-full !h-[400px]"
                width={700}
                sx={{ bgcolor: "grey.300", borderRadius: "10px" }}
                height={700}
              />
            ))}
      </div>
    </div>
  );
}
