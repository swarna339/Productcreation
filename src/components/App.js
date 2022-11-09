// pages
import { Cart, Create, Detail, Home, NoPage } from "../pages/index";
// components
import { Header, Footer } from "../components/index";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { cartAsyncThunk } from "../features/products/productSlice";



import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";



import "../styles/App.css";
import "react-toastify/dist/ReactToastify.min.css";



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartAsyncThunk());
  });
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="create" element={<Create />} />
          <Route path="*" element={<NoPage />} />
        </Routes>

        <Footer />

        {/* toastify-toast notification */}
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
