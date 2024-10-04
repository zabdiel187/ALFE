import "./products.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useAdminStore } from "../../stores/adminStore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [menu, setMenu] = useState([]);

  const setSelectedId = useAdminStore((state) => state.setSelectedId);

  const navigate = useNavigate();

  const serverEndpoint = "http://localhost:3001";

  useEffect(() => {
    const getMenu = async () => {
      const res = await fetch(serverEndpoint + "/menu");
      const getData = await res.json();
      setMenu(getData.map((item) => ({ ...item, quantity: 0, totalPrice: 0 })));
    };

    getMenu();
  }, [menu]);

  const handleDelete = (item_ID, item_name) => {
    try {
      Axios.post(serverEndpoint + "/admin/products/deleteItem", {
        itemID: item_ID,
        itemName: item_name,
      }).then(() => {
        alert("Item deleted");
      });
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  const handleEdit = (itemId) => {
    setSelectedId(itemId);
    navigate("/admin/products/editItem");
  };

  const unstring = (string) => {
    return JSON.parse(string);
  };

  return (
    <div className="addItemsContainer">
      <button onClick={() => navigate("/admin")}>Go Back</button>
      <div className="addProductBtnContainer">
        <Link className="newItemBtn" to="/admin/products/newItem">
          Add new Item
        </Link>
      </div>
      <div className="menuItems">
        {menu.map((item) => (
          <div className="item-containers" key={item.item_ID}>
            <h1>{item.item_name}</h1>
            <p>${item.item_price}</p>
            <img
              src={unstring(item.item_img_Link)[0].link}
              className="itemImage"
              alt="img"
            />

            <div className="buttonContainer">
              <button
                className="deleteButton"
                onClick={() => handleDelete(item.item_ID, item.item_name)}
              >
                Delete Item
              </button>
              <button
                className="editButton"
                onClick={() => handleEdit(item.item_ID)}
              >
                Edit Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProducts;
