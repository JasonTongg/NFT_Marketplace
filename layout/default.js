import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  setMyNft,
  setMySellNft,
  setSellNft,
  fetchMySellNft,
  setSellNftLoading,
} from "../store/data";
import { ethers } from "ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#181C14",
  color: "#ECDFCC",
  outline: "none",
  borderRadius: "20px",
};

export default function Default({ children }) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [count, setCount] = useState(3); // Initial countdown value

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000); // Decrease count every second
      return () => clearTimeout(timer); // Clear timer when component unmounts or count changes
    }
  }, [count]);

  const dispatch = useDispatch();
  const { address, chainId, isConnected, ethersProvider, signer } =
    useEthereumWallet();
  const { contractAddress, contractAbi } = useSelector((state) => state.data);

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

  const getMarkeNft = async () => {
    if (contract) {
      try {
        dispatch(setSellNftLoading(true));
        const list = await contract.fetchMarketItem();
        const formattedList = list.map((tx) => ({
          tokenId: tx.tokenId.toString(),
          owner: tx.owner,
          seller: tx.seller,
          price: tx.price.toString(),
          name: tx.name,
          description: tx.description,
          collectionType: tx.collectionType,
          imageURI: tx.imageURI,
          sold: tx.sold,
        }));
        dispatch(setSellNft(formattedList));
        dispatch(setSellNftLoading(false));
      } catch (error) {
        console.error("Error Get Market NFT: ", error);
      }
    }
  };

  const getMyNft = async (address) => {
    if (contract) {
      try {
        const list = await contract.fetchMyNFT(address);
        const formattedList = list.map((tx) => ({
          tokenId: tx.tokenId.toString(),
          owner: tx.owner,
          seller: tx.seller,
          price: tx.price.toString(),
          name: tx.name,
          description: tx.description,
          collectionType: tx.collectionType,
          imageURI: tx.imageURI,
          sold: tx.sold,
        }));
        dispatch(setMyNft(formattedList));
      } catch (error) {
        console.error("Error Get Market NFT: ", error);
      }
    }
  };

  const connectContract = async () => {
    try {
      if (isConnected && contract) {
        getMarkeNft();
        getMyNft(address);
        dispatch(fetchMySellNft(contract));
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

  return (
    <html lang="en">
      <body className="bg-[#181C14] w-full min-h-screen text-[#ECDFCC]">
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              DISCLAIMER
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "justify" }}
            >
              This website is created for exercise and portfolio purposes only.
              The content, NFTs, and functionalities displayed here are part of
              a personal project aimed at demonstrating web development skills.
              No actual transactions or ownership of digital assets are being
              facilitated through this site. Any resemblance to live or
              operational marketplaces is purely coincidental. Please do not
              attempt to engage in real trading or investment activities based
              on this website's content.
            </Typography>
            <button
              disabled={count > 0}
              className="w-full bg-[#ECDFCC] disabled:opacity-30 text-[#181C14] font-bold py-2 px-4 rounded-[10px] mt-[1rem]"
              onClick={handleClose}
            >
              {count > 0 ? count : "CLOSE"}
            </button>
          </Box>
        </Modal>
        {children}
        <Footer />
      </body>
    </html>
  );
}
