import React, { useState } from "react";
import axios from "axios";

const ToDoForm = () => {
  const [toDo, setToDo] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/todos", { toDo });
      // Handle success response from the server
    } catch (error) {
      // Handle error
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDo(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg"
    >
      <label htmlFor="toDo" className="font-bold text-xl mr-2 text-white">
        New To-Do:
      </label>
      <input
        type="text"
        id="toDo"
        name="toDo"
        value={toDo}
        onChange={handleChange}
        className="border rounded p-2 w-64 bg-gray-700 text-white"
      />
      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
      >
        Add To-Do
      </button>
    </form>
  );
};

export default ToDoForm;
