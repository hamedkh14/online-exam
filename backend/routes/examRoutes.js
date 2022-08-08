const express = require("express");
const router = express.Router();
const {
  addExam,
  getExams,
  updateExam,
} = require("../controllers/examController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getExams).post(protect, addExam);
router.route("/:id").put(protect, updateExam);

module.exports = router;
