import React, { useEffect, useState } from "react";
import "./menu.css";
import { useStore } from "../stores/MenuStore";
import Navbar from "../common/navbar";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  //const [quantiddy, setQuantity] = useState(0);

  const setSelectedId = useStore((state) => state.setSelectedId);
  const SERVER = "http://localhost:3001";
  const navigate = useNavigate();

  useEffect(() => {
    const getMenu = async () => {
      const res = await fetch(SERVER + "/menu");
      const getData = await res.json();
      setMenu(getData.map((item) => ({ ...item, quantity: 0, totalPrice: 0 })));
    };

    getMenu();
  }, []);

  const handleChange = (itemId, quantity, price) => {
    // setQuantity(quantity);

    if (quantity < 0 || quantity === null) {
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
    document.getElementById("quantity" + id).value = 0;
  };

  const handleSelect = (item) => {
    new Promise((resolve) => {
      setSelectedId(item.item_ID, item.item_name);
      resolve();
    }).then(() => {
      navigate(`/menu/${item.item_ID}/${item.item_name}`);
    });
  };

  return (
    <>
      <Navbar />
      <div className="menu">
        {menu.length > 0 ? (
          <div className="menu-items">
            <div className="sectionHero">
              <h2>Entrees</h2>
            </div>
            <div className="sectionTitle">
              {menu.map((item) => (
                <div
                  className="item-container"
                  key={item.item_ID}
                  onClick={() => handleSelect(item)}
                >
                  <h3 className="item-name"> {item.item_name}</h3>
                  <img
                    src={item.item_img_Link}
                    className="item-img"
                    alt={item.item_name}
                  />

                  <div className="user-inputs">
                    <input
                      type="number"
                      className="display-quantity"
                      id={"quantity" + item.item_ID}
                      onChange={(e) =>
                        handleChange(
                          item.item_ID,
                          parseInt(e.target.value),
                          item.item_price
                        )
                      }
                    />
                    <div
                      className="submit-order"
                      onClick={() => {
                        if (
                          document.getElementById("quantity" + item.item_ID)
                            .value < 0 ||
                          document.getElementById("quantity" + item.item_ID)
                            .value === 0 ||
                          isNaN(
                            document.getElementById("quantity" + item.item_ID)
                              .value
                          )
                        ) {
                          alert("Please enter a valid quantity");
                        } else {
                          updateOrder(
                            item.item_ID,
                            item.item_name,
                            parseInt(
                              document.getElementById("quantity" + item.item_ID)
                                .value
                            ),
                            item.item_price,
                            item.totalPrice,
                            item.item_img_Link
                          );
                          console.log(
                            "value: " +
                              document.getElementById("quantity" + item.item_ID)
                                .value
                          );
                          console.log(
                            "item: " +
                              item.item_name +
                              " Quantity: " +
                              document.getElementById("quantity" + item.item_ID)
                                .value
                          );
                          clearInput(item.item_ID);
                          console.log(item.quantity);
                        }
                      }}
                    >
                      Add to Cart
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="loadingPage">
            <h1>Loading....</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
