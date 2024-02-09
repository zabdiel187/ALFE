import React from "react";
import { Route, Routes } from "react-router-dom";

import AddProducts from "./pages/addProducts";
import Menu from "./pages/menu";
import Checkout from "./pages/checkout";
import Orders from "./pages/admin/orders";
import Confirmation from "./pages/confirmation";
import Login from "./common/login";
import Admin from "./pages/admin/admin";
import Requests from "./pages/admin/requests";

/*
import Home from "./pages/home";
import { SignUp } from "./pages/signUp";
import Login from "./pages/login";
import CreateGroup from "./pages/createGroup";
*/

// Create a context to hold the authentication state

const App = () => {
  // const pull_name = (props) => {};

  return (
    <>
      <Routes>
        {/*
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login name={pull_name} />} />
        <Route path="/createGroup" element={<CreateGroup />} />
        */}
        <Route path="/" element={<Menu />} />
        <Route path="/admin/addProducts" element={<AddProducts />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/requests" element={<Requests />} />
      </Routes>
    </>
  );
};

export default App;
