import { createSlice } from '@reduxjs/toolkit';

const initialState_catalogue = {};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState_catalogue,
  reducers: {
    addToFavorites: (state, action) => {},
    removeFromFavorites: (state, action) => {},
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice;
