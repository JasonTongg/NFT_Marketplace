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
import { useSelector } from "react-redux";

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
    <div className="px-16 flex flex-col items-center justify-center gap-6">
      {/* <ToastContainer /> */}
      <Navbar
        address={address}
        isConnected={isConnected}
        connectWallet={connectEthereumWallet}
        openAddress={openModal}
      />
      Home
    </div>
  );
}
