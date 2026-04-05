
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";
import Chart from "../components/Chart";
import axios from "axios";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [scores, setScores] = useState([]);
  const [students, setStudents] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [quizList, setQuizList] = useState([]);

  const [form, setForm] = useState({
    subject: "",
    questions: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/leaderboard")
      .then(res => setScores(res.data.map(s => s.score)))
      .catch(() => setScores([10, 20, 30]));
  }, []);

  // students
  const fetchStudents = () => {
    axios
      .get("http://localhost:3000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setStudents(res.data));
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:3000/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchStudents());
  };

  // quiz
  const fetchQuiz = () => {
    axios.get("http://localhost:3000/api/quiz/all", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setQuizList(res.data));
  };

  useEffect(() => {
    if (activeTab === "quiz") fetchQuiz();
    if (activeTab === "students") fetchStudents();
  }, [activeTab]);

  const createQuiz = () => {
    axios.post(
      "http://localhost:3000/api/quiz/create",
      {
        subject: form.subject,
        questions: JSON.parse(form.questions)
      },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
      setShowForm(false);
      setForm({ subject:"", questions:"" });
      fetchQuiz();
    });
  };

  const deleteQuiz = (id) => {
    axios.delete(
      `http://localhost:3000/api/quiz/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => fetchQuiz());
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      <Navbar />

      <div className="flex gap-4 p-4 border-b bg-white">
        <button className=" cursor-pointer border-b-2 border-blue-500" onClick={() => setActiveTab("leaderboard")}>Leaderboard</button>
        <button className=" cursor-pointer border-b-2 border-blue-500" onClick={() => setActiveTab("students")}>Students</button>
        <button className=" cursor-pointer border-b-2 border-blue-500" onClick={() => setActiveTab("quiz")}>Quiz</button>
        <button className=" cursor-pointer border-b-2 border-blue-500" onClick={() => setActiveTab("chart")}>Performance</button>
      </div>

      <div className="flex-1 p-6 overflow-auto">

        {activeTab === "leaderboard" && <Leaderboard />}

        {activeTab === "students" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl mb-4">Students</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map(user => (
                  <tr key={user._id} className="border-b">
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => deleteStudent(user._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="space-y-4">

            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Quiz
            </button>

            {showForm && (
              <div className="bg-white p-4 rounded shadow space-y-3">
                <input
                  placeholder="Subject"
                  className="border p-2 w-full"
                  value={form.subject}
                  onChange={(e)=>setForm({...form,subject:e.target.value})}
                />

                <textarea
                  placeholder="Paste questions array"
                  className="border p-2 w-full h-40"
                  value={form.questions}
                  onChange={(e)=>setForm({...form,questions:e.target.value})}
                />

                <button
                  onClick={createQuiz}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save Quiz
                </button>
              </div>
            )}

            {quizList.map(q => (
              <div key={q._id} className="bg-white p-4 rounded shadow flex justify-between">
                <div>
                  <h3 className="font-bold">{q.subject}</h3>
                  <p>{q.questions.length} Questions</p>
                </div>

                <button
                  onClick={()=>deleteQuiz(q._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}

          </div>
        )}

        {activeTab === "chart" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <Chart scores={scores} />
          </div>
        )}

      </div>

    </div>
  );
};

export default Admin;
