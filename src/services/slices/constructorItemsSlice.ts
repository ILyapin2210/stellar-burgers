import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

export type TBunIngredient = TIngredient & {
  type: 'bun';
};

type TIngredientId = string;

type TConstructorItemsState = {
  bun: TBunIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorItemsState = {
  bun: null,
  ingredients: []
};

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    setBun(
      state: TConstructorItemsState,
      action: PayloadAction<TBunIngredient>
    ) {
      state.bun = action.payload;
    },

    setIngredients(
      state: TConstructorItemsState,
      action: PayloadAction<TConstructorIngredient[]>
    ) {
      state.ingredients = action.payload;
    },

    resetItems(state: TConstructorItemsState) {
      state.bun = null;
      state.ingredients = [];
    },

    addItem(state: TConstructorItemsState, action: PayloadAction<TIngredient>) {
      state.ingredients.push({ ...action.payload, id: Date.now().toString() });
    },

    removeItem(
      state: TConstructorItemsState,
      action: PayloadAction<TIngredientId>
    ) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    }
  },

  selectors: {
    selectConstructorItems(state: TConstructorItemsState) {
      return state;
    }
  }
});

export const { setBun, addItem, removeItem, setIngredients, resetItems } =
  constructorItemsSlice.actions;

export const { selectConstructorItems } = constructorItemsSlice.selectors;

export default constructorItemsSlice.reducer;
