import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./common/navbar";
import Home from "./pages/home";
import { SignUp } from "./pages/signUp";
import Login from "./pages/login";
import CreateGroup from "./pages/createGroup";
import AddProducts from "./pages/addProducts";
import Menu from "./pages/menu";
import Checkout from "./pages/checkout";

// Create a context to hold the authentication state

const App = () => {
  const pull_name = (props) => {};

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login name={pull_name} />} />
        <Route path="/createGroup" element={<CreateGroup />} />
      </Routes>
    </>
  );
};

export default App;
