import { useEffect, useState } from "react";
import Axios from "axios";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isAlertBoxOpen, setAlertBoxOpen] = useState(false);
  const [orderDel, setOrderDel] = useState();

  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch("http://localhost:3001/api/orders");
      const getOrders = await res.json();
      setOrders(getOrders.map((order) => ({ ...order })));
    };

    getOrders();
  }, [orders]);

  const handleToggle = (order) => {
    Axios.post("http://localhost:3001/api/updateOrders", {
      orderNum: order.orderNum,
      isPaid: !order.isPaid,
    });
  };

  const openAlertBox = (order) => {
    setOrderDel(order)
    setAlertBoxOpen(true);
  };

  const closeAlertBox = () => {
    setAlertBoxOpen(false);
  };

  const deleTeOrder = (order) => {
    Axios.post("http://localhost:3001/api/deleteOrder", {
      orderNum: order.orderNum
    }).then(
    setAlertBoxOpen(false)
    )
  }
 
  return (
    <div className="orders-component">
      <h1>Orders: </h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date Ordered</th>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Order</th>
              <th>Subtotal</th>
              <th>Pickup Date</th>
              <th>Payment Type</th>
              <th>Paid?</th>
              <th></th>
            </tr>
          </thead>
         
          <tbody>
         {orders.map((order) => (
            
              <tr
                key={order.orderNum}
                className={order.isPaid ? "completed"+ order.orderNum % 2 : "inProgress" + order.orderNum % 2}
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
                <td><i className="fa fa-trash-o" onClick={() => openAlertBox(order)}/></td>
                </tr>
               ))}
          </tbody>
        </table>
        {isAlertBoxOpen &&
          <div className="alertBox">
            <div className="alertBox-content">
            <h1>You are about to delete order # {orderDel.orderNum}</h1>
            <p>Name: {orderDel.customerName}</p>
            <p>Order: { orderDel.cart}</p>
              <h1>Are you sure?</h1>
              <button onClick={() => deleTeOrder(orderDel)}>Yes</button>
              <button onClick={closeAlertBox}>No</button>
            </div>
        </div>}
      </div>
    </div>
  );
};

export default Orders;
