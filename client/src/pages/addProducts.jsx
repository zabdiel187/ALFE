import "../App.css";
import React, { useState } from "react";
import Axios from "axios";

const AddProducts = (props) => {
  const [item_name, setName] = useState("");
  const [item_ingredients, setIngredients] = useState("");
  const [item_description, setDescription] = useState("");
  const [item_price, setPrice] = useState("");
  const [item_img_Link, setImgLink] = useState("");

  const submitForm = async () => {
    try {
      Axios.post("http://localhost:3001/api/addProducts", {
        item_name: item_name,
        item_ingredients: item_ingredients,
        item_description: item_description,
        item_price: item_price,
        item_img_Link: item_img_Link,
      }).then(() => alert("product added"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1> Add Product </h1>
      <div id="newProduct">
        <div id="product_inputbox1">
          <input
            type="text"
            id="image_input"
            onChange={(e) => setImgLink(e.target.value)}
          />
        </div>

        <div id="product_inputbox2">
          <div id="product_inputbox3">
            <p>Name: </p>
            <input
              type="text"
              placeholder="Name"
              id="name_input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div id="product_inputbox3">
            <p> Ingredients: </p>
            <input
              type="text"
              placeholder="Ingredients"
              id="ingredients_input"
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div id="product_inputbox3">
            <p> descripition: </p>
            <textarea
              id="description_input"
              rows="5"
              cols="80"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div id="product_inputbox3">
            <p> Price: </p>
            <input
              type="number"
              placeholder="Price"
              id="price_input"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button onClick={submitForm}> Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
