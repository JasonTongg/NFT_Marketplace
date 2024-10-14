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
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Profile from "../../public/profile.svg";
import { MdVerified } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";
import { MdOutlineLocalOffer } from "react-icons/md";
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

  const SellNft = useSelector((state) => state.data.SellNft);
  const [nftList, setNftList] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    setNftList(SellNft.filter((nft) => nft.tokenId === id));
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
    <div className="px-4 md:px-16 flex flex-col items-center justify-center gap-5">
      {/* <ToastContainer /> */}
      <Navbar
        address={address}
        isConnected={isConnected}
        connectWallet={connectEthereumWallet}
        openAddress={openModal}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 py-8 items-start content-start">
        <div className="rounded-[10px] overflow-hidden w-full flex flex-col items-center justify-center gap-4">
          {nftList?.length > 0 ? (
            <div
              className="bg-no-repeat bg-cover bg-center relative w-full h-[500px]"
              style={{ backgroundImage: `url('${nftList[0]?.imageURI}')` }}
            >
              <div className="bg-[#ECDFCC] cursor-pointer absolute top-[20px] right-[20px] flex items-center justify-center gap-2 rounded-[100px] px-4 py-1 text-[#181C14]">
                <IoIosHeartEmpty />
                <p>23</p>
              </div>
            </div>
          ) : (
            <Skeleton
              variant="rectangular"
              className="w-full h-[500px]"
              sx={{ bgcolor: "grey.300", borderRadius: "20px" }}
              width={700}
              height={500}
            />
          )}
          <Accordion defaultExpanded sx={{ background: "transparent" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                backgroundColor: "#ECDFCC",
                color: "#181C14",
                borderRadius: "20px",
              }}
            >
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "#181C14",
                color: "#ECDFCC",
              }}
            >
              <Typography>{nftList[0]?.description || ""}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            sx={{ background: "transparent", width: "100%" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                backgroundColor: "#ECDFCC",
                color: "#181C14",
                borderRadius: "20px",
              }}
            >
              <Typography>Details</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "#181C14",
                color: "#ECDFCC",
              }}
            >
              <Typography>2000 x 200px.IMAGE(685px)</Typography>
              <Typography>Contract ADdress: 0x00000</Typography>
              <Typography>Token ID: {nftList[0]?.tokenId || ""}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="w-full flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold">
            {nftList[0]?.name || ""} #{nftList[0]?.tokenId || ""}
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center gap-2">
              <Image src={Profile} alt="profile" className="w-[40px]" />
              <div className="flex flex-col justify-center">
                <p className="text-sm">Seller</p>
                <p className="flex items-center gap-1 font-bold">
                  {nftList?.length > 0
                    ? nftList[0]?.seller?.substring(0, 3) +
                      "..." +
                      nftList[0]?.seller?.substr(-3)
                    : ""}{" "}
                  <MdVerified />
                </p>
              </div>
            </div>
            <div className="h-[40px] w-[2px] bg-[#ECDFCC]"></div>
            <div className="flex items-center justify-center gap-2">
              <Image src={Profile} alt="profile" className="w-[40px]" />
              <div className="flex flex-col justify-center">
                <p className="text-sm">Collection</p>
                <p className="flex items-center gap-1 font-bold">
                  {nftList[0]?.collectionType} <MdVerified />
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineTimer className="text-2xl" />
            <p className="text-xl">Auction ending in:</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-3xl font-bold">2</p>
              <p>Days</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-3xl font-bold">22</p>
              <p>Hours</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-3xl font-bold">14</p>
              <p>Mins</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-3xl font-bold">10</p>
              <p>Secs</p>
            </div>
          </div>
          <div className="flex items-center w-fit gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] py-2 px-4">
            <div className="bg-[#ECDFCC] rounded-[10px] py-1 px-4 text-[#181C14]">
              Current Price
            </div>
            <p>
              {nftList?.length > 0
                ? ethers.formatUnits(BigInt(nftList[0]?.price), "gwei")
                : 0}{" "}
              SepoliaETH
            </p>
          </div>
          <div className="flex items-center gap-8">
            <p>YOU CANT BUY YOUR OWN NFT</p>
            <button className="py-2 px-4 rounded-[10px] flex items-center justify-center gap-3 bg-[#ECDFCC] text-[#181C14]">
              <MdOutlineLocalOffer />
              <p>Make Offer</p>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="rounded-[10px] w-full text-center py-2 px-4 bg-[#ECDFCC] text-[#181C14]">
              Bid History
            </div>
            <div className="w-full flex flex-col removeScroll gap-3 max-h-[500px] overflow-auto py-4">
              {Array.from({ length: 9 }).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center border-b-[1px] pb-3 border-[#3C3D37] w-full gap-2"
                >
                  <Image src={Profile} alt="profile" className="w-[40px]" />
                  <div className="flex flex-col justify-center">
                    <p className=" font-bold">
                      Offer 0.003 Sepolia Eth by Jason
                    </p>
                    <p className="flex items-center gap-1 text-sm">
                      Jun 2024 - 13:34 PM
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
