import React, { useEffect, useState } from "react";
import Nft1 from "../public/NFT1.png";
import { FaRegHeart } from "react-icons/fa6";
import Profile from "../public/profile.svg";
import { LuTimer } from "react-icons/lu";
import Link from "next/link";
import { Skeleton } from "@mui/material";

export default function profileNftList({
  myNftList,
  mySellNftList,
  MySellNftLoading,
  MyNftLoading,
}) {
  const [active, setActive] = useState(0);
  const [nftList, setNftList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (active === 0) {
      setNftList(mySellNftList);
      setIsLoading(MySellNftLoading);
    } else if (active === 1) {
      setNftList(myNftList);
      setIsLoading(MyNftLoading);
    } else {
      setNftList([]);
    }
  }, [active, nftList, mySellNftList, MyNftLoading, MySellNftLoading]);

  return (
    <div className="flex flex-col w-full gap-2 justify-center mb-[3rem]">
      <div className="flex items-center gap-y-4 gap-x-8 my-8 flex-wrap">
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
          Following
        </p>
        <p
          style={{
            color: `${active === 3 ? "#181C14" : "#ECDFCC"}`,
            backgroundColor: `${active === 3 ? "#ECDFCC" : "transparent"}`,
          }}
          onClick={() => setActive(3)}
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
        {isLoading === false ? (
          nftList?.length > 0 ? (
            nftList.map((item, index) => (
              <Link
                href={`/nft/${item?.tokenId}`}
                key={index}
                className="flex flex-col items-center justify-center gap-4"
              >
                <div
                  className="rounded-[20px] object-cover relative w-full h-[200px] bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: `url('${item?.imageURI}')` }}
                >
                  <div className="px-4 py-1 rounded-[20px] absolute top-[10px] right-[10px] flex items-center justify-center gap-2 bg-[#ECDFCC] text-[#181C14]">
                    <FaRegHeart />
                    <p>22</p>
                  </div>
                </div>
                <h2 className="text-2xl font-bold">{item?.name}</h2>
              </Link>
            ))
          ) : (
            <p className="min-h-[200px] flex items-center justify-center">
              You don’t have NFTs yet, Feel free to explore and dive into the
              digital seas
            </p>
          )
        ) : (
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular !w-full !h-[200px]"
              width={700}
              sx={{ bgcolor: "grey.300", borderRadius: "10px" }}
              height={200}
            />
          ))
        )}
      </div>
    </div>
  );
}
