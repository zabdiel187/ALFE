import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewItem = () => {
  const [item_name, setName] = useState("");
  const [item_ingredients, setIngredients] = useState("");
  const [item_description, setDescription] = useState("");
  const [item_price, setPrice] = useState("");
  const [item_img_Link, setImgLink] = useState("");

  const serverEndpoint = "http://localhost:3001";
  const navigate = useNavigate();

  const submitForm = async () => {
    try {
      const response = await Axios.post(
        serverEndpoint + "/admin/products/newItem",
        {
          item_name: item_name,
          item_ingredients: item_ingredients,
          item_description: item_description,
          item_price: item_price,
          item_img_Link: item_img_Link,
        }
      );
      alert(response.data);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Error adding item");
    }
  };

  return (
    <>
      <div className="newItem">
        <div>
          <input
            type="text"
            placeholder="Img discord link"
            className="image_input"
            onChange={(e) => setImgLink(e.target.value)}
          />
          ;
        </div>
        <div className="product">
          Name:
          <input
            type="text"
            placeholder="Name"
            className="name_input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="product">
          Ingredients:
          <input
            type="text"
            placeholder="Ingredients"
            className="ingredients_input"
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="product">
          <p>descripition:</p>
          <textarea
            className="description_input"
            rows="5"
            cols="80"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="product">
          Price:
          <input
            type="number"
            placeholder="Price"
            className="price_input"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button onClick={submitForm}> Add new item</button>
      </div>
    </>
  );
};

export default NewItem;
