import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();

  const questions = [
    {
      question: "What is React?",
      options: ["Library", "Language", "Framework", "Database"],
      answer: "Library",
    },
    {
      question: "What is Node.js?",
      options: ["Runtime", "Database", "Browser", "Library"],
      answer: "Runtime",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleSelect = (option) => {
    setAnswers({
      ...answers,
      [current]: option,
    });
  };

  const nextQuestion = () => {
    setCurrent(current + 1);
  };

  const prevQuestion = () => {
    setCurrent(current - 1);
  };

  const submitQuiz = () => {
    // score calculate
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) {
        score++;
      }
    });

    console.log("Score:", score);

    // redirect to dashboard
    navigate("/dashboard");
  };

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg">

        {/* Progress */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-gray-500">
            Question {current + 1} of {questions.length}
          </p>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold mb-6">
          {questions[current].question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {questions[current].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-3 rounded-lg border ${
                answers[current] === option
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">

          <button
            onClick={prevQuestion}
            disabled={current === 0}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {current === questions.length - 1 ? (
            <button
              onClick={submitQuiz}
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={!answers[current]}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg disabled:opacity-50"
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