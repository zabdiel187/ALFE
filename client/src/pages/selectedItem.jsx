import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../common/navbar";

const SelectedItem = () => {
  const { itemID, itemName } = useParams();
  const serverEndpoint = "http://localhost:3001";

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await fetch(`${serverEndpoint}/menu/${itemID}/${itemName}`);
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
  }, [itemID, itemName]);

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
            <div key={item.item_ID}>
              <div>
                {unstring(item.item_img_Link).map((images) => (
                  <div key={images.imgId}>
                    <img src={images.link} alt={`img${images.imgId}`} />
                  </div>
                ))}
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
