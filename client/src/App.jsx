import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./Pages/Homepage";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
