import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/loggedInUser/loggedInUser';
import displayMenuSlice from '../features/displayMenu/displayMenuSlice';

export const store = configureStore({
  reducer: {
    user:userReducer,
    displayMenu: displayMenuSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
