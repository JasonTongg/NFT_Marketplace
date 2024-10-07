import React from "react";
import { LiaEthereum } from "react-icons/lia";
import Link from "next/link";

export default function footer() {
  return (
    <div className="bg-[#3C3D37] flex flex-col items-center justify-center gap-2 px-16 py-6 w-full">
      <div className=" flex justify-center gap-x-16 gap-y-6 w-full flex-wrap">
        <div className="flex gap-3">
          <LiaEthereum className="text-6xl" />
          <p className="text-justify w-[250px]">
            The best digital marketplace for crypto collectibles and
            non-fungible tokens (NFTs). Buy, Sell, and discover exclusive
            digital items.
          </p>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <h2 className="font-bold text-xl text-center">Discover</h2>
          <div className="grid grid-cols-2 gap-2 justify-center justify-items-center">
            {[
              { title: "Search", href: "/search" },
              { title: "Author Profile", href: "/profile/sdasd" },
              { title: "Account Setting", href: "/profile/setting" },
              { title: "Upload NFT", href: "/nft/new" },
            ].map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="text-center hover-effect"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <h2 className="font-bold text-xl text-center">Help Center</h2>
          {[
            { title: "About Us", href: "/about" },
            { title: "Contact Us", href: "/contactus" },
          ].map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="text-center hover-effect"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <p className="flex items-center justify-center gap-1 mt-[1rem]">
        Make with <span className="text-red-600 text-3xl">&hearts;</span> by{" "}
        <span className="font-bold">Jason</span>
      </p>
    </div>
  );
}
