import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
});

export default ticketsSlice.reducer;
