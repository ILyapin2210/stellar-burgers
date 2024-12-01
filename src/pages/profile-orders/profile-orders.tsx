import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import {
  selectUserOrders,
  selectUserOrdersLoading,
  fetchUserOrders
} from '../../services/slices/userOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const isLoading = useSelector(selectUserOrdersLoading);

  const orders = useSelector(selectUserOrders);

  if (isLoading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
