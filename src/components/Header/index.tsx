import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import logo from '../../assets/logo.svg'
import { RootState } from "../../store";
import './style.css'

export const Header = () => {

    const reserveSizing = useSelector((state:RootState) => state.reserve.value.length)

    return (
        <header className="container">
            <Link to='/'>
                <img className="logo" src={logo} alt="Logo do projeto" />
            </Link>
            <div className="reserva">
                <div>
                    <strong>Minhas reservas</strong>
                    <span>{reserveSizing} reservas</span>
                </div>
            </div>

        </header>
    );
};