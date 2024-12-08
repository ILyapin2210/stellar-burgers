import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { selectIngredients } from '../../services/slices/ingredients-slice/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const location = useLocation();

  const ingredientData = useSelector(selectIngredients).find(
    (item) => location.pathname.split('/').pop() === item._id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
