import React from "react";
import { LiaEthereum } from "react-icons/lia";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: theme.typography.pxToRem(12),
    padding: 0,
  },
}));

export default function navbar({
  address,
  isConnected,
  connectWallet,
  openAddress,
}) {
  return (
    <div className="w-full py-4 flex items-center justify-center sm:justify-between gap-4">
      <Link href="/" className="sm:block hidden">
        <LiaEthereum className="text-5xl" />
      </Link>
      <div className="flex items-center justify-between sm:justify-center gap-4 xs:gap-12">
        <HtmlTooltip
          title={
            <div className="border-[#ECDFCC] bg-[#181C14] border-[2px] rounded-[10px] flex flex-col items-center justify-center gap-3 py-3 px-2">
              {[
                { title: "Collection", href: "#" },
                { title: "Search", href: "#" },
                { title: "Author Profile", href: "#" },
                { title: "NFT Details", href: "#" },
                { title: "Account Setting", href: "#" },
                { title: "Upload NFT", href: "#" },
              ].map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="text-[#ECDFCC] w-[250px] hover:text-[#181C14] hover:bg-[#ECDFCC] transition-all ease-out px-3 py-1 text-lg rounded-[10px] cursor-pointer"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          }
        >
          <button className="hover-effect">Discover</button>
        </HtmlTooltip>
        <button className="hover-effect">Create</button>
        {isConnected ? (
          <button onClick={openAddress} className="hover-button">
            {address.substring(0, 5)}...{address.substr(-5)}
          </button>
        ) : (
          <button onClick={connectWallet} className="hover-button">
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
