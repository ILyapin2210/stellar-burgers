import { configureStore } from '@reduxjs/toolkit';
import {
  initialState,
  mockedError,
  mockedProfileOrders
} from './mockedUserOrders';
import userOrdersReducer, { fetchUserOrders } from './userOrdersSlice';

describe('orderSlice', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve()
        }) as any
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Тест fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = userOrdersReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тест fetchUserOrders.fulfilled', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockedProfileOrders
    };
    const state = userOrdersReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockedProfileOrders);
  });

  test('Тест fetchUserOrders.rejected', () => {
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: mockedError }
    };
    const state = userOrdersReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(mockedError);
  });
});
