import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeTrip } from '../../store/reserve/reducer';
import './style.css'

export const Reservas = () => {
    const reserves = useSelector((state:RootState)=> state.reserve.value)

    const dispatch = useDispatch()

    console.log('Minhas reservas', reserves);
    
    const handleRemove = (id:number)=>{
        dispatch(removeTrip(id))
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
                            <span>Quantidade: {reserve.amount} </span>
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