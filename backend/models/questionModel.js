const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    correctAnswer: {
      type: Number,
    },
    options: {
      type: Array,
      required: [true, "Please add options"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
