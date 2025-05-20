import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from '../..//services/store';
import {
  fetchFeed,
  selectOrders,
  selectIsFeedLoading
} from '../../services/slices/feed-slice/feedsSlice';

export const Feed: FC = () => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const dispatch = useDispatch();
  const isFeedLoading = useSelector(selectIsFeedLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const orders = useSelector(selectOrders);

  if (isFeedLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed()).then(() => forceUpdate());
      }}
    />
  );
};
