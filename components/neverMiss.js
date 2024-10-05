import React from "react";
import Image from "next/image";
import StudyVector from "../public/studyVector.svg";

export default function neverMiss() {
  return (
    <div className="flex items-center justify-center lg:flex-row flex-col-reverse gap-4 py-10">
      <div className="flex flex-col justify-center sm:items-start items-center gap-4">
        <h2 className="text-4xl sm:text-5xl font-bold lg:text-start text-center">
          Never Miss a Drop
        </h2>
        <p className="lg:text-start text-center">
          Keep following our recent NFTs so you can up to date our latest NFTs
        </p>
        <button className="bg-[#ECDFCC] text-[#181C14] px-4 py-2 rounded-[10px] lg:w-auto w-full">
          Browse NFTs
        </button>
        <button className="bg-[#ECDFCC] text-[#181C14] px-4 py-2 rounded-[10px] lg:w-auto w-full">
          Become Author
        </button>
      </div>
      <Image
        src={StudyVector}
        alt="studyVector"
        className="w-[400px] lg:w-[600px]"
      />
    </div>
  );
}
