import React from "react";
import Nft1 from "../public/NFT1.png";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { LuCopy } from "react-icons/lu";
import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { Skeleton } from "@mui/material";

export default function profileDetail({ details }) {
  return (
    <div className="border-[2px] sm:flex-row flex-col border-[#ECDFCC] rounded-[15px] p-6 flex items-center gap-6 mb-[2rem] w-full">
      {details.imageURI ? (
        <Image
          src={details.imageURI || Nft1}
          alt="nft1"
          className="!w-[200px] lg:!w-[300px] !h-full object-cover rounded-[15px]"
          width={300}
          height={300}
        />
      ) : (
        <Skeleton
          variant="rectangular !w-[300px] !h-[300px]"
          width={150}
          sx={{ bgcolor: "grey.300", borderRadius: "10px" }}
          height={300}
        />
      )}
      <div className="flex flex-col justify-center sm:items-start items-center gap-5">
        <h1 className="text-5xl font-bold flex items-center gap-2">
          {details.name || "Loading..."} <MdVerified />
        </h1>
        <p className="flex items-center gap-2 text-sm break-all">
          {details.accountAddress ||
            "0x0000000000000000000000000000000000000000"}{" "}
          <LuCopy />
        </p>
        <p className="sm:text-start text-center">
          {details.description || "Loading..."}
        </p>
        <div className="flex items-center gap-3">
          <div className="text-[#181C14] bg-[#ECDFCC] w-[50px] h-[50px] rounded-[100px] flex items-center justify-center">
            <Link href={details.twitter || "#"} target="_blank">
              <FaXTwitter className="text-3xl" />
            </Link>
          </div>
          <div className="text-[#181C14] bg-[#ECDFCC] w-[50px] h-[50px] rounded-[100px] flex items-center justify-center">
            <Link href={details.telegram || "#"} target="_blank">
              <IoLogoFacebook className="text-3xl" />
            </Link>
          </div>
          <div className="text-[#181C14] bg-[#ECDFCC] w-[50px] h-[50px] rounded-[100px] flex items-center justify-center">
            <Link href={details.instagram || "#"} target="_blank">
              <FaInstagram className="text-3xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
