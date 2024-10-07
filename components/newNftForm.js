import React, { useCallback, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { MdOutlineHttp } from "react-icons/md";
import Nft1 from "../public/NFT1.png";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaPercentage } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";
import { VscSymbolProperty } from "react-icons/vsc";
import { ImPriceTag } from "react-icons/im";

export default function newNftForm() {
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [desc, setDesc] = useState("");
  const [collection, setCollection] = useState("");
  const [price, setPrice] = useState("");
  const [royal, setRoyal] = useState("");
  const [size, setSize] = useState("");
  const [propertie, setPropertie] = useState("");

  // Callback for handling the accepted files
  const onDrop = useCallback((acceptedFiles) => {
    // Map through files and create an object that includes preview URL and name
    const mappedFiles = acceptedFiles.map((file) => {
      return {
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
        name: file.name,
      };
    });

    setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
  }, []);

  // Set up the dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="flex flex-col justify-center gap-4 w-full">
      <h2 className="text-3xl sm:text-4xl font-bold">Create New NFT</h2>
      <p className="text-md sm:text-xl">
        you can set preferred dispay name, create your profile url and manage
        other personal settings
      </p>
      <div className="w-full h-[2px] bg-[#3C3D37]"></div>
      <h2 className="text-3xl sm:text-4xl font-bold">
        Image, Video, Audio, or 3D Model
      </h2>
      <p className="text-md sm:text-xl">
        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB,
        GLTF. Max Size: 100MB.
      </p>
      <div className="w-full h-[2px] bg-[#3C3D37]"></div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #cccccc",
          borderRadius: "4px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="w-full flex items-center justify-center gap-2 flex-col">
            <FaRegImage className="text-6xl sm:text-9xl" />
            <p className="text-md sm:text-xl">Drop the files here...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="w-full flex items-center justify-center gap-2 flex-col">
            <FaRegImage className="text-6xl sm:text-9xl" />
            <p className="text-md sm:text-xl">
              Drag & drop some files here, or click to select files
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "left" }}>
            {files.map((fileWrapper, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {fileWrapper.preview ? (
                  <Image
                    src={fileWrapper.preview}
                    alt={fileWrapper.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    <span>File</span>
                  </div>
                )}
                <span>{fileWrapper.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <label htmlFor="username" className="font-bold text-xl">
          Item Name
        </label>
        <input
          type="text"
          id="username"
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
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
            onChange={(e) => setWebsite(e.target.value)}
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
          onChange={(e) => setDesc(e.target.value)}
          placeholder="description"
          className="bg-transparent border-[2px] border-[#ECDFCC] rounded-[10px] placeholder:opacity-50 px-4 py-1 text-lg placeholder:text-[#ECDFCC]"
        />
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <h2 className="text-xl font-bold">Choose Collection</h2>
        <div
          className="grid w-full gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              style={{
                color: `${active === index ? "#181C14" : "#ECDFCC"}`,
                backgroundColor: `${active === index ? "#ECDFCC" : "#181C14"}`,
              }}
              onClick={() => {
                setActive(index);
                setCollection("Sport");
              }}
              className="transition-all cursor-pointer p-3 flex w-full flex-col items-center justify-center gap-3 border-[2px] border-[#ECDFCC] rounded-[10px]"
            >
              <div className="flex items-center justify-between gap-4 w-full">
                <Image
                  src={Nft1}
                  alt="sddv"
                  className="w-[50px] h-[50px] rounded-[100px]"
                />
                <IoIosCheckmarkCircle className="text-4xl" />
              </div>
              <h2 className="text-2xl font-bold">Sport</h2>
            </div>
          ))}
        </div>
      </div>
      <div
        className="grid gap-2 w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        <div className="flex flex-col gap-2 justify-center">
          <label htmlFor="Facebook" className="font-bold text-xl">
            Price
          </label>
          <label
            htmlFor="Facebook"
            className="grid gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] text-lg "
            style={{ gridTemplateColumns: "50px 1fr" }}
          >
            <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
              <ImPriceTag className="text-2xl" />
            </div>
            <input
              type="text"
              id="Facebook"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              className="bg-transparent py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
            />
          </label>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <label htmlFor="Twitter" className="font-bold text-xl">
            Royalties
          </label>
          <label
            htmlFor="Twitter"
            className="grid gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] text-lg "
            style={{ gridTemplateColumns: "50px 1fr" }}
          >
            <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
              <FaPercentage className="text-2xl" />
            </div>
            <input
              type="text"
              id="Twitter"
              placeholder="Royalties"
              onChange={(e) => setRoyal(e.target.value)}
              className="bg-transparent py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
            />
          </label>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <label htmlFor="Instagram" className="font-bold text-xl">
            Size
          </label>
          <label
            htmlFor="Instagram"
            className="grid gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] text-lg "
            style={{ gridTemplateColumns: "50px 1fr" }}
          >
            <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
              <GoPaperclip className="text-2xl" />
            </div>
            <input
              type="text"
              id="Instagram"
              placeholder="Size"
              onChange={(e) => setSize(e.target.value)}
              className="bg-transparent py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
            />
          </label>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <label htmlFor="Instagram2" className="font-bold text-xl">
            Propertie
          </label>
          <label
            htmlFor="Instagram2"
            className="grid gap-2 border-[2px] border-[#ECDFCC] rounded-[10px] text-lg "
            style={{ gridTemplateColumns: "50px 1fr" }}
          >
            <div className="bg-[#ECDFCC] flex items-center justify-center text-[#181C14]">
              <VscSymbolProperty className="text-2xl" />
            </div>
            <input
              type="text"
              id="Instagram2"
              placeholder="Propertie"
              onChange={(e) => setPropertie(e.target.value)}
              className="bg-transparent py-1 placeholder:opacity-50 placeholder:text-[#ECDFCC]"
            />
          </label>
        </div>
      </div>
      <button className="bg-[#ECDFCC] text-[#181C14] rounded-[10px] px-4 py-2 font-bold mb-[3rem]">
        Upload
      </button>
    </div>
  );
}
