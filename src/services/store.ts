import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice/ingredientsSlice';
import constructorItemsReducer from './slices/constructor-slice/constructorItemsSlice';
import feedReducer from './slices/feed-slice/feedsSlice';
import userReducer from './slices/user-slice/userSlice';
import orderReducer from './slices/order-slice/orderSlice';
import userOrdersReducer from './slices/user-order-slice/userOrdersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  feed: feedReducer,
  user: userReducer,
  order: orderReducer,
  userOrders: userOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,

  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
