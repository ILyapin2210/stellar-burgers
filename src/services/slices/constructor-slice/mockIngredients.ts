import { TConstructorIngredient } from '@utils-types';
import {
  TConstructorItemsState,
  TBunIngredient
} from './constructorItemsSlice';

export const initialState: TConstructorItemsState = {
  bun: null,
  ingredients: []
};

export const mockIngredientTypeBun: TBunIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const mockIngredientTypeMain: TConstructorIngredient = {
  id: '1',
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

export const mockIngredientTypeSauce: TConstructorIngredient = {
  id: '2',
  _id: '643d69a5c3f7b9001cfa094a',
  name: 'Сыр с астероидной плесенью',
  type: 'main',
  proteins: 84,
  fat: 48,
  carbohydrates: 420,
  calories: 3377,
  price: 4142,
  image: 'https://code.s3.yandex.net/react/code/cheese.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png'
};
