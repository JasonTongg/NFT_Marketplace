import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import Navbar from "../../components/navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa6";
import Profile from "../../public/profile.svg";
import { LuTimer } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Skeleton } from "@mui/material";

const projectId = "d4e79a3bc1f5545a422926acb6bb88b8";

const sepolia = {
  chainId: 11155111, // Chain ID for Sepolia testnet
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://sepolia.infura.io/v3/7501310bfbe94f0fb0f9bf0c190a0a64",
};

const metadata = {
  name: "Tweet App",
  description: "tweet app",
  url: "https://x.com",
  icons: ["https://x.com"],
};

const web3Modal = createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [sepolia],
  projectId,
  enableAnalytics: true,
});

function useEthereumWallet() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const ethersProvider = isConnected
    ? new ethers.BrowserProvider(walletProvider)
    : null;
  const signer = isConnected ? ethersProvider.getSigner() : null;

  return { address, chainId, isConnected, ethersProvider, signer };
}

export default function index() {
  const { address, chainId, isConnected, ethersProvider, signer } =
    useEthereumWallet();
  const { contractAddress, contractAbi } = useSelector((state) => state.data);

  const [contract, setContract] = useState();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("NFTs");

  const SellNft = useSelector((state) => state.data.SellNft);
  const SellNftLoading = useSelector((state) => state.data.SellNftLoading);
  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    setNftList(SellNft);
  }, [SellNft]);

  const connectEthereumWallet = async () => {
    try {
      const instance = await web3Modal.open();
      if (instance) {
        const provider = new ethers.BrowserProvider(instance);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        toast.success("Wallet Connect Successfull", {
          theme: "dark",
        });
      } else {
        throw new Error("No provider returned from Web3Modal.");
      }
    } catch (err) {
      console.error("Ethereum wallet connection failed:", err);
    }
  };

  const connectContract = async () => {
    try {
      if (isConnected && !contract) {
        const signer = ethersProvider?.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          await signer
        );
        setContract(contract);
      }
    } catch (error) {
      toast.error("Please Change to Sepolia Network");
    }
  };

  const debouncedHandleSearch = () => {
    if (category !== "NFTs") {
      setNftList(
        SellNft.filter(
          (nft) =>
            nft.name.toLowerCase().includes(search.toLowerCase()) &&
            nft.collectionType.toLowerCase() === category.toLowerCase()
        )
      );
    } else {
      setNftList(
        SellNft.filter((nft) =>
          nft.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    debouncedHandleSearch();
  }, [search, category]);

  useEffect(() => {
    if (isConnected) {
      connectContract();
    }
  }, [contract, isConnected]);

  const openModal = async () => {
    await web3Modal.open();
  };

  return (
    <div className="px-4 md:px-16 flex flex-col items-center justify-center gap-6">
      {/* <ToastContainer /> */}
      <Navbar
        address={address}
        isConnected={isConnected}
        connectWallet={connectEthereumWallet}
        openAddress={openModal}
      />
      <div className="flex flex-col w-full gap-2 justify-center mb-[3rem]">
        <label
          htmlFor="search"
          className="border-[2px] border-[#ECDFCC] rounded-[100px] py-2 px-6 grid items-center justify-center mx-auto gap-3 w-[95%] md:w-[50vw]"
          style={{ gridTemplateColumns: "auto 1fr auto" }}
        >
          <IoIosSearch className="text-2xl" />
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Type your keyword..."
            id="search"
            className="py-2 px-4 placeholder:text-[#ECDFCC] bg-transparent outline-none border-none"
          />
          <MdKeyboardDoubleArrowRight className="text-2xl" />
        </label>
        <div className="flex items-center gap-x-16 gap-y-3 my-8 flex-wrap">
          {[
            "NFTs",
            "Animal",
            "Sport",
            "Gaming",
            "Art",
            "Photography",
            "Fashion",
          ].map((item, index) => (
            <p
              onClick={() => setCategory(item)}
              style={{
                color: `${category === item ? "#ECDFCC" : "#697565"}`,
              }}
              key={index}
              className="cursor-pointer font-bold text-lg min-w-[100px] md:text-start text-center"
            >
              {item}
            </p>
          ))}
        </div>
        <div
          className="grid gap-x-6 gap-y-12"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {SellNftLoading === false ? (
            nftList?.length > 0 ? (
              nftList.map((item, index) => (
                <Link
                  href={`/nft/${item?.tokenId}`}
                  className="flex flex-col items-center justify-start gap-4"
                  key={index}
                >
                  <div
                    className="rounded-[20px] object-cover relative w-full h-[200px] bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url('${item?.imageURI}')` }}
                  >
                    <div className="px-4 py-1 rounded-[20px] absolute top-[10px] right-[10px] flex items-center justify-center gap-2 bg-[#ECDFCC] text-[#181C14]">
                      <FaRegHeart />
                      <p>22</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="flex items-center justify-center gap-1">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="bg-no-repeat bg-cover bg-center border-[2px] border-[#ECDFCC] rounded-[100px] w-[20px] h-[20px]"
                          style={{ backgroundImage: `url('${Profile.src}')` }}
                        ></div>
                      ))}
                    </div>
                    <p>50</p>
                  </div>
                  <h2 className="text-2xl font-bold w-full">{item?.name}</h2>
                  <div className="p-2 rounded-[10px] border-[2px] border-[#ECDFCC] flex items-center justify-center w-full gap-3">
                    <div className="text-center rounded-[10px] bg-[#ECDFCC] py-1 px-4 text-[#181C14]">
                      Current Bid
                    </div>
                    <p className="text-center">
                      {item?.price
                        ? ethers.formatUnits(BigInt(item?.price), "gwei")
                        : 0}{" "}
                      SepoliaETH
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <LuTimer />
                    <p>2 hours left</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="min-h-[200px] flex items-center justify-center">
                Sorry, no NFTs were found. Please check back later or try
                searching a different NFTs.
              </p>
            )
          ) : (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular !w-full !h-[200px]"
                width={700}
                sx={{ bgcolor: "grey.300", borderRadius: "10px" }}
                height={200}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
