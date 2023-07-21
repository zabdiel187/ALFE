import { useEffect, useState } from "react";
import Axios from "axios";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch("http://localhost:3001/api/orders");
      const getOrders = await res.json();
      setOrders(getOrders.map((order) => ({ ...order })));
    };

    getOrders();
  });

  const handleToggle = (order) => {
    Axios.post("http://localhost:3001/api/updateOrders", {
      orderNum: order.orderNum,
      isPaid: !order.isPaid,
    });
  };

  return (
    <div>
      <h1>Orders: </h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date Ordered</th>
              <th>Customer Name</th>
              <th>Customer Phone Number</th>
              <th>Order</th>
              <th>Subtotal</th>
              <th>Pickup Date</th>
              <th>Payment Type</th>
              <th>Paid?</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orderNum}
                className={order.isPaid ? "completed" : "inProgress"}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
