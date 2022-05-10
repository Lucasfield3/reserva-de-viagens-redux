import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Reservas } from "./pages/Reservas";

export const Routers = () => {
    return (
        <Routes>
            <Route element={<Home />} path='/'></Route>
            <Route element={<Reservas />} path='/reservas'></Route>
        </Routes>
    );
};