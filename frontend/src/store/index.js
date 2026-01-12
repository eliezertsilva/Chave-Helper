import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import clientsReducer from './slices/clientsSlice';
// import servicesReducer from './slices/servicesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // clients: clientsReducer,
    // services: servicesReducer,
  },
});
