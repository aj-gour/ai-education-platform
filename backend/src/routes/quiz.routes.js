import express from "express";
const router = express.Router();

import { Quiz } from "../models/quiz.model.js";
import { Score } from "../models/score.model.js";
import { IdentiyUser } from "../middleware/auth.middleware.js";


// Admin creates quiz
router.post("/generate", IdentiyUser, async (req, res) => {
  try {
    // delete old quizzes
    await Quiz.deleteMany({});

    const quiz = await Quiz.create({
      questions: [
        {
          question: "What is React?",
          options: ["Library", "Language", "DB", "Framework"],
          answer: "Library",
        },
        {
          question: "What is Node.js?",
          options: ["Runtime", "Browser", "Database", "Library"],
          answer: "Runtime",
        },
        {
          question: "Which hook is used for state?",
          options: ["useRef", "useEffect", "useState", "useMemo"],
          answer: "useState",
        },
        {
          question: "MongoDB is?",
          options: ["SQL DB", "NoSQL DB", "Language", "Framework"],
          answer: "NoSQL DB",
        },
        {
          question: "MongoDB is a?",
          options: ["DB", "user", "Language", "Framework"],
          answer: "DB",
        }
      ],
    });

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Error creating quiz" });
  }
});

// ⭐ USER FETCH QUIZ (IMPORTANT)
router.get("/quiz", IdentiyUser, async (req, res) => {
  try {
    const quiz = await Quiz.findOne().sort({ createdAt: -1 });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quiz" });
  }
});


// Submit score
router.post("/submit", IdentiyUser, async (req, res) => {
  const { score } = req.body;

  const newScore = await Score.create({
    user: req.user.id,
    score,
  });

  res.json(newScore);
});


// ADMIN CREATE CUSTOM QUIZ
router.post("/create", IdentiyUser, async (req, res) => {
  try {
    const { subject, questions } = req.body;

    const quiz = await Quiz.create({
      subject,
      questions
    });

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Error creating quiz" });
  }
});


// GET ALL QUIZZES (ADMIN PANEL)
router.get("/all", IdentiyUser, async (req, res) => {
  try {
    const quiz = await Quiz.find().sort({ createdAt: -1 });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
});


// DELETE QUIZ
router.delete("/:id", IdentiyUser, async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json("Quiz Deleted");
  } catch (err) {
    res.status(500).json({ message: "Error deleting quiz" });
  }
});

export default router;