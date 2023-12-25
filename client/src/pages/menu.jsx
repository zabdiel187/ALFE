import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import { useStore } from "../stores/MenuStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [quantiddy, setQuantity] = useState(0);


  const setDate = useStore((state) => state.setDate);
  const date = useStore((state) => state.date);
  const clearDate = useStore((state) => state.clearDate);

  useEffect(() => {
    const getMenu = async () => {
      const res = await fetch("http://localhost:3002/api/menu");
      const getData = await res.json();
      setMenu(getData.map((item) => ({ ...item, quantity: 0, totalPrice: 0 })));
    };

    getMenu();
  }, []);

  const handleChange = (itemId, quantity, price) => {
    setQuantity(quantity);

    if (quantity < 0  || quantity == null) {
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
  const clearInput = (id) => {
    document.getElementById('quantity'+id).value = "";
  }

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
    <>
    <div className="menu">
      <div className="date-container">
          <DatePicker
          label="Select a pickup date"
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

        <div className="menu-items">
         
          {
          /*
         
          {menu.map((item) => (
          
            
          <div className="item-content" key={item.item_ID} onClick={() => openItem(item)}>
            <img src={item.item_img_Link} className="item-image" alt="img" />
            <div>
                <h1>{item.item_name}</h1>
            </div>
          </div>
      ))}
          
          {
            isItemBoxOpen &&
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
              />
              <button
                onClick={() =>
                    updateOrder(
                        itemFocused.item_ID,
                        itemFocused.item_name,
                        quantiddy,
                        itemFocused.item_price,
                        itemFocused.totalPrice,
                        itemFocused.item_img_Link
                      )
                }
              >
                  Add to cart
              </button>
            </div>
            <p>Total: ${itemFocused.totalPrice.toFixed(2)}</p>
                    <button onClick={() => closeItem()}>Close</button>
                    </div>
            </div>

              */
          }
          {menu.map((item) => (

            
            <div className="item-container" key={item.item_ID}>
              <div className="line"><div className="shadow"></div></div>
              <img src={item.item_img_Link} className="item-img" alt={item.item_name} />
              <h1 className="item-name"> {item.item_name}</h1>
                <div className="user-inputs">
                <input type="number" className="display-quantity" id={"quantity" + item.item_ID}  onChange={(e) =>
                  handleChange(
                    item.item_ID,
                    parseInt(e.target.value),
                    item.item_price
                  )
                }/>
                <div className="submit-order" onClick={() => {

                  if (document.getElementById('quantity'+item.item_ID).value == 0 || isNaN(document.getElementById('quantity'+item.item_ID).value)) {
                    alert("Please enter a valid quantity")
                    clearInput(item.item_ID)
                  }else if (document.getElementById('quantity'+item.item_ID).value < 0) {
                    alert("Quantity cannot be negative")
                    clearInput(item.item_ID)
                  } else{
                    //  updateOrder(
                    //     item.item_ID,
                    //     item.item_name,
                    //     quantiddy,
                    //     item.item_price,
                    //     item.totalPrice,
                    //     item.item_img_Link
                    //   ) 

                    console.log("value: " + document.getElementById('quantity'+item.item_ID).value)
                    clearInput(item.item_ID)
                    console.log ("item: " + item.item_name + " Quantity: " + item.quantity)
                    
                  } 
                  
                }
                    
                }>
                    Add to Cart
                  </div>
                </div>
            </div>

             ))}



          </div>
      <Link className="addBtn" to="/addProducts">
        Add Item
      </Link>
      </div>
      </>
  );
};

export default Menu;
