import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Trip } from "../../pages/Home";
import api from "../../services/api";
import history from "../../services/history";
import { reservingSuccess, updateAmountSuccess } from "./reducer";

export interface Stock {
  id:number;
  amount:number;
}

export const addToReserve = createAsyncThunk(
  'trip/fetchByIdStatus', 
  async(id: number, thunkApi)=>{
    const state = thunkApi.getState() as RootState
    const tripExists = state.reserve.value.find((trip:Trip) => trip.id === id)!

    const stock = await api.get<Stock>(`stock/${id}`)

    const stockAmount = stock.data.amount

    const currentStock = tripExists ? tripExists.amount + 1 : 0

    if(currentStock > stockAmount){
      alert('Quantidade máxima alcançada.')
      return
    }

    if(tripExists){
      const amount = tripExists.amount + 1
      thunkApi.dispatch(updateAmountSuccess({id, amount}))
      history.push('/reservas')
    }else {
      const trip = await api.get<Trip>(`trips/${id}`)
  
      const data:Trip = {
        ...trip.data,
        amount: 1
      }
    
      console.log(data);
      thunkApi.dispatch(reservingSuccess(data))
      history.push('/reservas')
    }
  }
)


export const updateAmount = createAsyncThunk(
  'amount/updateAmountStatus',
  async ({id, amount}:Stock, thunkApi) => {
    if(amount <= 0) return

    const myStock = await api.get<Stock>(`stock/${id}`)

    const stockAmount = myStock.data.amount

    if(amount > stockAmount){
      alert('Quantidade máxima atingida')
      return
    }

    thunkApi.dispatch(updateAmountSuccess({id, amount}))

  }
)