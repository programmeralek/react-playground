import { store } from "./store";
import { Provider } from "react-redux";
import ColorCounter from "./Components/colorCounter";
import './App.css'


function App() {
  return (
    <Provider store={store}>
      <ColorCounter></ColorCounter>
    </Provider>
  )
}

export default App;