import { TUserOrdersState } from './userOrdersSlice';

export const initialState: TUserOrdersState = {
  orders: [],
  featuredOrder: null,
  isLoading: false,
  error: null
};

export const mockedOrderDetails = {
  orders: [
    {
      _id: '66c8dd3c119d45001b501b81',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-08-23T19:04:28.782Z',
      updatedAt: '2024-08-23T19:04:29.332Z',
      number: 1000
    }
  ]
};

export const mockedProfileOrders = [
  {
    _id: '66c9ad8d119d45001b501c39',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-12-07T09:53:17.799Z',
    updatedAt: '2024-12-07T09:53:18.298Z',
    number: 999
  },
  {
    _id: '66c9ac9d119d45001b501c33',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный spicy антарианский бургер',
    createdAt: '2024-08-24T09:49:17.804Z',
    updatedAt: '2024-08-24T09:49:18.319Z',
    number: 1000
  }
];
export const mockedError = 'Не удалось получить заказ';
