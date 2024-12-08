import {
  mockIngredientTypeBun,
  mockIngredientTypeMain,
  mockIngredientTypeSauce,
  initialState
} from './mockIngredients';

import reducer, {
  removeItem,
  setBun,
  setIngredients,
  resetItems,
  selectConstructorItems
} from './constructorItemsSlice';

describe('constructorSlice', () => {
  test('обработка setBun', () => {
    const newState = reducer(initialState, setBun(mockIngredientTypeBun));
    expect(newState).toEqual({
      bun: mockIngredientTypeBun,
      ingredients: []
    });
  });

  test('обработка setIngredients', () => {
    const ingredients = [mockIngredientTypeMain, mockIngredientTypeSauce];
    const newState = reducer(initialState, setIngredients(ingredients));
    expect(newState).toEqual({
      bun: null,
      ingredients
    });
  });

  test('обработка resetItems', () => {
    const state = {
      bun: mockIngredientTypeBun,
      ingredients: [mockIngredientTypeMain, mockIngredientTypeSauce]
    };
    const newState = reducer(state, resetItems());
    expect(newState).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('обработка addItem', () => {
    const action = {
      // диспатчим экшен напрямую в редьюсер, чтобы обойти prepare
      type: 'constructorItems/addItem',
      payload: mockIngredientTypeMain
    };
    const newState = reducer(initialState, action);
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject(mockIngredientTypeMain);
  });

  test('обработка removeItem', () => {
    const state = {
      bun: null,
      ingredients: [mockIngredientTypeMain, mockIngredientTypeSauce]
    };

    const newState = reducer(state, removeItem(mockIngredientTypeMain.id));
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject(mockIngredientTypeSauce);
  });

  test('Тест селектора selectConstructorItems', () => {
    const state = {
      constructorItems: {
        bun: mockIngredientTypeBun,
        ingredients: [mockIngredientTypeMain, mockIngredientTypeSauce]
      }
    };

    const result = selectConstructorItems(state);

    expect(result).toEqual({
      bun: mockIngredientTypeBun,
      ingredients: [mockIngredientTypeMain, mockIngredientTypeSauce]
    });
  });
});
