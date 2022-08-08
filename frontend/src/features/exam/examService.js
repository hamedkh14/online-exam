import axios from "axios";

const API_URL = "/api/exams/";

// Add exam
const addExam = async (examData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, examData, config);

  return response.data;
};

// Get user exams
const getExams = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const examService = {
  addExam,
  getExams,
};

export default examService;
