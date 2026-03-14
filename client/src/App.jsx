import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./Pages/Homepage";
import CheckoutPage from "./Pages/CheckoutPage";
import CustomAlert from "./Components/CustomAlert";
import useBurgerStore from "./store/burgerStore";
import Navbar from "./Components/Navbar";
import OrderHistory from "./Pages/OrderHistory";

function App() {
  const { alert, hideAlert } = useBurgerStore();

  return (
    <>
      <CustomAlert 
         isOpen={alert.isOpen} 
         message={alert.message} 
         type={alert.type} 
         onClose={hideAlert} 
      />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
