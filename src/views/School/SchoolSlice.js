import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { status } from 'utils/helpers';
import axios from 'axios';
import {
  SCHOOL_ENDPOINT,
  SUBJECT_ENDPOINT,
  QUIZ_ENDPOINT,
  GET_USER_EMAIL_ENDPOINT,
  TEACHER_ENDPOINT,
} from 'utils/endpoints';

const initialState_School = {
  //!el `status` general no esta definido, y en los extrareducers lo estamos `creando`, si es parte del estado deberia estar presente como parte del `initialState`
  SchoolQuizList: {
    error: null,
    QuizList: {},
    status: status.idle,
  },
  SchoolSubjectList: {
    error: null,
    SubjectList: [],
  },
  SchoolTeacherList: {
    error: null,
    TeacherList: {},
  },
  UserDetail: {
    data: {},
    role: {},
    status: status.idle,
  },
};

//GET

export const getSubjectsList = createAsyncThunk(
  'school/getSubjectsList',
  async ({ id }) => {
    const Subject = await axios.get(SCHOOL_ENDPOINT + '/' + id + '/subjects');
    return Subject.data;
  }
);

export const getQuizList = createAsyncThunk(
  'school/getQuizList',
  async ({ id }) => {
    const Quiz = await axios.get(SCHOOL_ENDPOINT + '/' + id + '/quizzes');
    return Quiz.data;
  }
);

export const getUserEmail = createAsyncThunk(
  'school/getUserEmail',
  async ({ Id, email }) => {
    const User_Email_response = await axios.get(
      GET_USER_EMAIL_ENDPOINT + Id + '?email=' + email
    );
    return User_Email_response.data;
  }
);

export const getTeachersQuiz = createAsyncThunk(
  'school/getTeachersQuiz',
  async ({ QuizId }) => {
    const teachersResponse = await axios.get(
      QUIZ_ENDPOINT + '/' + QuizId + '/teachers'
    );
    return teachersResponse.data;
  }
);

// export const getSubjectsDetail = createAsyncThunk(
//   "School/GetSubjectsDetail",
//   async (payload) => {
//     const Subject = await axios.get(SUBJECT_ENDPOINT + '/' + payload);
//     return Subject;
//   }
// );

//POST

export const createSubject = createAsyncThunk(
  'school/createSubject',
  async (payload) => {
    const Subject_response = await axios.post(SUBJECT_ENDPOINT, payload);
    const { subject } = Subject_response;
    return subject;
  }
);

export const postUserToTeacher = createAsyncThunk(
  'school/postUserToTeacher',
  async ({ QuizId, UserId }) => {
    const User_Email_response = await axios.post(TEACHER_ENDPOINT, {
      QuizId,
      UserId,
    });
    return User_Email_response.data;
  }
);

//DELETE

export const deleteSubject = createAsyncThunk(
  'school/deleteSubject',
  async ({ subjectId, schoolId }, { getState, dispatch, rejectWithValue }) => {
    //! una crotada no tan crota pero crota igual..... NO COPIAR Y PEGAR ESTA RANCIADA.....
    const quizList = await dispatch(getQuizList({ id: schoolId }));
    let shouldDelete = true;
    const {
      payload: {
        quizzes: { allIds, byId },
      },
    } = quizList;
    allIds.forEach((id) => {
      for (const quiz of byId) {
        if (quiz.SubjectId === parseInt(subjectId)) {
          shouldDelete = false;
          break;
        }
      }
    });
    if (shouldDelete) {
      const delete_response = await axios.delete(
        SUBJECT_ENDPOINT + '/' + subjectId
      );
      return delete_response.data;
    }
     else {
      return rejectWithValue({
        // message: 'El subject esta asociado a un quiz activo',
      });
    }
  }
);

export const delateQuiz = createAsyncThunk(
  'school/delateQuiz',
  async (payload) => {
    const delete_response = await axios.delete(QUIZ_ENDPOINT + '/' + payload);
    return delete_response.data;
  }
);

export const removeTeacher = createAsyncThunk(
  'school/removeTeacher',
  async ({ QuizId, UserId }) => {
    const delete_response = await axios.delete(
      TEACHER_ENDPOINT + '?UserId=' + UserId + '&&QuizId=' + QuizId
    );
    return delete_response.data;
  }
);

//PUT

export const editSubject = createAsyncThunk(
  'school/editSubject',
  async (payload) => {
    const Subject_response = await axios.put(
      SUBJECT_ENDPOINT + '/' + payload.id,
      payload
    );
    return Subject_response.data;
  }
);

const isPendingAction = isPending(
  getQuizList,
  getSubjectsList,
  createSubject,
  deleteSubject,
  delateQuiz,
  editSubject,
  getTeachersQuiz
);

