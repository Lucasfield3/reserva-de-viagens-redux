import { Provider } from "react-redux"

import { Header } from "./components/Header"
import { Routers } from "./routes"
import {store} from "./store"
import history  from "./services/history"
import { Router } from "react-router-dom"
import { useEffect, useState } from "react"



function App() {

  const [ state, setState ] = useState({
    action:history.action,
    location:history.location
  })


  useEffect(()=>{
    history.listen(setState)
   }, [history])

  return (
    <Provider store={store}>
      <Router location={state.location}  navigator={history}>
        <Header />
        <Routers />
      </Router>
    </Provider>
  )
}

export default App
