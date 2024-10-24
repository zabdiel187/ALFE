import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminStore } from "../stores/adminStore";

const Related = () => {
  const navigate = useNavigate();
  const [otherItems, setOtherItems] = useState([]);
  const backendPath = useAdminStore((state) => state.BACKEND);
  const { itemID } = useParams();

  useEffect(() => {
    const getOtherItems = async () => {
      const res = await fetch(`${backendPath}/menu/otherItems/${itemID}/R`);
      const data = await res.json();
      setOtherItems(data);
    };

    getOtherItems();
  }, [backendPath, itemID]);

  const handleNavigate = (id, name) => {
    navigate(`/menu/${id}/${name}`);
  };

  const unstring = (string) => {
    const jason = JSON.parse(string);
    return jason;
  };

  return (
    <div>
      <h1>Other Entrees: </h1>
      <div className="relatedCarousel">
        {otherItems.map((item, key) => (
          <div
            key={key}
            onClick={() => handleNavigate(item.item_ID, item.item_name)}
            className="otherItem"
          >
            <img
              className="otherItemImg"
              key={key}
              src={unstring(item.item_img_Link)[0].link}
              alt={`img${unstring(item.item_img_Link)[0].linkimgId}`}
            ></img>
            <p>{item.item_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Related;