const isRejectedAction = isRejected(
  getQuizList,
  getSubjectsList,
  createSubject,
  deleteSubject,
  delateQuiz,
  editSubject,
  getTeachersQuiz
);

const isPendingActionDetail = isPending(
  getUserEmail,
  postUserToTeacher,
  removeTeacher
);

const isRejectedActionDetail = isRejected(
  getUserEmail,
  postUserToTeacher,
  removeTeacher
);

const isPendingActionSubject = isPending(createSubject, editSubject);

const isRejectedActionSubject = isRejected(createSubject, editSubject);

const SchoolSlice = createSlice({
  name: 'school',
  initialState: initialState_School,
  reducers: {
    cleanUser: (state, { payload }) => {
      state.UserDetail.status = status.idle;
      state.UserDetail.data = {};
    },
    afterSubject: (state, { payload }) => {
      state.SchoolSubjectList.status = status.idle;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuizList.fulfilled.type, (state, { payload }) => {
      state.status = status.success;
      state.SchoolQuizList = payload.quizzes.byId;
    });
    builder.addCase(getSubjectsList.fulfilled.type, (state, { payload }) => {
      state.status = status.success;
      state.SchoolSubjectList.SubjectList = payload;
    });
    builder.addCase(getUserEmail.fulfilled.type, (state, { payload }) => {
      state.UserDetail.role = payload.role;
      state.UserDetail.data = payload.user;
      state.UserDetail.status = status.success;
    });
    builder.addCase(getTeachersQuiz.fulfilled.type, (state, { payload }) => {
      state.SchoolTeacherList = payload;
      state.status = status.success;
    });
    builder.addCase(createSubject.fulfilled.type, (state, { payload }) => {
      state.SchoolSubjectList.status = status.success;
    });
    builder.addCase(postUserToTeacher.fulfilled.type, (state, { payload }) => {
      state.UserDetail.status = status.success;
      state.UserDetail.role = payload.role;
    });
    builder.addCase(deleteSubject.fulfilled.type, (state, { payload }) => {
      state.status = status.success;
      state.SchoolSubjectList.SubjectList = state.SchoolSubjectList.SubjectList.filter(
        (subject) => {
          return subject.id !== payload.id;
        }
      );
    });
    builder.addCase(delateQuiz.fulfilled.type, (state, { payload }) => {
      state.status = status.success;
      state.SchoolQuizList = state.SchoolQuizList.filter((quiz) => {
        return quiz.id !== payload.id;
      });
    });
    builder.addCase(removeTeacher.fulfilled.type, (state, { payload }) => {
      state.UserDetail.status = status.idle;
      state.UserDetail.data = {};
      state.UserDetail.role = {};
    });
    builder.addCase(editSubject.fulfilled.type, (state, { payload }) => {
      state.SchoolSubjectList.status = status.success;
    });

    ////////////

    builder.addMatcher(isPendingAction, (state, action) => {
      const { type } = action;
      const nameSpace = type.split('/')['1'];
      if (nameSpace === 'SchoolQuizList') {
        //!desprolijo, complejo e innecesario...pero para no cambiar todo lo hacemos asi, para la prox...mejor estrategia de `namespaces`
        state.SchoolQuizList.status = status.pending;
      } else {
        state.status = status.pending;
      }
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      const { type } = action;
      const nameSpace = type.split('/')['1'];
      if (nameSpace === 'SchoolQuizList') {
        //!desprolijo, complejo e innecesario...pero para no cambiar todo lo hacemos asi, para la prox...mejor estrategia de `namespaces`
        state.SchoolQuizList.status = status.error;
        state.SchoolQuizList.error = action.payload;
      } else if (nameSpace === 'deleteSubject') {
        if (action.meta.rejectedWithValue) {
          state.status = status.success;
          state.SchoolSubjectList.error = action.payload.message;
        }
      } else {
        state.status = status.error;
        state.error = action.payload;
      }
    });
    builder.addMatcher(isPendingActionDetail, (state, { payload }) => {
      state.UserDetail.status = status.pending;
    });
    builder.addMatcher(isRejectedActionDetail, (state, { payload }) => {
      state.UserDetail.status = status.error;
      state.UserDetail.data = payload;
    });
    builder.addMatcher(isPendingActionSubject, (state, { payload }) => {
      state.SchoolSubjectList.status = status.pending;
    });
    builder.addMatcher(isRejectedActionSubject, (state, { payload }) => {
      state.SchoolSubjectList.status = status.error;
      state.error = payload;
    });
  },
});

export const {
  cleanUser,
  setQuestionDetail,
  afterSubject,
} = SchoolSlice.actions;

export default SchoolSlice;
