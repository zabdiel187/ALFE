import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { useAdminStore } from "./stores/adminStore";
// import { useState, useEffect } from "react";

import AddProducts from "./pages/admin/products";
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
import SelectedItem from "./pages/selectedItem";

import { AuthProvider } from "./contextAPIs/AuthProvider";

const App = () => {
  //  STORE CLIENT ID IN THE BACKEND SERVER
  // const backendPath = useAdminStore((state) => state.BACKEND);
  // const [googleClientId, setClientID] = useState();

  // useEffect(() => {
  //   const getClientId = async () => {
  //     const res = await fetch(backendPath + "/admin/clientID");
  //     const data = await res.json();
  //     setClientID(data.clientId);
  //   };

  //   getClientId();
  //   console.log("Client Id:");
  //   console.log(googleClientId);
  // }, [backendPath, googleClientId]);

  const clientID =
    "249707423528-286eblc2u30q6hb79a84j69923e5n1hq.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:itemID/:itemName" element={<SelectedItem />} />
            <Route path="/cart" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />

            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/requests" element={<Requests />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/products" element={<AddProducts />} />
            <Route path="/admin/products/editItem" element={<EditItem />} />
            <Route path="/admin/products/newItem" element={<NewItem />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
