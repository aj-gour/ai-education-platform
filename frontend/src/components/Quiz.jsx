import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
const Quiz = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/quiz/quiz",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setQuestions(res.data?.questions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSelect = (option) => {
    setAnswers({
      ...answers,
      [current]: option,
    });
  };

  const nextQuestion = () => setCurrent(current + 1);
  const prevQuestion = () => setCurrent(current - 1);

  const submitQuiz = async () => {
    let score = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    await axios.post(
      "http://localhost:3000/api/quiz/submit",
      { score },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Quiz...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No Questions Found
      </div>
    );
  }

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-xl">

        <h1 className="text-xl font-semibold mb-4">
          Quiz Challenge
        </h1>

        <div className="mb-4">
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">
          {questions[current].question}
        </h2>

        <div className="space-y-3">
          {questions[current].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              className={`w-full p-3 rounded border ${
                answers[current] === option
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Previous
          </button>

          {current === questions.length - 1 ? (
            <button
              onClick={submitQuiz}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Quiz;