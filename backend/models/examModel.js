const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a userid"],
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    startDate: {
      type: Date,
      required: [true, "Please add a startdate"],
    },
    endDate: {
      type: Date,
      required: [true, "Please add a enddate"],
    },
    time: {
      type: Number,
      required: [true, "Please add a time"],
    },
    description: {
      type: String,
    },
    link: {
      type: String,
      required: [true, "Please add a link"],
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam", ExamSchema);
