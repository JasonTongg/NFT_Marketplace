import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import Navbar from "../../components/navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import ProfileDetail from "../../components/profileDetails";
import ProfileNftList from "../../components/profileNftList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const id = router.query.id;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const MyNft = useSelector((state) => state.data.MyNft);
  const MySellNft = useSelector((state) => state.data.MySellNft);
  const SellNft = useSelector((state) => state.data.SellNft);
  const MyNftLoading = useSelector((state) => state.data.MyNftLoading);
  const MySellNftLoading = useSelector((state) => state.data.MySellNftLoading);
  const [myNftList, setMyNftList] = useState([]);
  const [mySellNftList, setMySellNftList] = useState([]);
  const [details, setDetails] = useState({});
  const [count, setCount] = useState(10); // Initial countdown value

  useEffect(() => {
    if (open === true) {
      if (count > 0) {
        const timer = setTimeout(() => setCount(count - 1), 1000);
        return () => clearTimeout(timer);
      }

      if (count === 0) {
        router.push("/profile/setting");
      }
    }
  }, [count, open]);

  useEffect(() => {
    setMyNftList(MyNft);
  }, [MyNft]);

  useEffect(() => {
    setMySellNftList(
      SellNft.filter((item) => item.sold === false && item.seller === address)
    );
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

  const getAccountDetail = async () => {
    if (contract) {
      try {
        const details = await contractAcc.getAccountDetails(id);
        const formattedDetails = {
          name: details.name,
          accountAddress: details.accountAddress,
          description: details.description,
          twitter: details.twitter,
          telegram: details.telegram,
          instagram: details.instagram,
          imageURI: details.imageURI,
          email: details.email,
          website: details.website,
          isAuthor: details.isAuthor,
        };
        setDetails(formattedDetails);
        if (formattedDetails.name === "" || formattedDetails.name === null) {
          if (id === address) {
            handleOpen();
          } else {
            router.push(`/notfound`);
          }
        }
      } catch (error) {
        console.error("Error Get Account Details: ", error);
        router.push(`/notfound`);
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
        getAccountDetail();
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
    <div className="px-4 md:px-16 flex flex-col items-center justify-center gap-6">
      {/* <ToastContainer /> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Account Not Found
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "justify" }}
          >
            Profile not found! Please create your profile first to access this
            feature. It only takes a moment, and you'll be ready to go!
          </Typography>
          <button
            disabled={count > 0}
            className="w-full bg-[#ECDFCC] disabled:opacity-30 text-[#181C14] font-bold py-2 px-4 rounded-[10px] mt-[1rem]"
            onClick={handleClose}
          >
            Redirect in {count}
          </button>
        </Box>
      </Modal>
      <Navbar
        address={address}
        isConnected={isConnected}
        connectWallet={connectEthereumWallet}
        openAddress={openModal}
      />
      <ProfileDetail details={details} />
      {id === address && (
        <ProfileNftList
          myNftList={myNftList}
          mySellNftList={mySellNftList}
          MyNftLoading={MyNftLoading}
          MySellNftLoading={MySellNftLoading}
        />
      )}
    </div>
  );
}
