import React from "react";
import Header from "./components/layout/Header";
import ToDoForm from "./components/todo/ToDoForm";
import ToDoList from "./components/todo/ToDoList";
const App = () => {
  return (
    <div className="h-screen bg-black">
      <Header />
      <main className="flex flex-col items-center">
        <ToDoForm />
        <ToDoList />
      </main>
    </div>
  );
};

export default App;
