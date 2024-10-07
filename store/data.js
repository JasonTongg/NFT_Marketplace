import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Abi from "./abi.json";

const initialState = {
  contractAddress: "0x22E92C832498c05f63967d4450Fb30114ACf9E65",
  contractAbi: Abi.abi,
};

export const getApiData = createAsyncThunk("callTitle", async (_, thunkAPI) => {
  try {
    const response = await fetch(``);
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error Fetch Channels Info");
  }
});

const datas = createSlice({
  name: "Datas",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.stateData.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApiData.pending, (state) => {
        state.stateData.isLoading = true;
      })
      .addCase(getApiData.fulfilled, (state, { payload }) => {
        state.stateData.isLoading = false;
        state.stateData.data = payload;
      })
      .addCase(getApiData.rejected, (state) => {
        state.stateData.isLoading = false;
      });
  },
});

export const { setData } = datas.actions;
export default datas.reducer;
