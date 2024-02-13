import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Requests = () => {
  const [requests, setRequests] = useState();
  const [search, setSearch] = useState("");
  const [targetRequest, setTargetRequest] = useState();
  const [isConfirmed, setConfirmed] = useState(false);
  const [isRejected, setRejected] = useState(false);
  const navigate = useNavigate();

  const SERVER = "http://localhost:3001";

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(SERVER + "/admin/requests?search=" + search);
        const response = await res.json();
        setRequests(response.map((request) => ({ ...request })));
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequests();
  }, [search]);

  const acceptRequest = (request) => {
    if (!isConfirmed) {
      setTargetRequest(request);
      setConfirmed(true);
    } else {
      ///////////////////////////
      try {
        Axios.post(SERVER + "/admin/acceptRequest", {
          requestNum: targetRequest.requestNum,
        });
      } catch (err) {
        console.log(err);
      }
      setConfirmed(false);
    }
  };

  const rejectRequest = (request) => {
    if (!isRejected) {
      setTargetRequest(request);
      setRejected(true);
    } else {
      ////////////////////////////
      console.log(targetRequest.customerName + "'s Request has been rejected");
      setRejected(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          navigate("/admin");
        }}
      >
        Admin Page
      </button>
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
            <tr>
              <th>Request Number</th>
              <th>Date Ordered</th>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Order Details</th>
              <th>Subtotal</th>
              <th>Customer Message</th>
              <th>Pickup Date</th>
              <th>Payment Type</th>
              <th>Accept Order?</th>
            </tr>
          </thead>
          <tbody>
            {requests ? (
              requests.map((request) => (
                <tr
                  key={request.requestNum}
                  className={"inProgress" + (request.requestNum % 2)}
                >
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
                  <td>${request.subtotal}</td>
                  <td>{request.customerMsg}</td>
                  <td>{request.pickupDate}</td>
                  <td>{request.paymentType}</td>
                  <td>
                    <button
                      onClick={() => {
                        acceptRequest(request);
                      }}
                    >
                      yes
                    </button>
                    <button
                      onClick={() => {
                        rejectRequest(request);
                      }}
                    >
                      no
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
        {isConfirmed && (
          <div>
            <h1>Are you sure you want to accept this order?</h1>
            <button onClick={() => acceptRequest()}>Confirm</button>
            <button onClick={() => setConfirmed(false)}>Go back</button>
          </div>
        )}
        {isRejected && (
          <div>
            <h1>Are you sure you want to reject this order?</h1>
            <button onClick={() => rejectRequest()}>Reject</button>
            <button onClick={() => setRejected(false)}>Go back</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Requests;
