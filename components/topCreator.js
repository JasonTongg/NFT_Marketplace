import React, { useState, useEffect } from "react";
import Profile from "../public/profile.svg";
import Image from "next/image";
import { RiMedalLine } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import Nft1 from "../public/NFT1.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";

export default function topCreator({
  followAccount,
  unfollowAccount,
  follow,
  setFollow,
  loading,
}) {
  const [active, setActive] = useState(0);
  const { topCreator, followingAccount, followingAccountLoading } = useSelector(
    (state) => state.data
  );
  const [listAccount, setListAccount] = useState([]);

  const setFollowState = () => {
    const list = [
      "0x56E4CC7312BF3C0686D119c2b99FBc41CfbF25C7",
      "0xFD8FD5Ba205Bbc3a4795134A4d43B24d1d40Cb2E",
      "0xBbEbCA0F95528B8A2cF115dfB699fd7b317AFF9e",
    ];
    if (followingAccount.some((item) => item.accountAddress === list[0])) {
      let temp = [...follow];
      temp[0] = true;
      setFollow(temp);
    }
    if (followingAccount.some((item) => item.accountAddress === list[1])) {
      let temp = [...follow];
      temp[1] = true;
      setFollow(temp);
    }
    if (followingAccount.some((item) => item.accountAddress === list[2])) {
      let temp = [...follow];
      temp[2] = true;
      setFollow(temp);
    }
  };

  const changeFollow = (index) => {
    if (follow[index] === true) {
      unfollowAccount(
        topCreator[index].accountAddress,
        topCreator[index].name,
        index
      );
    } else {
      followAccount(
        topCreator[index].accountAddress,
        topCreator[index].name,
        index
      );
    }
  };

  useEffect(() => {
    setFollowState();
  }, [followingAccount]);

  useEffect(() => {
    if (active === 0) {
      setListAccount(topCreator);
    } else {
      setListAccount(
        topCreator.filter((item) =>
          followingAccount.some(
            (follow) => follow.accountAddress === item.accountAddress
          )
        )
      );
    }
  }, [active, topCreator, followingAccount]);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-4xl sm:text-5xl font-bold">Top Creator List</h2>
      <div className="border-[2px] border-[#ECDFCC] rounded-[15px] p-2">
        <button
          className="rounded-[15px] transition-all ease-out py-2 px-4"
          style={{
            backgroundColor: `${active === 0 ? "#ECDFCC" : "#181C14"}`,
            color: `${active === 0 ? "#181C14" : "#ECDFCC"}`,
          }}
          onClick={() => setActive(0)}
        >
          Popular
        </button>
        <button
          className="rounded-[15px] transition-all ease-out py-2 px-4"
          style={{
            backgroundColor: `${active === 1 ? "#ECDFCC" : "#181C14"}`,
            color: `${active === 1 ? "#181C14" : "#ECDFCC"}`,
          }}
          onClick={() => setActive(1)}
        >
          Following
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {followingAccountLoading === false
          ? listAccount.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-10"
              >
                <div
                  className="bg-no-repeat bg-cover bg-center w-[300px] h-[200px] rounded-[10px] relative"
                  style={{
                    backgroundImage: `url(${
                      item.imageURI ? item.imageURI : Nft1.src
                    })`,
                  }}
                >
                  <Image
                    src={Profile}
                    className="rounded-[60px] absolute bottom-0 left-1/2 translate-y-[50%] translate-x-[-50%] w-[65px] border-[8px] border-[#181C14]"
                  />
                  <div className="text-[#181C14] flex items-center justify-center gap-2 bg-[#ECDFCC] py-1 px-4 rounded-[15px] absolute top-[20px] left-[20px]">
                    <p>#{index + 1}</p>
                    <RiMedalLine className="text-xl" />
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold flex items-center gap-1">
                      {item?.name ? item?.name : "Loading..."}
                    </p>
                    <p className="font-bold flex items-center gap-1">
                      {item?.accountAddress
                        ? item?.accountAddress?.substring(0, 3) +
                          "..." +
                          item?.accountAddress?.substr(-3)
                        : "0x000"}{" "}
                      <MdVerified />
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        changeFollow(index);
                      }}
                      className="bg-[#ECDFCC] text-[#181C14] px-4 py-2 rounded-[15px]"
                    >
                      {loading[index]
                        ? "Loading..."
                        : follow[index]
                        ? "Unfollow"
                        : "Follow"}
                    </button>
                    <Link
                      href={`/profile/${
                        item?.accountAddress ? item?.accountAddress : "0x000"
                      }`}
                      className="bg-[#ECDFCC] text-[#181C14] px-4 py-2 rounded-[15px]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular !w-[300px] !h-[200px]"
                width={700}
                sx={{ bgcolor: "grey.300", borderRadius: "10px" }}
                height={200}
              />
            ))}
      </div>
      <Link
        href="/profile/setting"
        className="bg-[#ECDFCC] text-[#181C14] px-4 py-2 rounded-[15px]"
      >
        Become Author
      </Link>
    </div>
  );
}
