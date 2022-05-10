import { Provider } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Routers } from "./routes"
import {store} from "./store"


function App() {

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routers />
      </Router>
    </Provider>
  )
}

export default App
