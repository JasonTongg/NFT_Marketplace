import React from "react";
import Nft1 from "../public/NFT1.png";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { LuCopy } from "react-icons/lu";
import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function profileDetail() {
  return (
    <div className="border-[2px] border-[#ECDFCC] rounded-[15px] p-6 flex items-center gap-6 mb-[2rem] w-full">
      <Image
        src={Nft1}
        alt="nft1"
        className="w-[300px] h-full object-cover rounded-[15px]"
      />
      <div className="flex flex-col justify-center gap-5">
        <h1 className="text-5xl font-bold flex items-center gap-2">
          Jason <MdVerified />
        </h1>
        <p className="flex items-center gap-2 text-sm">
          0x0000000000000000000000000000000000000000 <LuCopy />
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius
          quisquam ratione quidem incidunt. Necessitatibus earum sint quas
          nostrum. Cumque perspiciatis iusto saepe doloremque dolores commodi
          nisi laudantium assumenda magnam ut.
        </p>
        <div className="flex items-center gap-3">
          <div className="text-[#181C14] bg-[#ECDFCC] w-[50px] h-[50px] rounded-[100px] flex items-center justify-center">
            <FaXTwitter className="text-3xl" />
          </div>
          <div className="text-[#181C14] bg-[#ECDFCC] w-[50px] h-[50px] rounded-[100px] flex items-center justify-center">
            <IoLogoFacebook className="text-3xl" />
          </div>
          <div className="text-[#181C14] bg-[#ECDFCC] w-[50px] h-[50px] rounded-[100px] flex items-center justify-center">
            <FaInstagram className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
