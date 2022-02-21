import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import goodsReducer from '../features/goods/goodsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goods: goodsReducer
  },
});
