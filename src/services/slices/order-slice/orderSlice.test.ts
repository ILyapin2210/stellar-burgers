import {
  initialState,
  mockedError,
  mockedOrderResponse
} from './mockedOrderData';
import orderReducer, {
  orderBurger,
  resetOrder,
  selectIsOrderRequested,
  selectOrder
} from './orderSlice';

describe('orderSlice', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve()
        }) as any
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('Тест orderBurger.pending', () => {
    const action = { type: orderBurger.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.isRequested).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тест orderBurger.fulfilled', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: mockedOrderResponse
    };
    const state = orderReducer(initialState, action);
    expect(state.isRequested).toBe(false);
    expect(state.data).toEqual(mockedOrderResponse);
  });

  test('Тест orderBurger.rejected', () => {
    const action = {
      type: orderBurger.rejected.type,
      error: { message: mockedError }
    };
    const state = orderReducer(initialState, action);
    expect(state.isRequested).toBe(false);
    expect(state.error).toEqual(mockedError);
  });

  test('Тест resetOrder', () => {
    const action = { type: resetOrder.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  test('Тест selectIsOrderRequested', () => {
    const state = { order: initialState };
    expect(selectIsOrderRequested(state)).toBe(false);
  });

  test('Тест selectOrder', () => {
    const state = { order: initialState };
    expect(selectOrder(state)).toBe(null);
  });
});
