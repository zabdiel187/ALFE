import React, { useState, useEffect } from "react";
import { useAdminStore } from "../../stores/adminStore";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./editItem.css";

const EditItem = () => {
  const serverEndpoint = "http://localhost:3001";
  const [item, setItem] = useState([
    {
      item_ID: "",
      item_description: "",
      item_name: "",
      item_price: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const getSelectedId = useAdminStore((state) => state.selectedId);
  const [imgInputs, setImgInputs] = useState([]);
  const navigate = useNavigate();

  const TEMPIMG =
    "https://lh3.googleusercontent.com/pw/AP1GczNOehds_kFIZOlAVHenjZSXhKFbKCMOP8Nujc3bJobzwuDHPHJat--JmZDCvT0ExuEpsbsVPqLPtbgBVzRbB0VVvPbbYN4aPImKNbUIfkeY-SFjDZY=w2400";

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await fetch(
          `${serverEndpoint}/admin/products/editItem/${getSelectedId}`
        );
        const getItem = await res.json();
        setItem(getItem);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    getItem();
  }, [getSelectedId]);

  useEffect(() => {
    if (!isLoading && !hasFetched) {
      const handleImgInputs = () => {
        try {
          setImgInputs(JSON.parse(item[0].item_img_Link));
        } catch (err) {
          console.log("hehe");
        }
      };
      handleImgInputs();
      setHasFetched(true);
    }
  }, [item, isLoading, hasFetched]);

  const handleInputChange = (e, field) => {
    setItem((prevItem) => {
      const updatedItem = { ...prevItem[0], [field]: e.target.textContent };
      return [updatedItem];
    });
  };

  const handleSave = async (item, imgInputs) => {
    try {
      const images = JSON.stringify(imgInputs);
      Axios.post(serverEndpoint + "/admin/products/editItem/updateItem", {
        id: item[0].item_ID,
        item_name: item[0].item_name,
        item_ingredients: item[0].item_ingredients,
        item_description: item[0].item_description,
        item_price: item[0].item_price,
        item_img_Link: images,
      });
      navigate("/admin/products");
    } catch (err) {
      alert("Something went wrong in saving item.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  const handleDelete = () => {
    try {
      Axios.post(serverEndpoint + "/admin/products/deleteItem", {
        itemID: item[0].item_ID,
        itemName: item[0].item_name,
      }).then(() => {
        alert("Item deleted");
        navigate("/admin/products");
      });
    } catch (err) {
      alert("Something went wrong in deleting item.");
      console.log(err);
    }
  };

  const deleteItemImg = (image) => {
    const updatedImgInputs = imgInputs.filter(
      (img) => img.imgId !== image.imgId
    );
    setImgInputs(updatedImgInputs);
  };

  const addNewImg = () => {
    const newImg = { imgId: imgInputs.length + 1, link: TEMPIMG };
    setImgInputs([...imgInputs, newImg]);
  };

  if (isLoading) return <div>Loading...</div>;
  else {
    return (
      <>
        <div className="editItemPage">
          <button onClick={() => navigate("/admin/products")}>Go Back</button>
          {imgInputs.map((image, index) => (
            <div key={index}>
              <img src={image.link} alt={`img${index}`} />
              <input
                type="text"
                value={
                  imgInputs.length > 0
                    ? imgInputs[index].link === TEMPIMG
                      ? ""
                      : imgInputs[index].link
                    : ""
                }
                onChange={(e) => {
                  const newImgInputs = [...imgInputs];
                  newImgInputs[index].link = e.target.value;
                  setImgInputs(newImgInputs);
                }}
              />
              <button onClick={() => deleteItemImg(image)}>Delete Image</button>
            </div>
          ))}
          <button onClick={addNewImg}>Add Img</button>
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleInputChange(e, "item_name")}
          >
            {item[0].item_name}
          </h1>

          <h3 className="headers">Ingredients</h3>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleInputChange(e, "item_ingredients")}
          >
            {item[0].item_ingredients}
          </p>
          <h3 className="headers">Description:</h3>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleInputChange(e, "item_description")}
          >
            {item[0].item_description}
          </p>
          <h3 className="headers">Price:</h3>
          <p>
            $
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleInputChange(e, "item_price")}
            >
              {item[0].item_price}
            </span>
          </p>

          <button onClick={handleDelete}>Delete Item</button>
          <button onClick={handleCancel}>Cancel Changes</button>
          <button onClick={() => handleSave(item, imgInputs)}>
            Save Changes
          </button>
        </div>
      </>
    );
  }
};

export default EditItem;
