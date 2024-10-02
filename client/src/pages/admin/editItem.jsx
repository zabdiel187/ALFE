import React, { useState, useEffect } from "react";
import { useAdminStore } from "../../stores/adminStore";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const EditItem = () => {
  const serverEndpoint = "http://localhost:3001";
  const [item, setItem] = useState([
    {
      item_ID: "",
      item_description: "",
      item_img_Link: "",
      item_name: "",
      item_price: "",
    },
  ]);
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
    setItem((prevItem) => {
      const updatedItem = { ...prevItem[0], [field]: e.target.textContent };
      return [updatedItem];
    });
  };

  const handleSave = async (item) => {
    try {
      Axios.post(serverEndpoint + "/admin/products/editItem/updateItem", {
        id: item[0].item_ID,
        item_name: item[0].item_name,
        item_ingredients: item[0].item_ingredients,
        item_description: item[0].item_description,
        item_price: item[0].item_price,
      });
      navigate("/admin/products");
    } catch (err) {
      alert("Something went wrong in saving item.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  const handleDelete = () => {
    try {
      Axios.post(serverEndpoint + "/admin/products/deleteItem", {
        itemID: item[0].item_ID,
        itemName: item[0].item_name,
      }).then(() => {
        alert("Item deleted");
        navigate("/admin/products");
      });
    } catch (err) {
      alert("Something went wrong in deleting item.");
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
            onBlur={(e) => handleInputChange(e, "item_name")}
          >
            {item[0].item_name}
          </h1>
          <button onClick={handleDelete}>Delete Item</button>
          <h3 className="headers">Ingredients</h3>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleInputChange(e, "item_ingredients")}
          >
            {item[0].item_ingredients}
          </p>
          <h3 className="headers">Description:</h3>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleInputChange(e, "item_description")}
          >
            {item[0].item_description}
          </p>
          <h3 className="headers">Price:</h3>
          <p>
            $
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleInputChange(e, "item_price")}
            >
              {item[0].item_price}
            </span>
          </p>

          <button onClick={handleCancel}>Cancel Changes</button>
          <button onClick={() => handleSave(item)}>Save Changes</button>
        </div>
      </>
    );
  }
};

export default EditItem;
