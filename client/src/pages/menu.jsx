import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import { useStore } from "../stores/MenuStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [quantiddy, setQuantity] = useState([]);
  const [isItemBoxOpen, setItemBoxOpen] = useState(false);
  const [itemFocused, setItemFocused] = useState([]);

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

  const openItem = (item) => {
    setItemFocused(item)
    setItemBoxOpen(true)
  }

  const closeItem = () => {
    setItemBoxOpen(false)
  }

  return (
    <>
      <div className="banner">
        <div className="banner-img">

        </div>
        <div className="banner-content">
          <h1>HOW TO ORDER</h1>
          <p>We cannot take your credit information</p>
          <p>We only accept cash or zelle</p>
          <p>You will have to pick up the food</p>
          <p>Food pick up is only on the weekends</p>
        </div>
      </div>
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

        <hr className="ugly2"></hr>
        
        <h1 className="ugly">MENU</h1>
        <hr className="ugly2"></hr>
        <div className="menu-items">
      {menu.map((item) => (
        <div className="item-content" key={item.item_ID} onClick={() => openItem(item)}>
          <img src={item.item_img_Link} className="item-image" alt="img" />
          <div>
              <h1>{item.item_name}</h1>
          </div>
        </div>
      ))}
          
          {isItemBoxOpen &&
                  <div className="itemBox">
                    <div className="itemBox-content">
                     <h1>{itemFocused.item_name}</h1>
            <p>Ingredients: {itemFocused.item_ingredients}</p>
            <p>Description: {itemFocused.item_description}</p>
            <p>Price: ${itemFocused.item_price}</p>
            <div className="itemFocused-container3">
              <p>Quantity:</p>
              <input
                type="number"
                onChange={(e) =>
                  handleChange(
                    itemFocused.item_ID,
                    parseInt(e.target.value),
                    itemFocused.item_price
                  )
                }
                value={itemFocused.quantity < 0 ? 0 : itemFocused.quantity}
              />
              <button
                onClick={() =>
                  itemFocused.quantity > 0
                    ? updateOrder(
                        itemFocused.item_ID,
                        itemFocused.item_name,
                        quantiddy,
                        itemFocused.item_price,
                        itemFocused.totalPrice,
                        itemFocused.item_img_Link
                      )
                    : alert("cannot be empty")
                }
              >
                  Add to cart
              </button>
            </div>
            <p>Total: ${itemFocused.totalPrice.toFixed(2)}</p>
                    <button onClick={() => closeItem()}>Close</button>
                    </div>
                </div>}

          </div>
      <Link className="addBtn" to="/addProducts">
        Add Item
      </Link>
      </div>
      </>
  );
};

export default Menu;
