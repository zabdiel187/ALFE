import { useEffect, useState } from "react";
import Axios from "axios";
import "./orders.css";
// import Login from "../../common/login";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isUncheckHandlerOpen, setUncheckHandler] = useState(false);
  const [checkedBox, setCheckedBox] = useState();
  const [isAlertBoxOpen, setAlertBoxOpen] = useState(false);
  const [orderDel, setOrderDel] = useState();
  const [search, setSearch] = useState("");

  // const clientId =
  //   "703742405077-l6tdbv316s305bmtahmj5u9lgllkmvar.apps.googleusercontent.com";

  const SERVER = "http://localhost:3001";

  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch(SERVER + "/admin/orders?search=" + search);
      const getOrders = await res.json();
      setOrders(getOrders.map((order) => ({ ...order })));
    };

    getOrders();
  }, [search, orders]);

  const handleToggle = (order) => {
    if (order.isPaid) {
      openUncheckHandler(order);
    } else {
      Axios.post(SERVER + "/admin/updateOrders", {
        orderNum: order.orderNum,
        isPaid: !order.isPaid,
      });
    }
  };

  const openUncheckHandler = (order) => {
    setCheckedBox(order);
    setUncheckHandler(true);
  };
  const closeUncheckHandler = () => {
    setUncheckHandler(false);
  };

  const uncheckOrder = (order) => {
    Axios.post(SERVER + "/admin/updateOrders", {
      orderNum: order.orderNum,
      isPaid: !order.isPaid,
    }).then(setUncheckHandler(false));
  };

  const openAlertBox = (order) => {
    setOrderDel(order);
    setAlertBoxOpen(true);
  };

  const closeAlertBox = () => {
    setAlertBoxOpen(false);
  };

  const deleTeOrder = (order) => {
    Axios.post(SERVER + "/admin/deleteOrder", {
      orderNum: order.orderNum,
    }).then(setAlertBoxOpen(false));
  };

  return (
    <div className="orders-component">
      <h1>Orders: </h1>
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div>
        <table>
          <thead>
            <tr>
              <th className="orderNumberHeader">Order Number</th>
              <th className="dateOrderedHeader">Date Ordered</th>
              <th className="customerNameHeader">Customer Name</th>
              <th className="phoneNumberHeader">Phone Number</th>
              <th className="orderHeader">Order</th>
              <th className="subtotalHeader">Subtotal</th>
              <th className="pickupDateHeader">Pickup Date</th>
              <th className="paymentTypeHeader">Payment Type</th>
              <th className="isPaidHeader">Paid?</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orderNum}
                className={
                  order.isPaid
                    ? "completed" + (order.orderNum % 2)
                    : "inProgress" + (order.orderNum % 2)
                }
              >
                <td>{order.orderNum}</td>
                <td>{order.dateOrdered}</td>
                <td>{order.customerName}</td>
                <td>
                  {order.customerNumber.substring(0, 3) +
                    "-" +
                    order.customerNumber.substring(3, 6) +
                    "-" +
                    order.customerNumber.substring(6, 10)}
                </td>
                <td>{order.cart}</td>
                <td>${order.subtotal}</td>
                <td>{order.pickupDate}</td>
                <td>{order.paymentType}</td>
                <td className="paid">
                  <i
                    className={
                      order.isPaid ? "fa fa-check-square-o" : "fa fa-square-o"
                    }
                    onClick={() => handleToggle(order)}
                  />
                </td>
                <td>
                  <i
                    className="fa fa-trash-o"
                    onClick={() => openAlertBox(order)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isAlertBoxOpen && (
          <div className="alertBox">
            <div className="alertBox-content">
              <h1>You are about to delete order # {orderDel.orderNum}</h1>
              <p>Name: {orderDel.customerName}</p>
              <p>Order: {orderDel.cart}</p>
              <h1>Are you sure?</h1>
              <button onClick={() => deleTeOrder(orderDel)}>Yes</button>
              <button onClick={closeAlertBox}>No</button>
            </div>
          </div>
        )}
        {isUncheckHandlerOpen && (
          <div className="alertBox">
            <div className="alertBox-content">
              <h1>
                Are you sure you want to uncheck order #{checkedBox.orderNum}
              </h1>
              <p>Name: {checkedBox.customerName}</p>
              <p>Order: {checkedBox.cart}</p>
              <button onClick={() => uncheckOrder(checkedBox)}> Yes </button>
              <button onClick={closeUncheckHandler}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
