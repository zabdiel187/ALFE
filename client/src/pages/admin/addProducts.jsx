import "./addProducts.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

const AddProducts = () => {
  const [item_name, setName] = useState("");
  const [item_ingredients, setIngredients] = useState("");
  const [item_description, setDescription] = useState("");
  const [item_price, setPrice] = useState("");
  const [item_img_Link, setImgLink] = useState("");
  const [menu, setMenu] = useState([]);
  const [edit, setEdit] = useState([]);

  const serverEndpoint = "http://localhost:3001";

  useEffect(() => {
    const getMenu = async () => {
      const res = await fetch(serverEndpoint + "/menu");
      const getData = await res.json();
      setMenu(getData.map((item) => ({ ...item, quantity: 0, totalPrice: 0 })));
    };

    getMenu();
  }, [menu]);

  const submitForm = async () => {
    try {
      Axios.post(serverEndpoint + "/admin/addProducts", {
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

  const handleDelete = (item_ID) => {
    try {
      Axios.post(serverEndpoint + "/deleteProduct", {
        itemID: item_ID,
      }).then(() => {
        alert("product deleted");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setEdit(!edit);
    console.log(edit);
  };

  const moveDown = (item_ID) => {
    try {
      Axios.post(serverEndpoint + "/admin/updateMenuOrderDown", {
        item_ID: item_ID,
      });
    } catch (error) {
      alert("Failed to move order down");
      console.log(error);
    }
  };

  const moveUp = (item_ID) => {
    try {
      Axios.post(serverEndpoint + "/admin/updateMenuOrderUp", {
        item_ID: item_ID,
      });
    } catch (error) {
      alert("Failed to move order up");
      console.log(error);
    }
  };

  return (
    <div className="addItemsContainer">
      <div className="addProductBtnContainer">
        <div className="newItemBtn">Add new Item</div>
      </div>
      <div className="menuItems">
        {menu.map((item, index) => (
          <div className="item-containers" key={item.item_ID}>
            <h1>{item.item_name}</h1>
            <p>${item.item_price}</p>
            {/* <img src={item.item_img_Link} className="item-image" alt="img" /> */}
            <img
              src={"https://via.placeholder.com/150"}
              className="itemImage"
              alt="img"
            />

            <div className="buttonContainer">
              <button className="editButton" onClick={handleEdit}>
                Edit Item
              </button>
              <button className="deleteButton">Delete Item</button>
            </div>

            {/* <div className={edit ? "hidden" : "default"}>
              <i
                className={item.item_ID === 1 ? "hidden" : "fa fa-sort-up"}
                onClick={() => moveUp(item.item_ID)}
              />
              <img src={item.item_img_Link} className="item-image" alt="img" />
              <p>
                Img: <input type="text" value={item.item_img_Link} />
              </p>
              <p>
                Name: <input type="text" value={item.item_name} />
              </p>
              <p>
                Ingredients:
                <input type="text" value={item.item_ingredients} />
              </p>
              <p>
                Description:
                <input type="text" value={item.item_description} />
              </p>
              <p>
                Price: $ <input type="text" value={item.item_price} />
              </p>
              <i
                className={
                  item.item_ID === menu.length ? "hidden" : "fa fa-sort-down"
                }
                onClick={() => {
                  moveDown(item.item_ID);
                }}
              />
              <button onClick={() => handleDelete(item.item_ID)}>
                Delete Item
              </button>
              <button onClick={() => handleEdit()}>Save Item</button>
            </div> */}
          </div>
        ))}
      </div>

      <div className="newProduct">
        <div className="product">
          Img:
          <input
            type="text"
            placeholder="Img discord link"
            className="image_input"
            onChange={(e) => setImgLink(e.target.value)}
          />
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
    </div>
  );
};

export default AddProducts;
