import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Chart from "./components/Chart";
import Chat from "./components/Chat";
import Leaderboard from "./components/Leaderboard";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";

const App = () => {
  return (
      <div>

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/navbar" element={<Navbar />} />
        </Routes> 
      </div>
  );
};

export default App;