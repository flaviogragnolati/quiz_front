import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { status } from 'utils/helpers';
import {USER_ADD_FAVOURITES} from 'utils/endpoints'

const initialState_Actions = {
  info: [],
  status: status.idle,
};

export const addToFavorites = createAsyncThunk(
  'profile/addToFavorites',
  async (payload) => {
    const addToFavorites_response = await axios.post( USER_ADD_FAVOURITES, payload);
    return addToFavorites_response.data;
  },
  )

  export const removeFromFavorites = createAsyncThunk(
    'profile/removeFromFavorites',
    async (payload) => {
  //    { UserId, QuizId
      const removeFromFavorites_response = await axios.post( USER_ADD_FAVOURITES, payload);
      return removeFromFavorites_response.data;
    },
    )
const actionsSlice = createSlice({
  name: 'actions',
  initialState: initialState_Actions,
  reducers: {
    enroll: (state, payload) => {},
    // addToFavorites: (state, action) => {},
    // removeFromFavorites: (state, action) => {},
  },
  extraReducers: {
    [addToFavorites.pending]: (state, { payload }) => {
      state.status = status.pending;
    },
    [addToFavorites.fulfilled]: (state, { payload }) => {
      state.status = status.success;
      state.info = payload
    },
    [addToFavorites.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [removeFromFavorites.pending]: (state, { payload }) => {
      state.status = status.pending;
    },
    [removeFromFavorites.fulfilled]: (state, { payload }) => {
      state.status = status.success;
      state.info = payload
    },
    [removeFromFavorites.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
  }
});

export const {
  enroll,
  // addToFavorites,
  // removeFromFavorites,
} = actionsSlice.actions;

export default actionsSlice;
