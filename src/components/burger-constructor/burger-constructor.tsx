import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../..//services/store';
import {
  selectConstructorItems,
  resetItems
} from '../../services/slices/constructorItemsSlice';
import {
  orderBurger,
  selectIsOrderRequested,
  selectOrder,
  resetOrder
} from '../../services/slices/orderSlice';
import { selectIsAuth } from '../../services/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const constructorItems = useSelector(selectConstructorItems);

  const orderRequest = useSelector(selectIsOrderRequested);

  const orderModalData = useSelector(selectOrder);

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) {
      navigate('/login', { state: { from: location } });
      return;
    }
    const { bun, ingredients } = constructorItems;
    const order = [bun._id, ...ingredients.map((i) => i._id)];
    dispatch(orderBurger(order));
    dispatch(resetItems());
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + (v.price as number),
        0
      ),
    [constructorItems.bun, constructorItems.ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
