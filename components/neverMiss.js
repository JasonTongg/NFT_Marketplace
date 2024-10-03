import React from "react";
import Image from "next/image";
import StudyVector from "../public/studyVector.svg";

export default function neverMiss() {
  return (
    <div className="flex items-center justify-center gap-4 py-10">
      <div className="flex flex-col justify-center gap-4">
        <h2 className="text-5xl font-bold">Never Miss a Drop</h2>
        <p>
          Keep following our recent NFTs so you can up to date our latest NFTs
        </p>
        <button className="bg-[#ECDFCC] text-[#181C14] px-4 py-2 rounded-[10px]">
          Browse NFTs
        </button>
        <button className="bg-[#ECDFCC] text-[#181C14] px-4 py-2 rounded-[10px]">
          Become Author
        </button>
      </div>
      <Image src={StudyVector} alt="studyVector" className="w-[600px]" />
    </div>
  );
}
