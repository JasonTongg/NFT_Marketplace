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
import { useSelector } from "react-redux";
import Profile from "../../public/profile.svg";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineHttp } from "react-icons/md";
import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";

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

export default function setting() {
  const { address, chainId, isConnected, ethersProvider, signer } =
    useEthereumWallet();
  const { accountContractAddress, accountContracAbi } = useSelector(
    (state) => state.data
  );

  const router = useRouter();

  const [contract, setContract] = useState();
  const [files, setFiles] = useState([]);
  const [details, setDetails] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [wallet, setWallet] = useState(address);
  const [isLoading, setIsLoading] = useState("");

  const [isEmpty, setIsEmpty] = useState("");

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
        const details = await contract.getAccountDetails(address);
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
        setName(formattedDetails.name);
        setDesc(formattedDetails.description);
        setTwitter(formattedDetails.twitter);
        setFacebook(formattedDetails.telegram);
        setInstagram(formattedDetails.instagram);
        setEmail(formattedDetails.email);
        setWebsite(formattedDetails.website);
        setDetails(formattedDetails);
        setWallet(address);

        if (formattedDetails.name === "") {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }
      } catch (error) {
        console.error("Error Get Account Details: ", error);
      }
    }
  };

  const setAsAuthor = async (imageURI) => {
    if (contract) {
      try {
        await contract.createAccount(
          name,
          desc,
          twitter,
          facebook,
          instagram,
          imageURI,
          email,
          website,
          true
        );
        contract.on("AccountCreated", () => {
          toast.success(`Author has been created successfully`);
          toast.success(`Redirect to your profile`);
          setTimeout(() => {
            router.push(`/profile/${address}`);
          }, 3000);
          setIsLoading(false);
        });
      } catch (error) {
        toast.error("Error creating author, please try again");
        setIsLoading(false);
      }
    }
  };

  const updateAuthor = async (imageURI) => {
    if (contract) {
      try {
        await contract.updateAccount(
          name,
          desc,
          twitter,
          facebook,
          instagram,
          imageURI,
          email,
          website,
          true
        );
        contract.on("AccountUpdated", () => {
          toast.success(`Author has been updated successfully`);
          toast.success(`Redirect to your profile`);
          setTimeout(() => {
            router.push(`/profile/${address}`);
          }, 3000);
          setIsLoading(false);
        });
      } catch (error) {
        toast.error("Error updating author, please try again");
        setIsLoading(false);
      }
    }
  };

  const uploadImage = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(url, formData, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: process.env.NEXT_PUBLIC_INFURA_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_INFURA_SECRET,
        },
      });
      if (isEmpty) {
        setAsAuthor(
          `https://maroon-obliged-antelope-666.mypinata.cloud/ipfs/${response.data.IpfsHash}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_KEY}`
        );
      } else {
        updateAuthor(
          `https://maroon-obliged-antelope-666.mypinata.cloud/ipfs/${response.data.IpfsHash}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_KEY}`
        );
      }
    } catch (error) {
      toast.error("Error uploading file, please try again later");
      setIsLoading(false);
    }
  };

  function copyToClipboard(text) {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
      // Use the Clipboard API to write the text to the clipboard
      navigator.clipboard
        .writeText(text)
        .then(function () {
          alert("Text copied to clipboard!");
          toast.success(text + " copied to clipboard!");
        })
        .catch(function (error) {
          toast.error("Failed to copy " + text);
        });
    } else {
      // Fallback method for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // Make the textarea off-screen
      textArea.style.position = "fixed";
      textArea.style.opacity = 0;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        const msg = successful
          ? text + " copied to clipboard!"
          : "Failed to copy " + text;
        if (successful) {
          toast.success(msg);
        } else {
          toast.error(msg);
        }
      } catch (err) {
        // alert("Error in copying text: " + err);
        toast.error("Failed copying " + text);
      }
      document.body.removeChild(textArea);
    }
  }

  const handleSubmit = () => {
    if (address) {
      if (
        name === "" ||
        email === "" ||
        desc === "" ||
        website === "" ||
        facebook === "" ||
        twitter === "" ||
        instagram === "" ||
        wallet === "" ||
        files.length === 0
      ) {
        toast.error("Please fill all the fields");
        return;
      } else {
        setIsLoading(true);
        uploadImage(files[0]);
      }
    } else {
      toast.error("Please connect your wallet first");
    }
  };

  const handleSubmitUpdate = () => {
    if (address) {
      if (
        name === "" ||
        email === "" ||
        desc === "" ||
        website === "" ||
        facebook === "" ||
        twitter === "" ||
        instagram === "" ||
        wallet === ""
      ) {
        toast.error("Please fill all the fields");
        return;
      } else {
        setIsLoading(true);
        if (files.length === 0) {
          updateAuthor(details.imageURI);
        } else {
          uploadImage(files[0]);
        }
      }
    } else {
      toast.error("Please connect your wallet first");
    }
  };

  const connectContract = async () => {
    try {
      if (isConnected && contract) {
        getAccountDetail();
      }
      if (isConnected && !contract) {
        const signer = ethersProvider?.getSigner();
        const contract = new ethers.Contract(
          accountContractAddress,
          accountContracAbi,
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
            <Image
              src={
                files.length > 0
                  ? URL.createObjectURL(files[0])
                  : details.imageURI
                  ? details.imageURI
                  : Profile
              }
              alt="profile"
              className="w-[150px] h-[150px] rounded-[200px] object-cover"
              width={150}
              height={150}
            />
            <label for="image" className="cursor-pointer">
              Change image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              className="invisible hidden outline-none"
            />
          </label>
          <div className="w-full flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-2 justify-center">
              <label htmlFor="username" className="font-bold text-xl">
                Username
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                id="username"
                placeholder="username"
                value={name}
                className="bg-transparent outline-none border-[2px] border-[#ECDFCC] rounded-[10px] placeholder:opacity-50 px-4 py-1 text-lg placeholder:text-[#ECDFCC]"
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  value={email}
                  className="bg-transparent outline-none py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
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
                onChange={(e) => setDesc(e.target.value)}
                placeholder="description"
                value={desc}
                className="bg-transparent outline-none border-[2px] border-[#ECDFCC] rounded-[10px] placeholder:opacity-50 px-4 py-1 text-lg placeholder:text-[#ECDFCC]"
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
                  onChange={(e) => setWebsite(e.target.value)}
                  value={website}
                  className="bg-transparent outline-none py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
                />
              </label>
            </div>
            <div
              className="grid gap-2 w-full"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    className="bg-transparent outline-none py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
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
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="bg-transparent py-1 outline-none placeholder:opacity-50 placeholder:text-[#ECDFCC]"
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
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="bg-transparent py-1 outline-none placeholder:opacity-50 placeholder:text-[#ECDFCC]"
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
                  onChange={(e) => setWallet(e.target.value)}
                  value={address}
                  readOnly
                  placeholder="Wallet"
                  className="bg-transparent outline-none py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
                />
                <div
                  className="bg-[#ECDFCC] cursor-pointer flex items-center justify-center text-[#181C14]"
                  onClick={() => copyToClipboard(address)}
                >
                  <MdContentCopy className="text-xl" />
                </div>
              </label>
            </div>
            {isEmpty ? (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-4 py-2 rounded-[20px] font-bold w-full bg-[#ECDFCC] text-[#181C14]"
              >
                {isLoading === true ? "Uploading..." : "Set as Author"}
              </button>
            ) : (
              <button
                onClick={handleSubmitUpdate}
                disabled={isLoading}
                className="px-4 py-2 rounded-[20px] font-bold w-full bg-[#ECDFCC] text-[#181C14]"
              >
                {isLoading === true ? "Uploading..." : "Update Author"}
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
