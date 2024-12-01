import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

type TFeedsState = {
  feed: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  isLoading: boolean;
  error: string | null;
};

export const fetchFeed = createAsyncThunk(
  'feeds/fetch',
  async () => await getFeedsApi()
);

const initialState: TFeedsState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state: TFeedsState) => state.feed.orders,
    selectFeed: (state: TFeedsState) => state.feed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
      });
  }
});

export const { selectOrders, selectFeed } = feedsSlice.selectors;

export default feedsSlice.reducer;
