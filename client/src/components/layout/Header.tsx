import React from "react";

const Header = () => {
  return (
    <header className="w-screen bg-[url('assets/bg-mobile-dark.jpg')] h-72 bg-no-repeat bg-cover p-4 bg-gray-800">
      <nav className="flex w-11/12 mx-auto items-center justify-between">
        <h1 className="text-xl font-bold text-white">To-Do List</h1>
        <div className="w-1/4 h-full space-x-4 flex">
          <button className="bg-white text-gray-200 text-xs font-bold w-12 py-1 px-2 rounded">
            Sign In
          </button>
          <button className="bg-white text-gray-200 text-xs w-12 py-1 px-2 space-x-8 rounded">
            Sign Out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
