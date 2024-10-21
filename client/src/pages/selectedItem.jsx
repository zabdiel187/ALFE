import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../common/navbar";
import "./selectedItem.css";
import { useAdminStore } from "../stores/adminStore";
import { useStore } from "../stores/MenuStore";
import Related from "../common/related";

const SelectedItem = () => {
  const { itemID, itemName } = useParams();
  const backendPath = useAdminStore((state) => state.BACKEND);

  const [item, setItem] = useState(null);
  const [order, setOrder] = useState({
    itemId: "",
    itemQuantity: "",
    totalPrice: "0",
  });

  const [isAlertHidden, setIsAlertHidden] = useState(true);

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await fetch(`${backendPath}/menu/${itemID}/${itemName}`);
        const getItem = await res.json();
        if (getItem === null || Object.keys(getItem).length === 0) {
          setItem(null);
        } else {
          setItem(getItem);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getItem();
  }, [itemID, itemName, backendPath]);

  const unstring = (string) => {
    return JSON.parse(string);
  };

  const updateOrder = useStore((state) => state.updateOrder);

  const handleChange = (id, quantity, price) => {
    // setQuantity(quantity);

    if (!quantity || quantity < 0 || quantity === null) {
      // Set quantity to minimum value of 0
      quantity = 1;
    }

    setOrder({
      itemId: id,
      itemQuantity: quantity,
      totalPrice: quantity * price,
    });
  };

  const onSubmit = () => {
    const jsonobj = JSON.parse(item[0].item_img_Link);

    updateOrder(
      item[0].item_ID,
      item[0].item_name,
      order.itemQuantity,
      item[0].item_price,
      order.totalPrice,
      jsonobj[0].link
    );

    setIsAlertHidden(false);
    setTimeout(() => {
      setIsAlertHidden(true);
    }, 2800);
  };

  return (
    <>
      {item === null ? (
        <h1>Item Not Found</h1>
      ) : item.length < 1 ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Navbar />
          {item.map((item) => (
            <div key={item.item_ID} className="itemPage">
              <div className="imgGallery" data-component="carousel">
                <ul className="entries">
                  {unstring(item.item_img_Link).map((images) => (
                    <li key={images.imgId} className="imgContainers">
                      <img
                        id={`image${images.imgId}`}
                        src={images.link}
                        alt={`img${images.imgId}`}
                      />
                    </li>
                  ))}
                </ul>
                <ul className="markers">
                  {unstring(item.item_img_Link).map((images, index) => (
                    <li key={index}>
                      <a href={`#image${images.imgId}`}>
                        <img
                          className="thumbnail"
                          src={images.link}
                          alt={`img${images.imgId}`}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="infoContainer">
                <h1> {item.item_name}</h1>
                <p>${item.item_price}</p>
                <p>{item.item_ingredients}</p>
                <p>{item.item_description}</p>

                <input
                  type="number"
                  className="displayQuantity"
                  id={"quantity" + item.item_ID}
                  min={1}
                  onChange={(e) =>
                    handleChange(
                      item.item_ID,
                      parseInt(e.target.value),
                      item.item_price
                    )
                  }
                />
                <h3>Total Price: ${order.totalPrice}</h3>

                <div className="submitOrder" onClick={onSubmit}>
                  Add to Cart
                </div>

                <div className={isAlertHidden ? "hidden " : "alertOnSubmit "}>
                  {order.itemQuantity}x {item.item_name} was added to cart
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Related />
    </>
  );
};

export default SelectedItem;
