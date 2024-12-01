import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectIngredients } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const location = useLocation();
  const ingredientData = useSelector(selectIngredients).find((item) =>
    location.pathname?.includes(item._id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
