import { useEffect, useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState();
  const [search, setSearch] = useState("");

  const PORT = "http://localhost:3001";

  useEffect(() => {
    const getRequests = async () => {
      const res = await fetch(PORT + "/admin/requests?search=" + search);
      const getRequests = await res.json();
      setRequests(getRequests.map((request) => ({ ...request })));
    };

    getRequests();
  }, [search, requests]);
  return (
    <>
      <div className="requests">
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <h1>Requests page</h1>
        <table>
          <thead>
            <th>Request Number</th>
            <th>Date Ordered</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Order Details</th>
            <th>Subtotal</th>
            <th>Pickup Date</th>
            <th>Payment Type</th>
            <th>Accept Order?</th>
          </thead>
          <tbody>
            {console.log(requests)}
            {requests.map((request) => (
              <tr key={request.requestNum}>
                <td>{request.requestNum}</td>
                <td>{request.dateOrdered}</td>
                <td>{request.customerName}</td>
                <td>
                  {request.customerNumber.substring(0, 3) +
                    "-" +
                    request.customerNumber.substring(3, 6) +
                    "-" +
                    request.customerNumber.substring(6, 10)}
                </td>
                <td>{request.cart}</td>
                <td>{request.subtotal}</td>
                <td>{request.pickupDate}</td>
                <td>{request.paymentType}</td>
                <td>
                  <button>yes</button>
                  <button>no</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Requests;
