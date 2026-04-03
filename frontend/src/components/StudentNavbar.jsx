import React from "react";

const StudentNavbar = ({ setActiveTab }) => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        Student Dashboard
      </h1>

      <div className="flex gap-4">

        <button onClick={() => setActiveTab("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setActiveTab("quiz")}>
          Quiz
        </button>

        <button onClick={() => setActiveTab("chat")}>
          AI Doubt Solver
        </button>

        <button onClick={() => setActiveTab("planner")}>
          Daily Planner
        </button>

        <button onClick={() => setActiveTab("leaderboard")}>
          Leaderboard
        </button>

      </div>

    </div>
  );
};

export default StudentNavbar;