import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>

    </div>
  );
};

export default Navbar;