import feedsReducer, {
  fetchFeed,
  selectOrders,
  selectFeed,
  selectIsFeedLoading
} from './feedsSlice';
import { initialState, mockedFeeds, mockedError } from './mockedFeeds';

describe('fetchFeeds', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(mockedFeeds)
        }) as any
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('Тест fetchFeed.pending', () => {
    const action = { type: fetchFeed.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тест fetchFeeds.fulfilled', () => {
    const action = { type: fetchFeed.fulfilled.type, payload: mockedFeeds };
    const state = feedsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.feed.orders).toEqual(mockedFeeds.orders);
    expect(state.feed.total).toEqual(1000);
    expect(state.feed.totalToday).toEqual(100);
  });

  test('обработка fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: mockedError }
    };
    const state = feedsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedError);
  });

  test('Тест selectOrders', () => {
    const state = {
      feed: initialState
    };
    expect(selectOrders(state)).toEqual([]);
  });

  test('Тест selectFeed', () => {
    const state = {
      feed: initialState
    };
    expect(selectFeed(state)).toEqual(initialState.feed);
  });

  test('Тест selectIsFeedLoading', () => {
    const state = {
      feed: initialState
    };
    expect(selectIsFeedLoading(state)).toEqual(false);
  });
});
