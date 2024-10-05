import React, { useState } from "react";
import Image from "next/image";
import Nft1 from "../public/NFT1.png";
import Nft2 from "../public/NFT2.png";
import Nft3 from "../public/NFT3.png";
import Profile from "../public/profile.svg";
import { FaFireAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

export default function HomeNftDetails() {
  const [nftList, seetNftList] = useState([
    {
      image: <Image src={Nft1} className="rounded-[30px] w-[700px]"></Image>,
    },
    {
      image: <Image src={Nft2} className="rounded-[30px] w-[700px]"></Image>,
    },
    {
      image: <Image src={Nft3} className="rounded-[30px] w-[700px]"></Image>,
    },
  ]);

  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive(
      active + 1 > nftList.length - 1 ? nftList.length - 1 : active + 1
    );
  };

  const prevSlide = () => {
    setActive(active - 1 < 0 ? 0 : active - 1);
  };
  return (
    <div className="w-full flex items-center justify-center my-8 lg:flex-row flex-col-reverse">
      <div className="lg:translate-y-[0px] translate-y-[-4rem] lg:translate-x-16 relative z-[10] p-4 bg-[#181C14] w-[80vw] sm:w-[600px] sm:justify-start justify-center flex flex-col gap-6 rounded-[30px] border-[2px] border-[#ECDFCC] min-h-[200px]">
        <h2 className="text-3xl font-bold sm:text-start text-center">
          Hello NFT
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 justify-center">
          <div className="flex items-center gap-2">
            <Image src={Profile} className="w-[50px]" />
            <div className="flex flex-col">
              <p>Creator</p>
              <p className="font-bold flex gap-1 items-center">
                Daulat Hussain <MdVerified />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaFireAlt className="text-4xl" />
            <div className="flex flex-col">
              <p>Collection</p>
              <p className="font-bold">GYM</p>
            </div>
          </div>
        </div>
        <div className="border-[2px] xs:flex-row flex-col rounded-[5px] border-[#3C3D37] p-3 flex gap-4 items-center">
          <div className="bg-[#3C3D37] py-2 px-4 rounded-[5px]">
            Current Bet
          </div>
          <p>0.0003 SepoliaETH</p>
        </div>
        <div className="flex items-center sm:justify-start justify-center gap-2">
          <MdOutlineTimer className="text-2xl" />
          <p>Auction ending in</p>
        </div>
        <div className="flex sm:justify-start justify-center items-center gap-6">
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-2xl">21</p>
            <p>Days</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-2xl">10</p>
            <p>Hours</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-2xl">23</p>
            <p>Mins</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-2xl">11</p>
            <p>Secs</p>
          </div>
        </div>
        <div className="w-full h-[2px] bg-[#3C3D37]"></div>
        <div className="w-full flex items-center justify-center gap-8">
          <button className="bg-[#ECDFCC] text-[#181C14] px-6 py-2 rounded-[100px]">
            Place
          </button>
          <button className="bg-[#ECDFCC] text-[#181C14] px-6 py-2 rounded-[100px]">
            View
          </button>
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
          {active !== nftList.length - 1 ? (
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
        {nftList[active].image}
      </div>
    </div>
  );
}
