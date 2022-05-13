import { MdDelete, MdRemoveCircle, MdAddCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeTrip, updateAmount } from '../../store/reserve/reducer';
import { Trip } from '../Home';
import './style.css'

export const Reservas = () => {
    const reserves = useSelector((state:RootState)=> state.reserve.value)

    const dispatch = useDispatch()
    
    const handleRemove = (id:number)=>{
        dispatch(removeTrip(id))
    }

    const handleDecrementAmount= (trip:Trip) =>{
        dispatch(updateAmount({id:trip.id, amount:trip.amount - 1}))
    }

    const handleIncrementAmount= (trip:Trip) =>{
        dispatch(updateAmount({id:trip.id, amount:trip.amount + 1}))
    }


    return (
        <div>
            <h1 className='title'>Você solicitou {reserves.length} reservas</h1>

            {reserves.map((reserve)=>{
                return(
                    <>
                        <div key={reserve.id} className='reservas'>
                            <img
                                src={reserve.image}
                                alt={reserve.title}
                            />
                            <strong>{reserve.title}</strong>
                            <div id='amount'>
                                <button type='button' onClick={()=> handleDecrementAmount(reserve)}>
                                    <MdRemoveCircle size={25} color='#191919'/>
                                </button>
                                <input type='text' readOnly value={reserve.amount}/>
                                <button type='button' onClick={()=> handleIncrementAmount(reserve)}>
                                    <MdAddCircle size={25} color='#191919'/>
                                </button>
                            </div>
                            <button
                                type='button'
                                onClick={() => handleRemove(reserve.id)}
                            >
                                <MdDelete size={20} color='#191919' />
                            </button>
                        </div>
                    
                    </>
                )
            })}        
            <footer>
                <button type='button'>Solicitar Reservas</button>
            </footer>
        </div>
    );
};