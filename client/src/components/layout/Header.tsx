import React from "react";
import "../../App.css";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800">
      <h1 className="text-xl font-bold text-white">
        To-Do List
        <span className="ml-2 animate-text">
          <span>Todo</span>
          <span>Tâche à faire</span>
          <span>Zu erledigende Aufgabe</span>
          <span>待办事项</span>
        </span>
      </h1>
    </header>
  );
};

export default Header;
