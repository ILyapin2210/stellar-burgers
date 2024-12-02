import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  removeItem,
  selectConstructorItems,
  setIngredients
} from '../../services/slices/constructorItemsSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const { ingredients } = useSelector(selectConstructorItems);

    const handleMoveDown = () => {
      const newIngredients = [...ingredients];
      const currentIngredient = newIngredients.splice(index, 1)[0];
      newIngredients.splice(index + 1, 0, currentIngredient);
      dispatch(setIngredients(newIngredients));
    };

    const handleMoveUp = () => {
      const newIngredients = [...ingredients];
      const currentIngredient = newIngredients.splice(index, 1)[0];
      newIngredients.splice(index - 1, 0, currentIngredient);
      dispatch(setIngredients(newIngredients));
    };

    const handleClose = () => {
      dispatch(removeItem(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
