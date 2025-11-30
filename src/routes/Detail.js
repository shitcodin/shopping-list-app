import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";

const Detail = () => {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    api.fetchListById(id).then(setList);
  }, [id]);

  const handleAddItem = () => {
      if(!itemName) return;
      api.addItem(id, itemName).then(setList);
      setItemName("");
  };

  const handleToggle = (itemId) => {
      api.toggleItem(id, itemId).then(setList);
  };

  if (!list) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">Назад</Link>
      <h1>{list.name}</h1>
      <ul>
          {list.items.map(item => (
              <li key={item.id} style={{ textDecoration: item.solved ? "line-through" : "none" }}>
                  <span onClick={() => handleToggle(item.id)} style={{cursor: "pointer"}}>{item.name}</span>
              </li>
          ))}
      </ul>
      <input value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Купить..." />
      <button onClick={handleAddItem}>Добавить</button>
    </div>
  );
};

export default Detail;