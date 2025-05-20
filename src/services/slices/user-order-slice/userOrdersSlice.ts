import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, getOrderByNumberApi } from '../../../utils/burger-api';

export const fetchUserOrders = createAsyncThunk(
  'userOrders/getUserOrders',
  async () => await getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'userOrders/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export type TUserOrdersState = {
  orders: TOrder[];
  featuredOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserOrdersState = {
  orders: [],
  featuredOrder: null,
  isLoading: false,
  error: null
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    clearFeaturedOrder: (state) => {
      state.featuredOrder = null;
    }
  },
  selectors: {
    selectUserOrders: (state) => state.orders,
    selectUserOrdersLoading: (state) => state.isLoading,
    selectFeaturedOrder: (state) => state.featuredOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.featuredOrder = action.payload.orders[0];
      });
  }
});

export const {
  selectUserOrders,
  selectUserOrdersLoading,
  selectFeaturedOrder
} = userOrdersSlice.selectors;
export const { clearFeaturedOrder } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
