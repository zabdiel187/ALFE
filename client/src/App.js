import React from "react";
import { Route, Routes } from "react-router-dom";

import AddProducts from "./pages/admin/addProducts";
import Menu from "./pages/menu";
import Checkout from "./pages/checkout";
import Orders from "./pages/admin/orders";
import Confirmation from "./pages/confirmation";
import Login from "./common/login";
import Admin from "./pages/admin/admin";
import Requests from "./pages/admin/requests";
import NewItem from "./pages/admin/newItem";
import EditItem from "./pages/admin/editItem";
import Home from "./pages/home";

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

        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin/products" element={<AddProducts />} />
        <Route path="/admin/products/newItem" element={<NewItem />} />
        <Route path="/admin/products/editItem" element={<EditItem />} />
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
