import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import examService from "./examService";

const initialState = {
  exams: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add exam
export const addExam = createAsyncThunk(
  "exams/add",
  async (examData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await examService.addExam(examData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user exams
export const getExams = createAsyncThunk(
  "exmas/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await examService.getExams(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addExam.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.exams.push(action.payload);
      })
      .addCase(addExam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exams = action.payload;
      })
      .addCase(getExams.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = examSlice.actions;
export default examSlice.reducer;
