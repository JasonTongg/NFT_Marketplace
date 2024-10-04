import React from "react";

export default function aboutFact() {
  return (
    <div className="flex flex-col gap-4 min-h-[70vh] mt-[3rem] justify-center items-center">
      <h2 className="text-5xl font-bold">🚀 Fast Facts</h2>
      <p className="w-[50%] text-center mb-[1rem]">
        We're impartial and independent, everyday we create distinctive
        world-class programmes and content
      </p>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#ECDFCC] rounded-[20px] p-3 flex flex-col items-center justify-center gap-2 w-full text-[#181C14]">
          <h2 className="text-5xl font-bold">123 NFTs</h2>
          <p className="text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="bg-[#ECDFCC] rounded-[20px] p-3 flex flex-col items-center justify-center gap-2 w-full text-[#181C14]">
          <h2 className="text-5xl font-bold">100.000</h2>
          <p className="text-center">Registered user account</p>
        </div>
        <div className="bg-[#ECDFCC] rounded-[20px] p-3 flex flex-col items-center justify-center gap-2 w-full text-[#181C14]">
          <h2 className="text-5xl font-bold">220+</h2>
          <p className="text-center">Countries and regions have our presence</p>
        </div>
      </div>
    </div>
  );
}
