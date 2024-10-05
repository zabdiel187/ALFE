import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../common/navbar";
import "./selectedItem.css";
import { useAdminStore } from "../stores/adminStore";

const SelectedItem = () => {
  const { itemID, itemName } = useParams();
  const backendPath = useAdminStore((state) => state.BACKEND);

  const [item, setItem] = useState(null);

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
                <ul className="entries" tabindex="0">
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
              <h1> {item.item_name}</h1>
              <p>{item.item_ingredients}</p>
              <p>{item.item_description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SelectedItem;
