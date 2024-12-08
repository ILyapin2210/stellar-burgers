import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '../../../utils/burger-api';

export type TOrderState = {
  data: {
    order: TOrder;
    name: string;
  } | null;
  isRequested: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  data: null,
  isRequested: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'order/burger',
  async (data: string[]) => await orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.data = null;
      state.isRequested = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isRequested = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isRequested = false;
        state.error = action.error?.message ?? null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isRequested = false;
        state.data = action.payload;
      });
  },
  selectors: {
    selectIsOrderRequested: (state: TOrderState) => state.isRequested,
    selectOrder: (state: TOrderState) => state.data?.order ?? null
  }
});

export default orderSlice.reducer;
export const { resetOrder } = orderSlice.actions;
export const { selectIsOrderRequested, selectOrder } = orderSlice.selectors;
