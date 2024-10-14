import React, { use, useEffect, useState } from "react";
import { LiaEthereum } from "react-icons/lia";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setToastCount } from "@/store/data";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: theme.typography.pxToRem(12),
    padding: 0,
  },
}));

export default function navbar({ connectWallet, openAddress, isConnected }) {
  const dispatch = useDispatch();
  const toastCount = useSelector((state) => state.data.toastCount);
  const address = useSelector((state) => state.data.address);
  useEffect(() => {
    if (toastCount === 0) {
      if (isConnected) {
        toast.success("Wallet Connected Successfully");
      } else {
        toast.error("Wallet Connection Failed");
        toast.error("Please try again");
      }
      dispatch(setToastCount(1));
    }
  }, []);
  return (
    <div className="w-full py-4 flex items-center justify-center sm:justify-between gap-4">
      <Link href="/" className="sm:block hidden">
        <LiaEthereum className="text-5xl" />
      </Link>
      <ToastContainer></ToastContainer>
      <div className="flex items-center justify-between sm:justify-center gap-4 xs:gap-12">
        <HtmlTooltip
          title={
            <div className="border-[#ECDFCC] bg-[#181C14] border-[2px] rounded-[10px] flex flex-col items-center justify-center gap-3 py-3 px-2">
              {[
                { title: "Search", href: "/search" },
                { title: "Author Profile", href: "/profile/sdasd" },
                { title: "Account Setting", href: "/profile/setting" },
                { title: "Upload NFT", href: "/nft/new" },
                { title: "About Us", href: "/about" },
                { title: "Contact Us", href: "/contactus" },
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
        <Link href="/nft/new" className="hover-effect">
          Create
        </Link>
        {isConnected ? (
          <button onClick={openAddress} className="hover-button">
            {address
              ? address?.substring(0, 5) + "..." + address?.substr(-5)
              : ""}
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
