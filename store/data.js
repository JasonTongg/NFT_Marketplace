import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Abi from "./abi.json";

const initialState = {
  contractAddress: "0x24551a77fb18442abe59C357980955f78ABd4787",
  contractAbi: Abi.abi,
  SellNft: [],
  MyNft: [],
  MySellNft: [],
  SellNftLoading: true,
};

export const fetchMySellNft = createAsyncThunk(
  "datas/fetchMySellNft",
  async (contract) => {
    const list = await contract.fetchItemsListed();
    return list.map((tx) => ({
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
  }
);

const datas = createSlice({
  name: "Datas",
  initialState,
  reducers: {
    setSellNft: (state, { payload }) => {
      state.SellNft = payload;
    },
    setMyNft: (state, { payload }) => {
      state.MyNft = payload;
    },
    setMySellNft: (state, { payload }) => {
      state.MySellNft = payload;
    },
    setSellNftLoading: (state, { payload }) => {
      state.SellNftLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMySellNft.pending, (state) => {
        // Optionally handle loading state
      })
      .addCase(fetchMySellNft.fulfilled, (state, action) => {
        state.MySellNft = action.payload; // Set the fetched NFTs
      })
      .addCase(fetchMySellNft.rejected, (state, action) => {
        console.error("Error fetching my sell NFT: ", action.payload);
      });
  },
});

export const { setMyNft, setSellNft, setMySellNft, setSellNftLoading } =
  datas.actions;
export default datas.reducer;
