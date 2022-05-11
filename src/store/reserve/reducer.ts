import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trip } from "../../pages/Home";
import { produce } from "immer";

const initialState = {
  value: [] as Trip[],
};

export const reserveSlice = createSlice({
  name: "reserve",
  initialState,
  reducers: {
    reserving: (state, actions: PayloadAction<Trip>, value = 0) => {
      return produce(state, (draft) => {
        const tripIndex = draft.value.findIndex(
          (trip) => trip.id === actions.payload.id
        );

        if (tripIndex >= 0) {
          draft.value[tripIndex].amount += 1;
        } else {
          draft.value.push({
            ...actions.payload,
            amount: 1,
          });
        }
      });
    },

    removeTrip: (state, actions: PayloadAction<number>) => {
      return produce(state, (draft) => {
        const tripIndex = draft.value.findIndex(
          (trip) => trip.id === actions.payload
        );

        if (tripIndex >= 0) {
          draft.value.splice(tripIndex, 1);
        }
      });
    },
  },
});

export const { reserving, removeTrip } = reserveSlice.actions;

export default reserveSlice.reducer;
