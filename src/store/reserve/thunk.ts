import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Trip } from "../../pages/Home";
import api from "../../services/api";
import { reservingSuccess, updateAmount } from "./reducer";

export const fetchTripById = createAsyncThunk(
  'trip/fetchByIdStatus', 
  async(id: number, thunkApi)=>{
    const state = thunkApi.getState() as RootState
    const tripExists = state.reserve.value.find((trip:Trip) => trip.id === id)!
    if(tripExists){
      console.log(tripExists);
      const amount = tripExists.amount + 1
      thunkApi.dispatch(updateAmount({id, amount}))
    }else {
      const response = await api.get<Trip>(`trips/${id}`)
  
      const data:Trip = {
        ...response.data,
        amount: 1
      }
    
      console.log(data);
      return thunkApi.dispatch(reservingSuccess(data))
    }
  }
)