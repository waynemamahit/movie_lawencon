import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    data: [],
  },
  reducers: {
    updateMovies(state, action) {
      state.data = action.payload
    },
  },
});

export const { updateMovies } = movieSlice.actions

export const selectState = state => state.movie

export default movieSlice.reducer