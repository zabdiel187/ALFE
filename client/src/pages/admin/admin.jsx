import { useNavigate } from "react-router-dom";
import "./admin.css";
import Logout from "../../common/logout";
import { useEffect } from "react";

const Admin = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  console.log("Token: ");
  console.log(JSON.parse(token));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="adminPage">
      <h1> Admin Page</h1>
      <div className="adminButtonsContainer">
        <button onClick={() => navigate("/")}>Home</button>

        <button
          onClick={() => {
            navigate("/admin/products");
          }}
        >
          Add Item
        </button>
        <button
          onClick={() => {
            navigate("/admin/requests");
          }}
        >
          Requests
        </button>
        <button
          onClick={() => {
            navigate("/admin/orders");
          }}
        >
          Orders
        </button>
      </div>
      <Logout />
    </div>
  );
};

export default Admin;
