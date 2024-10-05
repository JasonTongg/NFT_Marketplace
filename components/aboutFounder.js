import React from "react";
import ElonMusk from "../public/Elon_Musk_Royal_Society.webp";
import Image from "next/image";

export default function aboutFounder() {
  return (
    <div className="flex flex-col items-center mt-[2rem] justify-center gap-3 w-full min-h-[70vh]">
      <h2 className="text-5xl font-bold">🤓 Founder</h2>
      <p className="w-[85vw] md:w-[50%] text-center mb-[1rem]">
        We're impartial and independent, everyday we create distinctive
        world-class programmes and content
      </p>
      <div className="bg-[#ECDFCC] rounded-[20px] p-3 flex flex-col items-center justify-center gap-2 w-fit text-[#181C14]">
        <Image
          src={ElonMusk}
          alt="sdvsd"
          className="w-[200px] rounded-[20px]"
        />
        <h2 className="text-5xl font-bold">Jason</h2>
        <p>This Project Creator</p>
      </div>
    </div>
  );
}
