import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionsService from "./questionsService";

// Getting user from local storage for POST and DELETE methods / services
// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  questions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// All questions
const getQuestions = createAsyncThunk(
  "questions/allQuestions",
  async (info, thunkAPI) => {
    try {
      console.log(info);
      return await questionsService.getQuestions();
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// One question
const getQuestion = createAsyncThunk(
  "questions/oneQuestion",
  async (questionID, thunkAPI) => {
    try {
      return await questionsService.oneQuestion(questionID);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const newQuestion = createAsyncThunk(
  "questions/newQuestion",
  async (questionData, thunkAPI) => {
    try {
      // thunkAPI has an access to other states as well. getState -> gets auth state and extracts from state in this case JWT token
      const token = thunkAPI.getState().auth.user.token;
      return await questionsService.newQuestion(questionData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.questions = [];
    },
  },
  // Async reducers below
  extraReducers: (builder) => {
    builder
      // All questions reducers
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.questions = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.questions = null;
        state.message = action.payload;
      })
      // New question reducers
      .addCase(newQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.questions.push(action.payload);
      })
      .addCase(newQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Question by ID
      .addCase(getQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.questions = action.payload;
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.questions = null;
        state.message = action.payload;
      });
  },
});

const { reset } = questionsSlice.actions;

export { reset, questionsSlice, getQuestions, newQuestion, getQuestion };
export default questionsSlice.reducer;
