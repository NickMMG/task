import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import mainSlice from './features/main/mainSlice';

const store = configureStore({
  reducer: {
    main: mainSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
