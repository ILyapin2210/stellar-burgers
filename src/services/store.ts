import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorItemsReducer from './slices/constructorItemsSlice';
import feedReducer from './slices/feedsSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import userOrdersReducer from './slices/userOrdersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructorItems: constructorItemsReducer,
    feed: feedReducer,
    user: userReducer,
    order: orderReducer,
    userOrders: userOrdersReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
