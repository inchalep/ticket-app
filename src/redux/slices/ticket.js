import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    createTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action) => {
      const data = action.payload;
      const remainTickets = state.tickets.filter(
        ticket => ticket.id !== data.id
      );
      state.tickets = [...remainTickets, data];
    },
    deleteTicket: (state, action) => {
      const remainTickets = state.tickets.filter(
        ticket => ticket.id !== action.payload
      );
      state.tickets = remainTickets;
    },
  },
});

export const { createTicket, updateTicket, deleteTicket } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
