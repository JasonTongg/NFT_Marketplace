import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import Navbar from "../components/navbar";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Hero from "../components/hero";
import HowToBuy from "../components/howToBuy";
import HomeNftDetails from "../components/homeNftDetail";
import TopCreator from "../components/topCreator";
import FeaturedNft from "../components/featuredNft";
import CategoryList from "../components/categoryList";
import NeverMiss from "../components/neverMiss";
import {
  setMyNft,
  setMySellNft,
  setSellNft,
  fetchMySellNft,
  setFollowingAccount,
  setFollowerAccount,
  setFollowerAccountLoading,
  setFollowingAccountLoading,
} from "../store/data";

const projectId = "d4e79a3bc1f5545a422926acb6bb88b8";

const sepolia = {
  chainId: 11155111, // Chain ID for Sepolia testnet
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://sepolia.infura.io/v3/7501310bfbe94f0fb0f9bf0c190a0a64",
};

// const mainnet = {
//   chainId: 1,
//   name: "Ethereum",
//   currency: "ETH",
//   explorerUrl: "https://etherscan.io",
//   rpcUrl: "https://mainnet.infura.io/v3/7501310bfbe94f0fb0f9bf0c190a0a64",
// };

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
  const dispatch = useDispatch();
  const { address, chainId, isConnected, ethersProvider, signer } =
    useEthereumWallet();
  const {
    contractAddress,
    contractAbi,
    accountContractAddress,
    accountContracAbi,
  } = useSelector((state) => state.data);

  const [contract, setContract] = useState();
  const [contractAcc, setContractAcc] = useState();
  const [follow, setFollow] = useState([false, false, false]);
  const [loading, setLoading] = useState([false, false, false]);

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

  const followAccount = async (address, name, index) => {
    if (contract) {
      try {
        let temp2 = [...loading];
        temp2[index] = true;
        setLoading(temp2);
        await contractAcc.followAccount(address);
        contractAcc.on("AccountFollowed", () => {
          toast.success(`Successfully Followed ${name}`);
          let temp3 = [...loading];
          temp3[index] = false;
          setLoading(temp3);
          let temp = [...follow];
          temp[index] = true;
          setFollow(temp);
        });
      } catch (error) {
        console.error("Error Get Market NFT: ", error);
        let temp3 = [...loading];
        temp3[index] = false;
        setLoading(temp3);
      }
    }
  };

  const unfollowAccount = async (address, name, index) => {
    if (contract) {
      try {
        let temp2 = [...loading];
        temp2[index] = true;
        setLoading(temp2);
        await contractAcc.unfollowAccont(address);
        contractAcc.on("AccountUnfollowed", () => {
          toast.success(`Successfully Unfollowed ${name}`);
          let temp3 = [...loading];
          temp3[index] = false;
          setLoading(temp3);
          let temp = [...follow];
          temp[index] = false;
          setFollow(temp);
        });
      } catch (error) {
        console.error("Error Get Market NFT: ", error);
        let temp3 = [...loading];
        temp3[index] = false;
        setLoading(temp3);
      }
    }
  };

  const connectContract = async () => {
    try {
      if (isConnected && contract) {
      }
      if (isConnected && !contract) {
        const signer = ethersProvider?.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          await signer
        );
        const contractAcc = new ethers.Contract(
          accountContractAddress,
          accountContracAbi,
          await signer
        );
        setContract(contract);
        setContractAcc(contractAcc);
      }
    } catch (error) {
      toast.error("Please Change to Sepolia Network");
    }
  };

  useEffect(() => {
    if (isConnected) {
      connectContract();
    }
  }, [contract, isConnected]);

  const openModal = async () => {
    await web3Modal.open();
  };

  return (
    <div className="px-4 md:px-16 flex flex-col items-center justify-center gap-16">
      {/* <ToastContainer /> */}
      <Navbar
        address={address}
        isConnected={isConnected}
        connectWallet={connectEthereumWallet}
        openAddress={openModal}
      />
      <Hero />
      <HowToBuy />
      <HomeNftDetails />
      <TopCreator
        followAccount={followAccount}
        unfollowAccount={unfollowAccount}
        follow={follow}
        setFollow={setFollow}
        loading={loading}
      />
      <FeaturedNft />
      <CategoryList />
      <NeverMiss />
    </div>
  );
}
