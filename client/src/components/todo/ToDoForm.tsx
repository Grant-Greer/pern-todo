import React, { useState } from "react";
import axios from "axios";

const ToDoForm = () => {
  const [toDo, setToDo] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("/api/todos", { toDo })
      .then((response) => {
        console.log(response);
        // Handle success response from the server
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDo(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-36 w-11/12 mx-auto flex items-center space-x-2 p-4 bg-gray-800 rounded-lg"
    >
      <input
        type="text"
        id="toDo"
        name="toDo"
        value={toDo}
        onChange={handleChange}
        className="border rounded p-2 bg-gray-700 text-white"
      />
      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
    </form>
  );
};

export default ToDoForm;
