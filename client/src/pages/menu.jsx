import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import { useStore } from "../stores/MenuStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [quantiddy, setQuantity] = useState([]);

  const setDate = useStore((state) => state.setDate);
  const date = useStore((state) => state.date);
  const clearDate = useStore((state) => state.clearDate);

  useEffect(() => {
    const getMenu = async () => {
      const res = await fetch("http://localhost:3001/api/menu");
      const getData = await res.json();
      setMenu(getData.map((item) => ({ ...item, quantity: 0, totalPrice: 0 })));
    };

    getMenu();
  }, []);

  const handleChange = (itemId, quantity, price) => {
    setQuantity(quantity);

    if (quantity < 0) {
      // Set quantity to minimum value of 0
      quantity = 0;
    }

    if (!quantity) {
      // If quantity is empty, set total price to 0
      setMenu((prevMenu) =>
        prevMenu.map((item) =>
          item.item_ID === itemId ? { ...item, quantity, totalPrice: 0 } : item
        )
      );
      return;
    }

    const temp = Math.round((price * quantity + Number.EPSILON) * 100) / 100;
    setMenu((prevMenu) =>
      prevMenu.map((item) =>
        item.item_ID === itemId ? { ...item, quantity, totalPrice: temp } : item
      )
    );
  };

  const updateOrder = useStore((state) => state.updateOrder);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    clearDate();
  };

  return (
    <div className="menu">
      <div className="date-container">
        <h4>Select a pickup date: </h4>
        <DatePicker
          className="date-picker"
          selected={date}
          onChange={(date) => setDate(date)}
          filterDate={(date) =>
            date.getDay() !== 1 &&
            date.getDay() !== 2 &&
            date.getDay() !== 3 &&
            date.getDay() !== 4 &&
            date.getDay() !== 5
          }
          minDate={new Date()}
          dateFormat="MM/dd/yyyy"
          withPortal
        />
      </div>

      {menu.map((item) => (
        <div className="item-container" key={item.item_ID}>
          <img src={item.item_img_Link} className="item-image" alt="img" />
          <div>
            <h1>{item.item_name}</h1>
            <p>Ingredients: {item.item_ingredients}</p>
            <p>Description: {item.item_description}</p>
            <p>Price: ${item.item_price}</p>
            <div className="item-container3">
              <p>Quantity:</p>
              <input
                type="number"
                onChange={(e) =>
                  handleChange(
                    item.item_ID,
                    parseInt(e.target.value),
                    item.item_price
                  )
                }
                value={item.quantity < 0 ? 0 : item.quantity}
              />
              <button
                onClick={() =>
                  item.quantity > 0
                    ? updateOrder(
                        item.item_ID,
                        item.item_name,
                        quantiddy,
                        item.item_price,
                        item.totalPrice,
                        item.item_img_Link
                      )
                    : alert("cannot be empty")
                }
              >
                Add to cart
              </button>
            </div>
            <p>Total: ${item.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      ))}

      <Link className="addBtn" to="/addProducts">
        Add Item
      </Link>
    </div>
  );
};

export default Menu;
