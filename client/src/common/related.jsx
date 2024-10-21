import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../stores/adminStore";

const Related = () => {
  const navigate = useNavigate();
  const [otherItems, setOtherItems] = useState([]);
  const backendPath = useAdminStore((state) => state.BACKEND);

  useEffect(() => {
    const getOtherItems = async () => {
      const res = await fetch(backendPath + "/otherItems");
      const data = await res.json();
      setOtherItems(data);
    };

    getOtherItems();
  }, [backendPath]);

  const handleNavigate = (id, name) => {
    navigate(`/menu/${id}/${name}`);
  };
  return (
    <div>
      {otherItems.map((item) => {
        <div
          key={item.item_Id}
          onClick={handleNavigate(item.item_Id, item.item_name)}
        >
          <p>{item.item_name}</p>
        </div>;
      })}
    </div>
  );
};

export default Related;
