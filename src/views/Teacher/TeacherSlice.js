import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { status } from 'utils/helpers';
import axios from 'axios';
import {
  TEACHER_ENDPOINT,
  ENROLLS_ENDPOINT,
  TO_STUDENT,
  TO_ENROLL,
  QUIZ_ENDPOINT,
} from 'utils/endpoints';

const initialState_Teacher = {
  TeacherQuizList: {},
  TeacherUserList: {},
  UserDetail: {
    data: {},
    role: {},
  },
};

//GET

export const getQuizesTeacher = createAsyncThunk(
  'teacher/getQuizesTeacher',
  async (payload) => {
    const Quiz = await axios.get(
      TEACHER_ENDPOINT + 'quizzesTeacher/' + payload
    );
    return Quiz.data;
  }
);

export const getToEnrollList = createAsyncThunk(
  'teacher/getToEnrollList',
  async (payload) => {
    const Quiz = await axios.get(ENROLLS_ENDPOINT + payload);
    return Quiz.data;
  }
);

//POST

export const enrollToSudent = createAsyncThunk(
  'teacher/enrollToSudent',
  async (payload) => {
    const Quiz = await axios.post(TO_STUDENT, payload);
    return Quiz.data;
  }
);

export const enrollUser = createAsyncThunk(
  'teacher/enrollUser',
  async ({ UserId, QuizId }) => {
    console.log({ UserId, QuizId });
    const Quiz = await axios.post(TO_ENROLL, { UserId, QuizId });
    return Quiz.data;
  }
);

//PUT

export const activationQuiz = createAsyncThunk(
  'teacher/activateQuiz',
  async (payload) => {
    const Quiz = await axios.put(QUIZ_ENDPOINT + '/activate/' + payload);
    return Quiz.data;
  }
);

const isPendingAction = isPending(
  getQuizesTeacher,
  getToEnrollList,
  enrollToSudent,
  enrollUser,
  activationQuiz
);

const isRejectedAction = isRejected(
  getQuizesTeacher,
  getToEnrollList,
  enrollToSudent,
  enrollUser,
  activationQuiz
);

const TeacherSlice = createSlice({
  name: 'teacher',
  initialState: initialState_Teacher,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizesTeacher.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.TeacherQuizList = payload;
    });
    builder.addCase(getToEnrollList.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.TeacherUserList = payload;
    });
    builder.addCase(enrollToSudent.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.UserDetail.data = payload;
      state.TeacherUserList = state.TeacherUserList.filter(
        (Users) => Users.id !== payload.user.id
      );
    });
    builder.addCase(enrollUser.fulfilled, (state, { payload }) => {
      state.status = status.success;
    });
    builder.addCase(activationQuiz.fulfilled, (state, { payload }) => {
      let indice = state.TeacherQuizList.findIndex(
        (quiz) => quiz.id === payload
      );
      state.TeacherQuizList[indice].active = !state.TeacherQuizList[indice]
        .active;
      state.status = status.success;
    });
    ////////////

    builder.addMatcher(isPendingAction, (state, { payload }) => {
      state.status = status.pending;
    });
    builder.addMatcher(isRejectedAction, (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    });
  },
});

export default TeacherSlice;
