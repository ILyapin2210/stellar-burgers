import ingredientsReducer, {
  fetchIngredients,
  selectIngredients,
  selectIsIngredientsLoading
} from './ingredientsSlice';
import {
  initialState,
  mockedIngredients,
  mockedError
} from './mockedIngredients';

describe('Тест ingredientSlice', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(mockedIngredients)
        }) as any
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Тест ingredientSlice.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тест ingredientSlice.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockedIngredients
    };

    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual(mockedIngredients);
  });

  test('Тест ingredientSlice.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: mockedError }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedError);
  });

  test('Тест selectIngredients', () => {
    const state = { ingredients: initialState };
    const result = selectIngredients(state);

    expect(result).toEqual(initialState.ingredients);
  });

  test('Тест selectIsIngredientsLoading', () => {
    const state = {
      ingredients: initialState
    };
    expect(selectIsIngredientsLoading(state)).toBe(false);
  });
});
