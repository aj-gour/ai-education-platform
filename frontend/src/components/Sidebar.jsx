import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed top-0 left-0">
      <h1 className="text-xl font-bold mb-8">
        AI Education
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/quiz"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Quiz
        </Link>

        <Link
          to="/chat"
          className="hover:bg-gray-700 p-2 rounded"
        >
          AI Doubt Solver
        </Link>

        <Link
          to="/leaderboard"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Leaderboard
        </Link>

        <Link
          to="/admin"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Admin Panel
        </Link>

      </nav>
    </div>
  );
};

export default Sidebar;