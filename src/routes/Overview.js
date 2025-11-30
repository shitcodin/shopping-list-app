import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const Overview = () => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    api.fetchLists().then((data) => {
      setLists(data);
      setIsLoading(false);
    });
  }, []);

  const handleCreate = () => {
    if(!newListName) return;
    setIsLoading(true);
    api.createList(newListName).then(list => {
        setLists([...lists, list]);
        setNewListName("");
        setIsLoading(false);
    });
  };

  const handleDelete = (id) => {
      if(!window.confirm("Удалить?")) return;
      setIsLoading(true);
      api.deleteList(id).then(() => {
          setLists(lists.filter(l => l.id !== id));
          setIsLoading(false);
      });
  }

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Списки покупок</h1>
      <div style={{ marginBottom: 20 }}>
          <input value={newListName} onChange={e => setNewListName(e.target.value)} placeholder="Название нового списка"/>
          <button onClick={handleCreate}>Создать</button>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {lists.map((list) => (
          <div key={list.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <h3>{list.name}</h3>
            <Link to={`/detail/${list.id}`}>Открыть</Link>
            <button onClick={() => handleDelete(list.id)} style={{ marginLeft: 10, color: "red" }}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;