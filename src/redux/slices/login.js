import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { userLogin } = loginSlice.actions;
export default loginSlice.reducer;
