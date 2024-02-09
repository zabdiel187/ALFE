import { useNavigate } from "react-router-dom";
import "./admin.css";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="adminPage">
      <h1> Admin Page</h1>
      <div className="adminButtonsContainer">
        <button
          onClick={() => {
            navigate("/admin/addProducts");
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
    </div>
  );
};

export default Admin;
