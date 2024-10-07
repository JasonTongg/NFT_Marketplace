import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import Navbar from "../../components/navbar";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import Profile from "../../public/profile.svg";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineHttp } from "react-icons/md";
import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

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

export default function setting() {
  const { address, chainId, isConnected, ethersProvider, signer } =
    useEthereumWallet();
  const { contractAddress, contractAbi } = useSelector((state) => state.data);

  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState();

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

  // const getTransaction = async () => {
  //   console.log("Getting Contract");
  //   if (contract) {
  //     console.log("There is contract");
  //     try {
  //       console.log("Start getting contract");
  //       const transactions = await contract.getTransactions();
  //       const formattedTransactions = transactions.map((tx) => ({
  //         from: tx.from,
  //         to: tx.to,
  //         amount: tx.amount.toString(), // Convert BigNumber to string (or .toNumber() if small)
  //         message: tx.message,
  //       }));

  //       console.log("set Transaction");
  //       setTransactions(formattedTransactions);
  //       console.log("set Transaction done");
  //     } catch (error) {
  //       console.error("Error Get Transaction: ", error);
  //     }
  //   }
  // };

  //   const getHolderData = async () => {
  //     if (contract) {
  //       try {
  //         const allTokenHolder = await contract.getTokenHolder();
  //         let tempHolderArray = []; // Temporary array to store data

  //         await Promise.all(
  //           allTokenHolder.map(async (item) => {
  //             const singleHolderData = await contract.getTokenHolderData(item);
  //             const formattedData = {
  //               _tokenId: singleHolderData[0],
  //               _to: singleHolderData[1],
  //               _from: singleHolderData[2],
  //               _totalToken: singleHolderData[3],
  //               _tokenHolder: singleHolderData[4],
  //             };
  //             tempHolderArray.push(formattedData);
  //           })
  //         );

  //         setHolderArray(tempHolderArray); // Set state once after loop
  //       } catch (error) {
  //         console.error("Error Get Transaction Count: ", error);
  //       }
  //     }
  //   };

  //   const transferToken = async () => {
  //     if (contract) {
  //       try {
  //         const transfer = await contract.transfer(
  //           inputAddress,
  //           BigInt(+inputValue)
  //         );
  //         contract.on("Transfer", (from, to, value) => {
  //           toast.success(`Transfer Token to ${to} for ${value} JSN Success`);
  //           getHolderData();
  //         });
  //       } catch (error) {
  //         console.error("Error Transfer Token: ", error);
  //       }
  //     }
  //   };

  const connectContract = async () => {
    try {
      if (isConnected && contract) {
        // getHolderData();
        // console.log("Address: " + address);
        // const allTokenHolder = await contract.balanceOf(address);
        // setAccountBalance(Number(allTokenHolder));
        // console.log("account balance: " + Number(allTokenHolder));
      }
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
    <div className="w-full overflow-hidden px-4 md:px-16 flex flex-col items-center justify-center gap-6">
      {/* <ToastContainer /> */}
      <Navbar
        address={address}
        isConnected={isConnected}
        connectWallet={connectEthereumWallet}
        openAddress={openModal}
      />
      <div className="w-[100%] md:w-[60vw] flex flex-col items-center justify-center gap-4">
        <div className="w-full flex flex-col justify-center gap-4">
          <h2 className="text-4xl font-bold">Profile settings</h2>
          <p>
            You can set preferred display name, create your profile URL and
            manage other personal settings
          </p>
          <div className="w-full h-[2px] bg-[#3C3D37] opacity-80"></div>
        </div>
        <div className="grid gap-6 w-full items-start mt-[3rem] mb-[3rem] grid-setting">
          <label
            for="image"
            className="cursor-pointer flex flex-col items-center justify-center gap-2"
          >
            <Image src={Profile} alt="profile" className="w-[150px]" />
            <label for="image">Change image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="invisible hidden"
            />
          </label>
          <div className="w-full flex flex-col justify-center gap-6">
            <button className="hover-button">Set as Author Account</button>
            <div className="flex flex-col gap-2 justify-center">
              <label htmlFor="username" className="font-bold text-xl">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="username"
                className="bg-transparent border-[2px] border-[#ECDFCC] rounded-[10px] placeholder:opacity-50 px-4 py-1 text-lg placeholder:text-[#ECDFCC]"
              />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label htmlFor="email" className="font-bold text-xl">
                Email
              </label>
              <label
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
                Description
              </label>
              <textarea
                type="text"
                rows={5}
                id="description"
                placeholder="description"
                className="bg-transparent border-[2px] border-[#ECDFCC] rounded-[10px] placeholder:opacity-50 px-4 py-1 text-lg placeholder:text-[#ECDFCC]"
              />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label htmlFor="website" className="font-bold text-xl">
                Website
              </label>
              <label
                htmlFor="website"
                className="grid gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] text-lg "
                style={{ gridTemplateColumns: "50px 1fr" }}
              >
                <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
                  <MdOutlineHttp className="text-2xl" />
                </div>
                <input
                  type="text"
                  id="website"
                  placeholder="website"
                  className="bg-transparent py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
                />
              </label>
            </div>
            <div
              className="grid gap-2 w-full"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
            >
              <div className="flex flex-col gap-2 justify-center">
                <label htmlFor="Facebook" className="font-bold text-xl">
                  Facebook
                </label>
                <label
                  htmlFor="Facebook"
                  className="grid gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] text-lg "
                  style={{ gridTemplateColumns: "50px 1fr" }}
                >
                  <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
                    <IoLogoFacebook className="text-2xl" />
                  </div>
                  <input
                    type="text"
                    id="Facebook"
                    placeholder="Facebook"
                    className="bg-transparent py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <label htmlFor="Twitter" className="font-bold text-xl">
                  Twitter / X
                </label>
                <label
                  htmlFor="Twitter"
                  className="grid gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] text-lg "
                  style={{ gridTemplateColumns: "50px 1fr" }}
                >
                  <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
                    <FaXTwitter className="text-2xl" />
                  </div>
                  <input
                    type="text"
                    id="Twitter"
                    placeholder="Twitter"
                    className="bg-transparent py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <label htmlFor="Instagram" className="font-bold text-xl">
                  Instagram
                </label>
                <label
                  htmlFor="Instagram"
                  className="grid gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] text-lg "
                  style={{ gridTemplateColumns: "50px 1fr" }}
                >
                  <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
                    <FaInstagram className="text-2xl" />
                  </div>
                  <input
                    type="text"
                    id="Instagram"
                    placeholder="Instagram"
                    className="bg-transparent py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label htmlFor="Wallet" className="font-bold text-xl">
                Wallet address
              </label>
              <label
                htmlFor="Wallet"
                className="grid gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] text-lg "
                style={{ gridTemplateColumns: "50px 1fr 50px" }}
              >
                <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
                  <IoWalletOutline className="text-2xl" />
                </div>
                <input
                  type="text"
                  id="Wallet"
                  placeholder="Wallet"
                  className="bg-transparent py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
                />
                <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
                  <MdContentCopy className="text-xl" />
                </div>
              </label>
            </div>
            <button className="px-4 py-2 rounded-[20px] font-bold w-full bg-[#ECDFCC] text-[#181C14]">
              Upload Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
