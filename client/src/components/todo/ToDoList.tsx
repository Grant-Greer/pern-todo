import React, { useState, useEffect } from "react";
import axios from "axios";

interface ToDo {
  id: string;
  text: string;
  completed: boolean;
}

const ToDoList = () => {
  const [toDos, setToDos] = useState<ToDo[]>([]);

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const response = await axios.get("/api/todos");
        setToDos(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchToDos();
  }, []);

  return (
    <ul className="text-left font-bold text-xl bg-gray-800 rounded-lg p-4">
      {toDos.map((toDo) => (
        <li key={toDo.id} className="border-b p-4">
          <input type="checkbox" checked={toDo.completed} />
          <span className="ml-2 text-white">{toDo.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
