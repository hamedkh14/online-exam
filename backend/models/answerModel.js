const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
  {
    examinerid: {
      type: Number,
      required: [true, "Please add a examinerid"],
    },
    askid: {
      type: Number,
      required: [true, "Please add a askid"],
    },
    answer: {
      type: Number,
      required: [true, "Please add a answer"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Answer", answerSchema);
