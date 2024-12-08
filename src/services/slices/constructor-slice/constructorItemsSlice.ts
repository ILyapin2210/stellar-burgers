import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

export type TBunIngredient = TIngredient & {
  type: 'bun';
};

type TIngredientId = string;

export type TConstructorItemsState = {
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

    addItem: {
      reducer: (
        state: TConstructorItemsState,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        state.ingredients.push(action.payload);
      },

      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
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
