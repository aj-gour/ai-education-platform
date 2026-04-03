import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";
import Quiz from "../components/Quiz";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("leaderboard");

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      <Navbar />

      <div className="flex gap-4 p-4 border-b bg-white">
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`px-4 py-2 rounded ${
            activeTab === "leaderboard"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Leaderboard
        </button>

        <button
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 rounded ${
            activeTab === "students"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setActiveTab("quiz")}
          className={`px-4 py-2 rounded ${
            activeTab === "quiz"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Quiz
        </button>
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        {activeTab === "leaderboard" && <Leaderboard />}
        {activeTab === "students" && (
          <div className="bg-white p-6 rounded-xl shadow h-full">
            Students List
          </div>
        )}
        {activeTab === "quiz" && (
          <div className="h-full overflow-hidden">
            <Quiz />
          </div>
        )}
      </div>

    </div>
  );
};

export default Admin;