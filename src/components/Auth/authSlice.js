import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import { status } from 'utils/helpers';
import axios from 'axios';
import {
  SCHOOL_PREREGISTER_ENDPOINT,
  USER_REGISTER_ENDPOINT,
  RESTORE_ENDPOINT,
  LOGIN_ENDPOINT,
  SCHOOL_FINAL_REGISTER_ENDPOINT,
  LOGIN_ORG_ENDPOINT,
} from 'utils/endpoints';

const initialState_Auth = {
  status: status.idle,
  restore: false,
  error: null,
  user: {},
  token: null,
};

const STORE_TOKEN = 'QuizJWT';

// const fakeAPICall = () =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         id: 1,
//         firstName: 'Erwin',
//         lastName: 'Schrödinger',
//         email: 'erwin@quantum.com',
//         birthdate: '12-08-1887',
//         cellphone: '19610104',
//       });
//     }, 2000);
//   });

export const registerUser = createAsyncThunk(
  'user/register',
  async (payload, { dispatch }) => {
    const user_response = await axios.post(USER_REGISTER_ENDPOINT, payload);
    const { user, token } = user_response.data;
    dispatch(setToken(token)); //!no esta bien visto en bajo los ojos de la redux pipol
    return user;
  }
);

export const localLogin = createAsyncThunk(
  'auth/localLogin',
  async (payload, { dispatch }) => {
    const login_response = await axios.post(LOGIN_ENDPOINT, payload);
    const { user, token } = login_response.data;
    dispatch(setToken(token)); //!no esta bien visto en bajo los ojos de la redux pipol
    return user;
  }
);

export const localOrgLogin = createAsyncThunk(
  'auth/localOrgLogin',
  async (payload, { dispatch }) => {
    const login_response = await axios.post(LOGIN_ORG_ENDPOINT, payload);
    const { user, token } = login_response.data;
    dispatch(setToken(token)); //!no esta bien visto en bajo los ojos de la redux pipol
    return user;
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (payload, { getState, dispatch }) => {
    const state = getState();
    const { auth } = state;
    const restored_user = await axios.get(RESTORE_ENDPOINT, {
      headers: {
        Authorization: auth.token,
      },
    });
    const { user } = restored_user.data;
    return user;
  },
  {
    condition: (payload, { getState }) => {
      const { auth } = getState();
      if (
        auth.status === status.pending ||
        auth.status === status.loading ||
        auth.status === status.error ||
        auth.status === status.success
      ) {
        return false;
      }
    },
  }
);

export const contactSchool = createAsyncThunk(
  'auth/contactSchool',
  async (payload) => {
    const SchoolContact = await axios.post(
      SCHOOL_PREREGISTER_ENDPOINT,
      payload
    );
    return SchoolContact;
  }
);

export const finalRegisterSchool = createAsyncThunk(
  'auth/finalRegisterSchool',
  async (payload, { dispatch }) => {
    const SchoolFinalRegister_response = await axios.post(
      SCHOOL_FINAL_REGISTER_ENDPOINT,
      payload
    );
    const { user, token } = SchoolFinalRegister_response.data;
    dispatch(setToken(token));
    return user;
  }
);

const isPendingAction = isPending(
  registerUser,
  //registerSchool,
  localLogin,
  localOrgLogin,
  restoreSession,
  contactSchool,
  finalRegisterSchool
);
const isFulfilledAction = isFulfilled(
  registerUser,
  //registerSchool,
  localLogin,
  localOrgLogin,
  restoreSession,
  contactSchool,
  finalRegisterSchool
);
const isRejectedAction = isRejected(
  registerUser,
  //registerSchool,
  localLogin,
  localOrgLogin,
  restoreSession,
  contactSchool,
  finalRegisterSchool
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState_Auth,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      window.localStorage.setItem(STORE_TOKEN, payload);
      axios.defaults.headers.common.Authorization = state.token;
    },
    restoreToken: (state, { payload }) => {
      state.token = window.localStorage.getItem(STORE_TOKEN);
    },
    deleteToken: (state, { payload }) => {},
    logout: (state, { payload }) => {
      state.token = null;
      state.restore = false;
      state.user = {};
      state.error = null;
      state.status = status.reset;
      window.localStorage.removeItem(STORE_TOKEN);
      delete axios.defaults.headers.common.Authorization;
      window.localStorage.setItem('__logout__', Date.now());
    },
    setStateReset: (state, { payload }) => {
      state.status = status.idle;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction, (state, { payload }) => {
      state.status = status.pending;
    });
    builder.addMatcher(isFulfilledAction, (state, { payload }) => {
      state.status = status.success;
      state.restore = true;
      state.user = payload;
    });
    builder.addMatcher(isRejectedAction, (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    });
  },
});

export const { setToken, logout, setStateReset } = authSlice.actions;

export default authSlice;
