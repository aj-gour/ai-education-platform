import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      default: "General"
    },
    questions: [
      {
        question: String,
        options: [String],
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);