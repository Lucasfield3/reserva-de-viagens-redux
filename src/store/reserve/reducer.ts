import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trip } from "../../pages/Home";

const initialState = {
  value: [
    {
      id: 0,
      image: "",
      status: false,
      title: "",
    },
  ] as Trip[],
};

export const reserveSlice = createSlice({
  name: "reserve",
  initialState,
  reducers: {
    reserving: (state, actions: PayloadAction<Trip>) => {
      state.value = [...state.value, actions.payload];
      console.log(state.value);
    },
  },
});

export const { reserving } = reserveSlice.actions;

export default reserveSlice.reducer;
