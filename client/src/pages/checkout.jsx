import React, { useEffect, useState } from "react";
import { useStore } from "../stores/MenuStore";
import Axios from "axios";
import "./checkout.css";
import "react-datepicker/dist/react-datepicker.css";

const Checkout = () => {
  const order = useStore((state) => state.cart);
  const subtotal = useStore((state) => state.subtotal);
  const clearCart = useStore((state) => state.clearCart);
  const deleteItem = useStore((state) => state.deleteItem);
  const incrementItem = useStore((state) => state.incrementItem);
  const decrementItem = useStore((state) => state.decrementItem);
  const [clickUser, setClickUser] = useState(true);
  const [clickCart, setClickCart] = useState(true);
  const [customerName, setName] = useState();
  const [customerNumber, setNumber] = useState();
  const [customerMSG, setMsg] = useState();
  const [cash, setCash] = useState(false);
  const [zelle, setZelle] = useState(false);

  const clearDate = useStore((state) => state.clearDate);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    clearDate();
  };

  const toggleUserInfo = () => {
    setClickUser(!clickUser);
  };
  const toggleUserCart = () => {
    setClickCart(!clickCart);
  };

  const toggleCash = () => {
    setCash(!cash);
    setZelle(false);
  };

  const toggleZelle = () => {
    setZelle(!zelle);
    setCash(false);
  };

  const handleSubmit = () => {
    if (zelle) {
      Axios.post("http://localhost:3001/api/sendOrder", {
        name: customerName,
        number: customerNumber,
        msg: customerMSG,
        order: order,
        subtotal: subtotal,
        payWith: "Direct Deposit",
      }).then(alert("Reservation sent."));
    } else if (cash) {
      Axios.post("http://localhost:3001/api/sendOrder", {
        name: customerName,
        number: customerNumber,
        msg: customerMSG,
        order: order,
        subtotal: subtotal,
        payWith: "Cash",
      }).then(alert("Reservation sent."));
    } else {
      alert("Please select a payment method");
    }
  };
  return (
    <div className="checkout">
      <div className="Info">
        <div className="dropdownHeader">
          <div className="dropdownTitle" onClick={() => toggleUserCart()}>
            <h4>Cart</h4>
            <i className={clickCart ? "fa fa-sort-down" : "fa fa-sort-up"} />
          </div>
          <div className={clickCart ? "Input active" : "cart"}>
            <button onClick={() => clearCart()}>Clear Cart</button>
            <hr />
            {order.length > 0 ? (
              order.map((item, index) => (
                <div key={index}>
                  <p>Name: {item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${Number(item.price).toFixed(2)}</p>

                  <div className="increment">
                    <i
                      className="fas fa-plus"
                      onClick={() => incrementItem(item)}
                    />
                    <i
                      className="fas fa-minus"
                      onClick={() =>
                        item.quantity > 1
                          ? decrementItem(item)
                          : deleteItem(item)
                      }
                    />
                  </div>
                  <i
                    className="fas fa-trash"
                    onClick={() => deleteItem(item)}
                  />
                  <hr />
                </div>
              ))
            ) : (
              <p>Cart is empty</p>
            )}
          </div>
        </div>
      </div>

      <div className="Info">
        <div className="dropdownHeader">
          <div className="dropdownTitle" onClick={() => toggleUserInfo()}>
            <h4>Customer Information</h4>
            <i className={clickUser ? "fa fa-sort-down" : "fa fa-sort-up"} />
          </div>

          <div className={clickUser ? "Input active customer" : "CustomerInfo"}>
            <label htmlFor="fname">Full Name: </label>
            <input
              type="form"
              name="fname"
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="number">Phone Number: </label>
            <input
              type="form"
              name="number"
              maxLength={10}
              placeholder="no spaces"
              onChange={(e) => setNumber(e.target.value)}
            />
            <div className="payment">
              <p>Payment Method: </p>
              <div
                className={cash ? "payWith active" : "payWith"}
                onClick={() => toggleCash()}
              >
                Cash
              </div>
              <div
                className={zelle ? "payWith active" : "payWith"}
                onClick={() => toggleZelle()}
              >
                Zelle
              </div>
            </div>

            <label htmlFor="msg">Aditional Message: </label>
            <input
              type="text"
              name="msg"
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>
        </div>
      </div>
      <h3>Subtotal: ${order.length > 0 ? Number(subtotal).toFixed(2) : 0}</h3>
      <button onClick={handleSubmit}>Submit reservation </button>
    </div>
  );
};

export default Checkout;
