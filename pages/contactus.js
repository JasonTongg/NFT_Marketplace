import { FaLocationDot } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import Navbar from "../components/navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { MdOutlineMail } from "react-icons/md";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    if (isConnected) {
      connectContract();
    }
  }, [contract, isConnected]);

  const openModal = async () => {
    await web3Modal.open();
  };

  return (
    <div className="px-4 md:px-16 flex flex-col items-center justify-center gap-6 w-full">
      <Navbar
        address={address}
        isConnected={isConnected}
        connectWallet={connectEthereumWallet}
        openAddress={openModal}
      />
      <div className="flex flex-col items-center justify-center gap-4 w-full mb-[3rem]">
        <h2 className="text-4xl sm:text-5xl font-bold">Contact Us</h2>
        <div className="grid gap-4 w-full items-start grid-contact">
          <div className="flex flex-col justify-center gap-4 w-full">
            <div className="flex flex-col justify-center gap-2">
              <h2 className="font-bold text-xl flex items-center gap-2">
                <FaLocationDot /> Address
              </h2>
              <p className="md:w-auto w-[300px]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim,
                nam.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h2 className="font-bold text-xl flex items-center gap-2">
                💌 Email
              </h2>
              <p>Example@gmail.com</p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h2 className="font-bold text-xl flex items-center gap-2">
                ☎️ Phone
              </h2>
              <p>+0000000000000</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col gap-2 justify-center">
              <label htmlFor="username" className="font-bold text-xl">
                Full Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="username"
                placeholder="Full Name"
                className="bg-transparent border-[2px] border-[#ECDFCC] rounded-[10px] placeholder:opacity-50 px-4 py-1 text-lg placeholder:text-[#ECDFCC]"
              />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label htmlFor="email" className="font-bold text-xl">
                Email
              </label>
              <label
                onChange={(e) => setEmail(e.target.value)}
                htmlFor="email"
                className="grid gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] text-lg "
                style={{ gridTemplateColumns: "50px 1fr" }}
              >
                <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
                  <MdOutlineMail className="text-2xl" />
                </div>
                <input
                  type="text"
                  id="email"
                  placeholder="email"
                  className="bg-transparent py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
                />
              </label>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label htmlFor="description" className="font-bold text-xl">
                Message
              </label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                rows={5}
                id="description"
                placeholder="Message"
                className="bg-transparent border-[2px] border-[#ECDFCC] rounded-[10px] placeholder:opacity-50 px-4 py-1 text-lg placeholder:text-[#ECDFCC]"
              />
            </div>
            <button className="px-8 py-2 rounded-[20px] font-bold w-fit bg-[#ECDFCC] text-[#181C14]">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
