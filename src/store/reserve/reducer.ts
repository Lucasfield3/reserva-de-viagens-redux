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
    reservingSuccess: (state, actions: PayloadAction<Trip>) => {
      return produce(state, (draft) => {
        draft.value.push(actions.payload)
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

    updateAmount: (
      state,
      actions: PayloadAction<{ id: number; amount: number }>
    ) => {
      if (actions.payload.amount <= 0) {
        return state;
      }
      return produce(state, (draft) => {
        const tripIndex = draft.value.findIndex(
          (trip) => trip.id === actions.payload.id
        );

        if (tripIndex >= 0) {
          draft.value[tripIndex].amount = actions.payload.amount;
        }
      });
    },
  },
});

export const { reservingSuccess, removeTrip, updateAmount } =
  reserveSlice.actions;

export default reserveSlice.reducer;
