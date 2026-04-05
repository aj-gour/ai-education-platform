import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "../components/Chart";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/leaderboard", {
        withCredentials: true
      })
      .then(res => setScores(res.data.map(s => s.score)))
      .catch(() => setScores([10, 20, 30, 25, 40]));
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      
      <div className="h-full flex flex-col">

        {/* Header */}
        <div className="mb-3">
          <h1 className="text-2xl font-bold text-gray-800">
            Student Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Here's your learning progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-3">

          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-gray-500 text-sm">Total Score</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {scores.length ? scores.reduce((a,b)=>a+b,0) : 0}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-gray-500 text-sm">Quizzes Completed</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {scores.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-gray-500 text-sm">Leaderboard Rank</p>
            <h2 className="text-2xl font-bold text-blue-600">
              #{scores.length ? 3 : "-"}
            </h2>
          </div>

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-4 flex-1">

          {/* Performance */}
          <div className="col-span-2 bg-white rounded-xl shadow p-5 flex flex-col">
            <h2 className="font-semibold mb-2">
              Performance Overview
            </h2>

            <div className="flex-1">
              <Chart scores={scores} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow p-5 flex flex-col">
            <h2 className="font-semibold mb-3">
              Quick Actions
            </h2>

            <div className="space-y-3 flex-1">

              <button
                onClick={() => navigate("/quiz")}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-lg 
                shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 
                transition-all duration-200">
                Start Quiz
              </button>

              <button
                onClick={() => navigate("/ai")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2.5 rounded-lg 
                shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 
                transition-all duration-200">
                AI Doubt Solver
              </button>

              <button
                onClick={() => navigate("/planner")}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-2.5 rounded-lg 
                shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 
                transition-all duration-200">
                Study Planner
              </button>

              <button
                onClick={() => navigate("/leaderboard")}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2.5 rounded-lg 
                shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 
                transition-all duration-200">
                Leaderboard
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;