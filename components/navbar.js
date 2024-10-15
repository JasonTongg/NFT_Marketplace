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
import { CgProfile } from "react-icons/cg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  return (
    <div className="w-full py-4 flex items-center justify-center sm:justify-between gap-4">
      <Link href="/" className="sm:block hidden">
        <LiaEthereum className="text-5xl" />
      </Link>
      <ToastContainer></ToastContainer>
      <div className="flex items-center justify-between sm:justify-center gap-4 xs:gap-12">
        <button className="hover-effect" onMouseOver={handleClick2}>
          Discover
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div className="bg-[#ECDFCC] text-[#181C14]">
            {[
              { title: "Search", href: "/search" },
              { title: "Author Profile", href: `/profile/${address}` },
              { title: "Account Setting", href: "/profile/setting" },
              { title: "Upload NFT", href: "/nft/new" },
              { title: "About Us", href: "/about" },
              { title: "Contact Us", href: "/contactus" },
            ].map((item, index) => (
              <Link href={item.href} key={index}>
                <MenuItem onClick={handleClose2}>{item.title}</MenuItem>
              </Link>
            ))}
          </div>
        </Menu>
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
        {isConnected && (
          <button onMouseOver={handleClick}>
            <CgProfile className="text-4xl cursor-pointer" />
          </button>
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div className="bg-[#ECDFCC] text-[#181C14]">
            <Link href={`/profile/${address}`}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <Link href="/profile/setting">
              <MenuItem onClick={handleClose}>Setting</MenuItem>
            </Link>
          </div>
        </Menu>
      </div>
    </div>
  );
}
