import { useEffect, useState } from "react";
import api from "../../services/api";
import { MdFlightTakeoff } from 'react-icons/md'

import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { reservingSuccess } from "../../store/reserve/reducer";
import { addToReserve } from "../../store/reserve/thunk";
import { AppDispatch } from "../../store";

export type Trip = {
    id: number;
    title: string;
    status: boolean;
    image: string;
    amount:number;
}

export const Home = () => {

    const dispatch = useDispatch<AppDispatch>()

    const [trips, setTrips] = useState<Trip[]>([])

    useEffect(() => {
        const loadTrips = async (): Promise<Trip[] | any> => {
            const response = await api.get<Trip[]>('trips')
            setTrips(response.data)
        }

        loadTrips()
    }, [])

    const handleAdd = (id: number)=>{
        dispatch(addToReserve(id))
        //dispatch(addAmount(trip))
    }

    return (
        <div>
            <div className="box">
                {trips.map((trip) => {
                    return (
                        <li key={trip.id}>
                            <img src={trip.image} alt={trip.title} />
                            <strong>{trip.title}</strong>
                            <span>Status: {trip.status ? 'Disponível' : 'Indiponível'}</span>

                            <button
                                type='button'
                                onClick={() => handleAdd(trip.id)}
                            >
                                <div>
                                    <MdFlightTakeoff size={16} color='#fff' />
                                </div>
                                <span>SOLICITAR RESERVA</span>
                            </button>
                        </li>
                    )
                })}
            </div>
            <h1>Home</h1>
        </div>
    );
};
