import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';
import { status } from 'utils/helpers';
import axios from 'axios';
import { USER_PROFILE_ENDPOINT, SCHOOL_ENDPOINT } from 'utils/endpoints';
import { USER_ENRROLLED_IN } from 'utils/endpoints';
import { USER_QUIZ_FAVOURITES } from 'utils/endpoints';

const initialState_Profile = {
  status: status.idle,
  error: null,
  user: {},
  userEnrroledIn: [],
  userQuizFavourites: [],
  school: {},
};

export const getUserData = createAsyncThunk(
  'profile/getUserData',
  async (payload) => {
    const userData_response = await axios.get(
      USER_PROFILE_ENDPOINT + '/' + payload
    );
    return userData_response.data;
  },

  {
    condition: (payload, { getState }) => {
      const {
        profile: { status },
      } = getState();
      if (
        status === status.pending ||
        status === status.loading ||
        status === status.error
      ) {
        return false;
      }
    },
  }
);
export const userUpdate = createAsyncThunk(
  'profile/userUpdate',
  async ({ id, values }) => {
    const userUpdate_response = await axios.put(
      USER_PROFILE_ENDPOINT + '/' + id,
      values
    );
    return userUpdate_response.data;
  }
);
export const userEnrroledIn = createAsyncThunk(
  'profile/userEnrroledIn',
  async (id) => {
    const userEnrroledIn_response = await axios.get(
      USER_ENRROLLED_IN + '/' + id
    );
    return userEnrroledIn_response.data;
  }
);

export const userQuizFavourites = createAsyncThunk(
  'profile/userQuizFavourites',
  async (id) => {
    const userQuizFavourites_response = await axios.get(
      USER_QUIZ_FAVOURITES + '/' + id
    );
    return userQuizFavourites_response.data;
  }
);

export const getSchoolData = createAsyncThunk(
  'profile/getSchoolData',
  async (payload) => {
    const schoolData_response = await axios.get(
      SCHOOL_ENDPOINT + '/' + payload
    );
    return schoolData_response.data;
  },
  {
    condition: (payload, { getState }) => {
      const {
        profile: { status },
      } = getState();
      if (
        status === status.pending ||
        status === status.loading ||
        status === status.error
      ) {
        return false;
      }
    },
  }
);

const isRejectedAction = isRejected(
  getUserData,
  userUpdate,
  userEnrroledIn,
  userQuizFavourites
);
const isPendingAction = isPending(
  getUserData,
  userUpdate,
  userEnrroledIn,
  userQuizFavourites
);
const isFulfilledAction = isFulfilled(userUpdate);
const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState_Profile,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.user = payload;
    });
    builder.addCase(getSchoolData.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.school = payload;
    });
    builder.addCase(userEnrroledIn.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.userEnrroledIn = payload;
    });
    builder.addCase(userQuizFavourites.fulfilled, (state, { payload }) => {
      state.status = status.success;
      state.userQuizFavourites = payload;
    });
    builder.addMatcher(isPendingAction, (state, { payload }) => {
      state.status = status.pending;
    });
    builder.addMatcher(isFulfilledAction, (state, { payload }) => {
      state.status = status.success;
    });
    builder.addMatcher(isRejectedAction, (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    });
  },
});

export default profileSlice;
