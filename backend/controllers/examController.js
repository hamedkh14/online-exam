const asyncHandler = require("express-async-handler");
const Exam = require("../models/examModel");
const Question = require("../models/questionModel");

// @desc    Add new Exam
// @route   POST /api/exmas
// @access  Private
const addExam = asyncHandler(async (req, res) => {
  const { title, startDate, endDate, description, link, questions } = req.body;

  if (!title || !startDate || !endDate) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Create exam
  const exam = await Exam.create({
    userid: req.user.id,
    title,
    startDate,
    endDate,
    description,
    link,
    time: 0,
  });

  // Create question
  const result = await questions.map(async (question, index) => {
    if (!question.title || !question.options[0]) {
      res.status(400);
      throw new Error("Please add all question fields");
    }
    const qus = await Question.create({
      exam: exam._id,
      title: question.title,
      correctAnswer: question.correctAnswer,
      options: question.options,
    });

    // روش دوم آپدیت سوال
    const examUpdate = await Exam.findOneAndUpdate(
      { _id: exam._id },
      { $push: { questions: qus._id } }
    );
  });

  // روش اول برای افزودن id سوال ها به سوال
  // if (result) {
  //   const questionsID = await Question.find().select("_id");
  //   const examUpdate = await Exam.findOneAndUpdate(
  //     { _id: exam._id },
  //     { questions: questionsID }
  //   );
  // }

  res.status(200).json(exam);
});

// @desc    Get exams
// @route   GET /api/exmas
// @access  Private
const getExams = asyncHandler(async (req, res) => {
  let exams = await Exam.find().populate(
    "questions",
    "title options correctAnswer"
  );
  res.status(200).json(exams);
});

// @desc    Update exam
// @route   PUT /api/exmas
// @access  Private
const updateExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    res.status(400);
    throw new Error("Exam not found");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (exam.userid.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const body = {
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    link: req.body.link,
    time: req.body.time,
  };
  const updateExam = await Exam.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });

  res.status(200).json(updateExam);
});

module.exports = {
  addExam,
  getExams,
  updateExam,
};
