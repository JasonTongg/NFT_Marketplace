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
import Nft1 from "../../public/NFT1.png";
import { useRouter } from "next/router";
import { Skeleton } from "@mui/material";

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
  const [price, setPrice] = useState(0);

  const SellNft = useSelector((state) => state.data.SellNft);
  const MyNft = useSelector((state) => state.data.MyNft);
  const [nftList, setNftList] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  const [sellLoading, setSellLoading] = useState(false);
  useEffect(() => {
    if (SellNft.some((nft) => nft.tokenId === id) === false) {
      setNftList(MyNft.filter((nft) => nft.tokenId === id));
    } else {
      setNftList(SellNft.filter((nft) => nft.tokenId === id));
    }
  }, [SellNft, MyNft]);

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

  const resellNft = async () => {
    // if (+price > +ethers.formatUnits(BigInt(nftList[0]?.price), "gwei")) {
    if (contract) {
      try {
        setSellLoading(true);
        const transaction = await contract.resellToken(
          nftList[0]?.tokenId,
          ethers.parseUnits(price.toString(), "gwei"),
          {
            value: ethers.parseEther("0.000025"),
          }
        );

        const receipt = await transaction.wait();

        // Check if the transaction was successful
        if (receipt.status === 1) {
          toast.success("You have successfully resell your NFT");
          setSellLoading(false);
        } else {
          toast.error("Transaction failed");
          toast.error("Please try again later...");
          setSellLoading(false);
        }
      } catch (error) {
        console.error("Error Transfer Token: ", error);
        toast.error("Transaction failed");
        toast.error("Please try again later...");
        setSellLoading(false);
      }
    }
    // } else {
    //   toast.error("Price should be greater than current price");
    // }
  };

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
    <div className="px-4 md:px-16 flex flex-col items-center justify-between gap-6 min-h-[calc(100vh-200px)]">
      <Navbar
        address={address}
        isConnected={isConnected}
        connectWallet={connectEthereumWallet}
        openAddress={openModal}
      />
      <div className="flex flex-col justify-center gap-6 items-center w-full mb-[3rem]">
        <h1 className="font-bold text-4xl md:text-5xl text-center">
          💵 Sell your NFT and set price
        </h1>
        <div className="flex flex-col gap-2 justify-center w-[95%] md:w-[50vw]">
          <label htmlFor="username" className="font-bold text-xl">
            Price
          </label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id="username"
            placeholder="price"
            className="bg-transparent border-[2px] border-[#ECDFCC] rounded-[10px] placeholder:opacity-50 px-4 py-1 text-lg placeholder:text-[#ECDFCC]"
          />
        </div>
        {nftList?.length > 0 ? (
          <Image
            src={nftList[0]?.imageURI}
            alt="nft1"
            className="w-[250px] !h-auto rounded-[15px]"
            width={250}
            height={400}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            className="w-[250px] !h-auto"
            sx={{ bgcolor: "grey.300", borderRadius: "20px" }}
            width={250}
            height={700}
          />
        )}
        <button
          onClick={resellNft}
          className="px-8 py-2 rounded-[20px] font-bold w-fit bg-[#ECDFCC] text-[#181C14]"
        >
          {sellLoading ? "Selling..." : "Sell NFT"}
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
