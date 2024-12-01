import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useSelector } from 'react-redux';
import { useDispatch } from '../..//services/store';
import {
  addItem,
  setBun,
  TBunIngredient
} from '../../services/slices/constructorItemsSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun')
        dispatch(setBun(ingredient as TBunIngredient));
      else dispatch(addItem(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
