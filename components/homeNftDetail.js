import React, { useState, useEffect } from "react";
import Image from "next/image";
import Nft1 from "../public/NFT1.png";
import Nft2 from "../public/NFT2.png";
import Nft3 from "../public/NFT3.png";
import Profile from "../public/profile.svg";
import { FaFireAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { ethers } from "ethers";

export default function HomeNftDetails({ timers }) {
  const SellNft = useSelector((state) => state.data.SellNft);
  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    setNftList(SellNft);
  }, [SellNft]);

  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive(
      active + 1 > nftList?.length - 1 ? nftList?.length - 1 : active + 1
    );
  };

  const prevSlide = () => {
    setActive(active - 1 < 0 ? 0 : active - 1);
  };

  return (
    <div className="w-full flex items-center justify-center my-8 lg:flex-row flex-col-reverse">
      <div className="lg:translate-y-[0px] translate-y-[-4rem] lg:translate-x-16 relative z-[10] p-4 bg-[#181C14] w-[80vw] sm:w-[600px] sm:justify-start justify-center flex flex-col gap-6 rounded-[30px] border-[2px] border-[#ECDFCC] min-h-[200px]">
        <h2 className="text-3xl font-bold sm:text-start text-center uppercase">
          {nftList[active]?.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 justify-center">
          <div className="flex items-center gap-2">
            <Image src={Profile} className="w-[50px]" />
            <div className="flex flex-col">
              <p>Seller</p>
              <p className="font-bold flex gap-1 items-center">
                {nftList[active]?.seller.substring(0, 3)}...
                {nftList[active]?.seller.substr(-3)} <MdVerified />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaFireAlt className="text-4xl" />
            <div className="flex flex-col">
              <p>Collection</p>
              <p className="font-bold">{nftList[active]?.collectionType}</p>
            </div>
          </div>
        </div>
        <div className="border-[2px] xs:flex-row flex-col rounded-[5px] border-[#3C3D37] p-3 flex gap-4 items-center">
          <div className="bg-[#3C3D37] py-2 px-4 rounded-[5px]">
            Current Price
          </div>
          <p>
            {nftList[active]?.price
              ? ethers.formatEther(BigInt(nftList[active]?.price))
              : "0"}{" "}
            SepoliaETH
          </p>
        </div>
        <div className="flex items-center sm:justify-start justify-center gap-2">
          <MdOutlineTimer className="text-2xl" />
          <p>Auction ending in</p>
        </div>
        <div className="flex sm:justify-start justify-center items-center gap-6">
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-2xl">
              {timers[active]?.days < 10
                ? "0" + timers[active]?.days
                : timers[active]?.days}
            </p>
            <p>Days</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-2xl">
              {timers[active]?.hours < 10
                ? "0" + timers[active]?.hours
                : timers[active]?.hours}
            </p>
            <p>Hours</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-2xl">
              {timers[active]?.mins < 10
                ? "0" + timers[active]?.mins
                : timers[active]?.mins}
            </p>
            <p>Mins</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-2xl">
              {timers[active]?.secs < 10
                ? "0" + timers[active]?.secs
                : timers[active]?.secs}
            </p>
            <p>Secs</p>
          </div>
        </div>
        <div className="w-full h-[2px] bg-[#3C3D37]"></div>
        <div className="w-full flex items-center justify-center gap-8">
          <Link
            href={`/nft/${nftList[active]?.tokenId}`}
            className="bg-[#ECDFCC] text-[#181C14] px-6 py-2 rounded-[100px]"
          >
            Place
          </Link>
          <Link
            href={`/nft/${nftList[active]?.tokenId}`}
            className="bg-[#ECDFCC] text-[#181C14] px-6 py-2 rounded-[100px]"
          >
            View
          </Link>
        </div>
        <div className="flex items-center gap-8">
          {active !== 0 ? (
            <FaAngleDoubleLeft
              className="text-4xl cursor-pointer"
              onClick={prevSlide}
            />
          ) : (
            <FaAngleDoubleLeft className="text-4xl opacity-50" />
          )}
          {active !== nftList?.length - 1 ? (
            <FaAngleDoubleRight
              className="text-4xl cursor-pointer"
              onClick={nextSlide}
            />
          ) : (
            <FaAngleDoubleRight className="text-4xl opacity-50" />
          )}
        </div>
      </div>
      <div className="lg:-translate-x-16 lg:translate-y-0 translate-y-[4rem] p-2 rounded-[30px] border-[2px] border-[#ECDFCC]">
        {nftList?.length > 0 ? (
          <Image
            src={nftList[active]?.imageURI}
            className="rounded-[30px] w-[700px] !h-[700px] object-cover"
            width={700}
            height={700}
          ></Image>
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: "grey.300", borderRadius: "20px" }}
            width={700}
            height={700}
          />
        )}
      </div>
    </div>
  );
}
