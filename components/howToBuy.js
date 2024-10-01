import React from "react";
import Wallet from "../public/wallet.svg";
import Discover from "../public/discover.svg";
import Buy from "../public/buy.svg";
import Sell from "../public/sell.svg";
import Image from "next/image";

export default function howToBuy() {
  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-8 my-8">
      {[
        { title: "Connect Wallet" },
        { title: "Filter & Discover" },
        { title: "Buy NFTS" },
        { title: "Sell and Profit" },
      ].map((item, index) => (
        <div
          key={index}
          className="min-w-[220px] flex flex-col items-center justify-center gap-4"
        >
          {item.title === "Connect Wallet" ? (
            <Image src={Wallet} className="w-[100px] mb-[1rem]" />
          ) : item.title === "Filter & Discover" ? (
            <Image src={Discover} className="w-[100px] mb-[1rem]" />
          ) : item.title === "Buy NFTS" ? (
            <Image src={Buy} className="w-[100px] mb-[1rem]" />
          ) : item.title === "Sell and Profit" ? (
            <Image src={Sell} className="w-[100px] mb-[1rem]" />
          ) : (
            ""
          )}
          <p className="py-1 px-4 bg-[#ECDFCC] rounded-[50px] text-[#181C14]">
            Step {index + 1}
          </p>
          <h2 className="font-bold text-lg">{item.title}</h2>
          <p className="w-[220px] text-justify">
            Connect with wallet, discover, buy NFTS, sell your NFTS and earn
            money
          </p>
        </div>
      ))}
    </div>
  );
}
