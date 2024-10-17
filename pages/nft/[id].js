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
import { set } from "lodash";

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
  const MyNft = useSelector((state) => state.data.MyNft);
  const [nftList, setNftList] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  const [buyLoading, setBuyLoading] = useState(false);

  useEffect(() => {
    if (SellNft.some((nft) => nft.tokenId === id) === false) {
      setNftList(MyNft.filter((nft) => nft.tokenId === id));
    } else {
      setNftList(SellNft.filter((nft) => nft.tokenId === id));
    }
    // console.log("sell nft");
    // console.log(SellNft.filter((nft) => nft.tokenId === id));
    // console.log("my nft");
    // console.log(MyNft.filter((nft) => nft.tokenId === id));
    // console.log(MyNft);
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

  const buyNft = async (Id) => {
    if (contract) {
      try {
        setBuyLoading(true);
        const transaction = await contract.createMarketSale(Id, {
          value: nftList[0]?.price,
        });

        const receipt = await transaction.wait();

        // Check if the transaction was successful
        if (receipt.status === 1) {
          toast.success("You have successfully purchased this NFT");
          setBuyLoading(false);
        } else {
          toast.error("Transaction failed");
          toast.error("Please try again later...");
          setBuyLoading(false);
        }
      } catch (error) {
        console.error("Buy NFT: ", error);
        toast.error("Transaction failed");
        toast.error("Please try again later...");
        setBuyLoading(false);
      }
    }
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

  const [dateTimes, setDateTimes] = useState([]);

  useEffect(() => {
    function getRandomDateTime() {
      // Array of month names
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Random day between 1 and 28
      const day = Math.floor(Math.random() * 28) + 1;

      // Random month
      const month = months[Math.floor(Math.random() * months.length)];

      // Random year between 2023 and the current year
      const currentYear = new Date().getFullYear();
      const year = Math.floor(Math.random() * (currentYear - 2023 + 1)) + 2023;

      // Random hour between 1 and 12
      const hour = Math.floor(Math.random() * 12) + 1;

      // Random minute between 0 and 59
      const minute = Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0");

      // Random AM or PM
      const period = Math.random() < 0.5 ? "AM" : "PM";

      // Format the date
      return `${day} ${month} ${year} - ${hour}:${minute} ${period}`;
    }

    // Function to convert date-time string into a comparable Date object
    function parseDateTime(dateTimeStr) {
      const [datePart, timePart] = dateTimeStr.split(" - ");
      const [day, month, year] = datePart.split(" ");
      const [hourMinute, period] = timePart.split(" ");
      let [hour, minute] = hourMinute.split(":").map(Number);

      // Adjust for AM/PM
      if (period === "PM" && hour !== 12) {
        hour += 12;
      }
      if (period === "AM" && hour === 12) {
        hour = 0;
      }

      // Create Date object
      return new Date(`${month} ${day}, ${year} ${hour}:${minute}`);
    }

    // Generate an array of 12 random date-time strings and filter by today's date
    const generateAndSortDateTimes = () => {
      const today = new Date();
      const dateTimeArray = [];

      // Generate random date-times until we get 12 that are not in the future
      while (dateTimeArray.length < 12) {
        const randomDateTime = getRandomDateTime();
        const parsedDate = parseDateTime(randomDateTime);
        if (parsedDate <= today) {
          dateTimeArray.push(randomDateTime);
        }
      }

      // Sort from the nearest to the farthest in the past
      const sortedArray = dateTimeArray.sort(
        (a, b) => parseDateTime(b) - parseDateTime(a)
      );
      setDateTimes(sortedArray);
    };

    // Call the function to generate and sort the date-times when the component mounts
    generateAndSortDateTimes();
  }, []);

  const [randomValues, setRandomValues] = useState([]);

  const generateRandomNumber = () => {
    const min = 0.00009;
    const max = nftList[0]?.price
      ? +ethers.formatUnits(BigInt(nftList[0]?.price), "gwei")
      : 0.01;
    return Math.random() * (max - min) + min;
  };

  // Generate 12 random numbers, sort them, and store in the state
  useEffect(() => {
    const values = Array.from({ length: 12 }, () =>
      generateRandomNumber().toFixed(6)
    );
    // Sort the values in descending order (highest to lowest)
    const sortedValues = values.sort((a, b) => b - a);
    setRandomValues(sortedValues);
  }, [nftList]);

  const [randomNames, setRandomNames] = useState([]);

  // Function to generate a random name
  const generateRandomName = () => {
    const syllables = [
      "ka",
      "li",
      "zo",
      "ra",
      "ne",
      "vi",
      "sa",
      "mo",
      "ti",
      "lu",
      "ja",
      "pe",
    ];
    const nameLength = Math.floor(Math.random() * 3) + 2; // Random length between 2 and 4 syllables
    let name = "";
    for (let i = 0; i < nameLength; i++) {
      const randomIndex = Math.floor(Math.random() * syllables.length);
      name += syllables[randomIndex];
    }
    // Capitalize the first letter
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Generate 12 random names and store them in the state
  useEffect(() => {
    const names = Array.from({ length: 12 }, () => generateRandomName());
    setRandomNames(names);
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  // Function to generate a random time with at least 1 day
  const generateRandomTime = () => {
    const days = Math.floor(Math.random() * 3) + 1; // Random days between 1 and 3
    const hours = Math.floor(Math.random() * 24); // Random hours between 0 and 23
    const mins = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
    const secs = Math.floor(Math.random() * 60); // Random seconds between 0 and 59

    return { days, hours, mins, secs };
  };

  // Update the timer every second
  useEffect(() => {
    // Set initial random time
    setTimeLeft(generateRandomTime());

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, mins, secs } = prevTime;

        if (secs > 0) {
          secs -= 1;
        } else if (mins > 0) {
          mins -= 1;
          secs = 59;
        } else if (hours > 0) {
          hours -= 1;
          mins = 59;
          secs = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          mins = 59;
          secs = 59;
        } else {
          // Timer is up, stop the countdown
          clearInterval(interval);
          return { days: 0, hours: 0, mins: 0, secs: 0 };
        }

        return { days, hours, mins, secs };
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 md:px-16 flex flex-col items-center justify-center gap-5">
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
                textAlign: "justify",
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
              <Typography>
                Contract ADdress: 0x0000000000000000000000000000000000000000
              </Typography>
              <Typography>Token ID: {nftList[0]?.tokenId || ""}</Typography>
            </AccordionDetails>
          </Accordion>
          <ToastContainer />
        </div>
        <div className="w-full flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-bold">
            {nftList[0]?.name || ""} #{nftList[0]?.tokenId || ""}
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center gap-2">
              <Image src={Profile} alt="profile" className="w-[40px]" />
              <div className="flex flex-col justify-center">
                <p className="text-sm">
                  {nftList[0]?.seller ===
                  "0x0000000000000000000000000000000000000000"
                    ? "Owner"
                    : "Seller"}
                </p>
                <p className="flex items-center gap-1 font-bold">
                  {nftList?.length > 0
                    ? nftList[0]?.seller !==
                      "0x0000000000000000000000000000000000000000"
                      ? nftList[0]?.seller?.substring(0, 3) +
                        "..." +
                        nftList[0]?.seller?.substr(-3)
                      : nftList[0]?.owner?.substring(0, 3) +
                        "..." +
                        nftList[0]?.owner?.substr(-3)
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
          {nftList[0]?.sold === false && (
            <div className="flex items-center gap-3">
              <MdOutlineTimer className="text-2xl" />
              <p className="text-xl">Auction ending in:</p>
            </div>
          )}
          {nftList[0]?.sold === false && (
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-3xl font-bold">
                  {timeLeft.days < 10 ? "0" + timeLeft.days : timeLeft.days}
                </p>
                <p>Days</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-3xl font-bold">
                  {timeLeft.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours}
                </p>
                <p>Hours</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-3xl font-bold">
                  {timeLeft.mins < 10 ? "0" + timeLeft.mins : timeLeft.mins}
                </p>
                <p>Mins</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-3xl font-bold">
                  {timeLeft.secs < 10 ? "0" + timeLeft.secs : timeLeft.secs}
                </p>
                <p>Secs</p>
              </div>
            </div>
          )}
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
          {nftList[0]?.owner === address || nftList[0]?.seller === address ? (
            <div className="flex items-center gap-8">
              {nftList[0]?.seller === address && (
                <p>YOU CANT BUY YOUR OWN NFT</p>
              )}
              {nftList[0]?.sold === true && (
                <button
                  onClick={() => router.push(`/resell/${nftList[0]?.tokenId}`)}
                  className="py-2 px-4 rounded-[10px] flex items-center justify-center gap-3 bg-[#ECDFCC] text-[#181C14]"
                >
                  <MdOutlineLocalOffer />
                  <p>Sell NFT</p>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => buyNft(nftList[0]?.tokenId)}
              className="py-2 px-4 w-full rounded-[10px] flex items-center justify-center gap-3 bg-[#ECDFCC] text-[#181C14]"
            >
              <MdOutlineLocalOffer />
              {buyLoading ? <p>Buying...</p> : <p>Buy NFT</p>}
            </button>
          )}

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="rounded-[10px] w-full text-center py-2 px-4 border-[2px] border-[#ECDFCC] text-[#ECDFCC]">
              Buy History
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
                      Offer {randomValues[index]} SepoliaEth by{" "}
                      {randomNames[index]}
                    </p>
                    <p className="flex items-center gap-1 text-sm">
                      {dateTimes[index]}
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
