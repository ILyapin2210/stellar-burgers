import { TFeedsState } from './feedsSlice';

export const initialState: TFeedsState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const mockedFeeds = {
  success: true,
  orders: [
    {
      _id: '66c8dd3c119d45001b501b81',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-12-07T19:19:00.782Z',
      updatedAt: '2024-12-07T19:19:00.332Z',
      number: 999
    },
    {
      _id: '66c8c55d119d45001b501b64',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-08-23T17:22:37.284Z',
      updatedAt: '2024-08-23T17:22:37.763Z',
      number: 1000
    }
  ],
  total: 1000,
  totalToday: 100
};

export const mockedError = 'Не удалось получить заказы';
