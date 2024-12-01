import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useEffect, useReducer } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from '../..//services/store';
import { fetchFeed, selectOrders } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const orders = useSelector(selectOrders);

  /** TODO: взять переменную из стора */

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => forceUpdate()} />;
};
