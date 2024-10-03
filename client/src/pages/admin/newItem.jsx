import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewItem = () => {
  const [item_name, setName] = useState("");
  const [item_ingredients, setIngredients] = useState("");
  const [item_description, setDescription] = useState("");
  const [item_price, setPrice] = useState("");
  const [imgCounter, incrementImgCounter] = useState(1);
  const [imgInputs, setImgInputs] = useState([]);

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
          item_img_Link: imgInputs,
        }
      );
      alert(response.data);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Error adding item");
    }
  };

  const testSubmit = () => {
    console.log(imgInputs);
  };

  useEffect(() => {
    const initialImgInputs = [];
    for (let i = 0; i < imgCounter; i++) {
      initialImgInputs.push({ imgId: i, link: "" });
    }
    setImgInputs(initialImgInputs);
  }, [imgCounter]);

  return (
    <>
      <div className="newItem">
        <div>
          <button
            onClick={() =>
              imgCounter < 1
                ? incrementImgCounter(0)
                : incrementImgCounter(imgCounter - 1)
            }
          >
            -
          </button>
          <button onClick={() => incrementImgCounter(imgCounter + 1)}>+</button>
        </div>
        <div>
          {imgInputs.map((input, index) => (
            <input
              key={input.imgId}
              type="text"
              placeholder={`Image ${index + 1}`}
              value={input.link}
              onChange={(e) => {
                const newImgInputs = [...imgInputs];
                newImgInputs[index].link = e.target.value;
                setImgInputs(newImgInputs);
              }}
            />
          ))}
          <button onClick={testSubmit}>Test</button>
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
