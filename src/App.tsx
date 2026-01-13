import { store } from "./store";
import { Provider } from "react-redux";
import ColorCounter from "./Components/colorCounter";
import './App.css'
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <ColorCounter></ColorCounter>
      </BrowserRouter>
    </Provider>
  )
}

export default App;