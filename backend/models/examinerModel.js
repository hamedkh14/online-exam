const mongoose = require("mongoose");

const examinerSchema = mongoose.Schema(
  {
    userid: {
      type: Number,
      required: [true, "Please add a userid"],
    },
    examid: {
      type: Number,
      required: [true, "Please add a examid"],
    },
    indate: {
      type: Date,
      required: [true, "Please add a indate"],
    },
    outdate: {
      type: Date,
      required: [true, "Please add a outdate"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Examiner", examinerSchema);
