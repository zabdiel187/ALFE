import React, { useState, useEffect } from "react";
import { useAdminStore } from "../../stores/adminStore";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const EditItem = () => {
  const serverEndpoint = "http://localhost:3001";
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getSelectedId = useAdminStore((state) => state.selectedId);

  const navigate = useNavigate();

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await fetch(
          `${serverEndpoint}/admin/products/editItem/${getSelectedId}`
        );
        const getItem = await res.json();
        setItem(getItem);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    getItem();
  }, [getSelectedId]);

  const handleInputChange = (e, field) => {
    setItem({ ...item, [field]: e.target.textContent });
  };

  const handleSave = () => {
    console.log(item);
    navigate("/admin/products");
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  const handleDelete = () => {
    try {
      Axios.post(serverEndpoint + "/admin/deleteItem", {
        itemID: item[0].item_ID,
        itemName: item[0].item_name,
      }).then(() => {
        alert("Item deleted");
        navigate("/admin/products");
      });
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  else {
    return (
      <>
        <div className="editItemPage">
          <h1
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleInputChange(e, "item_name")}
          >
            {item[0].item_name}
          </h1>
          <button onClick={handleDelete}>Delete Item</button>
          <h3 className="headers">Ingredients</h3>
          <p
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleInputChange(e, "item_ingredients")}
          >
            {item[0].item_ingredients}
          </p>
          <h3 className="headers">Description:</h3>
          <p
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleInputChange(e, "item_description")}
          >
            {item[0].item_description}
          </p>
          <h3 className="headers">Price:</h3>
          <p>
            $
            <span
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleInputChange(e, "item_price")}
            >
              {item[0].item_price}
            </span>
          </p>

          <button onClick={handleCancel}>Cancel Changes</button>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </>
    );
  }
};

export default EditItem;
