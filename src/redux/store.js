import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/login';
import ticketReducer from './slices/ticket';
export const store = configureStore({
  reducer: {
    tickets: ticketReducer,
    login: loginReducer,
  },
});
