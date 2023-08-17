import React, { useEffect, useState } from "react";
import { useStore } from "../stores/MenuStore";
import Axios from "axios";
import "./checkout.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
  const order = useStore((state) => state.cart);
  const subtotal = useStore((state) => state.subtotal);
  const pickupDate = useStore((state) => state.date);
  const clearCart = useStore((state) => state.clearCart);
  const deleteItem = useStore((state) => state.deleteItem);
  const incrementItem = useStore((state) => state.incrementItem);
  const decrementItem = useStore((state) => state.decrementItem);
  const [clickUser, setClickUser] = useState(true);
  const [clickCart, setClickCart] = useState(false);
  const [customerName, setName] = useState("");
  const [customerNumber, setNumber] = useState("");
  const [customerMSG, setMsg] = useState();
  const [cash, setCash] = useState(false);
  const [zelle, setZelle] = useState(false);

  const setDate = useStore((state) => state.setDate);
  const date = useStore((state) => state.date);
  const clearDate = useStore((state) => state.clearDate);
  const navigate = useNavigate()

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
    if (order.length < 1) {
      alert("The cart is empty");
    }
    else if (customerName.length < 1) {
      alert("Please enter your name")
    }else if (customerNumber.length < 1) {
      alert("Please enter your phone number")
    }
     else if (cash === false && zelle === false) {
      alert("Please select a payment method")
    }
      else if (pickupDate === null) {
      alert("Please select a pickup date")
    }
    else{
       Axios.post("http://localhost:3001/api/sendOrder", {
        pickupDate: pickupDate,
        name: customerName,
        number: customerNumber,
        msg: customerMSG,
        order: order,
        subtotal: subtotal,
        payWith: cash
          ? "Cash"
          : "Zelle"
            
       }).then(
          navigate('/confirmation')
      );
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
                  <p>Price: ${Number(item.price).toFixed(2)}</p>
                  <div className="amount">
                    <div className="increment">
                      <i
                        className="fas fa-minus"
                        onClick={() =>
                          item.quantity > 1
                            ? decrementItem(item)
                            : deleteItem(item)
                        }
                      />
                    </div>
                    <p className="quantity">{item.quantity}</p>
                    <div className="increment">
                      <i
                        className="fas fa-plus"
                        onClick={() => incrementItem(item)}
                      />
                    </div>
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
      <h4>Pickup Date:</h4>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        filterDate={(date) =>
          date.getDay() !== 1 &&
          date.getDay() !== 2 &&
          date.getDay() !== 3 &&
          date.getDay() !== 4 &&
          date.getDay() !== 5
        }
        minDate={new Date()}
        dateFormat="MM/dd/yyyy"
        withPortal
      />
      <h3>Subtotal: ${order.length > 0 ? Number(subtotal).toFixed(2) : 0}</h3>
      <button onClick={handleSubmit}>Submit reservation </button>
    </div>
  );
};

export default Checkout;
