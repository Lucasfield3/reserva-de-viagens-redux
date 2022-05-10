import { useEffect, useState } from "react";
import api from "../../services/api";
import { MdFlightTakeoff } from 'react-icons/md'

import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { reserving } from "../../store/reserve/reducer";

export interface Trip {
    id: number;
    title: string;
    status: boolean;
    image: string;
}

export const Home = () => {

    const dispatch = useDispatch()
    const addTrip = useSelector(state => state)
    const [trips, setTrips] = useState<Trip[]>([])

    useEffect(() => {
        const loadTrips = async (): Promise<Trip[] | any> => {
            const response = await api.get<Trip[]>('trips')
            setTrips(response.data)
        }

        loadTrips()
    }, [])

    const handleAdd = (trip:Trip)=>{
        dispatch(reserving(trip))
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
                                onClick={() => handleAdd(trip)}
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