import { TNewOrderResponse } from '@api';
import { TOrderState } from './orderSlice';

export const initialState: TOrderState = {
  data: null,
  isRequested: false,
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
      number: 50898
    }
  ]
};

export const mockedOrderResponse: TNewOrderResponse = {
  success: true,
  order: {
    _id: '66c8dd3c119d45001b501b81',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2024-08-23T19:04:28.782Z',
    updatedAt: '2024-08-23T19:04:29.332Z',
    number: 50898
  },
  name: 'Флюоресцентный био-марсианский бургер'
};

export const mockedError = 'Ошибка выполнения заказа';
