import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Abi from "./abi.json";
import AccountAbi from "./account.json";

const initialState = {
  contractAddress: "0x24551a77fb18442abe59C357980955f78ABd4787",
  contractAbi: Abi.abi,
  accountContractAddress: "0x88c99E1EEe62C7e04ee713373e402753D07c22aB",
  accountContracAbi: AccountAbi.abi,
  SellNft: [],
  MyNft: [],
  MySellNft: [],
  SellNftLoading: true,
  MyNftLoading: true,
  MySellNftLoading: true,
  toastCount: 0,
  isConnected: false,
  address: "",
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
    setMyNftLoading: (state, { payload }) => {
      state.MyNftLoading = payload;
    },
    setToastCount: (state, { payload }) => {
      state.toastCount = payload;
    },
    setIsConnected: (state, { payload }) => {
      state.isConnected = payload;
    },
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMySellNft.pending, (state) => {
        // Optionally handle loading state
        state.MySellNftLoading = true;
      })
      .addCase(fetchMySellNft.fulfilled, (state, action) => {
        state.MySellNft = action.payload; // Set the fetched NFTs
        state.MySellNftLoading = false;
      })
      .addCase(fetchMySellNft.rejected, (state, action) => {
        state.MySellNftLoading = false;
        console.error("Error fetching my sell NFT: ", action.payload);
      });
  },
});

export const {
  setMyNft,
  setSellNft,
  setMySellNft,
  setSellNftLoading,
  setMyNftLoading,
  setToastCount,
  setIsConnected,
  setAddress,
} = datas.actions;
export default datas.reducer;
