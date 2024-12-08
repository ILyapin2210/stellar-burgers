import ingredientsReducer from './slices/ingredients-slice/ingredientsSlice';
import constructorItemsReducer from './slices/constructor-slice/constructorItemsSlice';
import feedReducer from './slices/feed-slice/feedsSlice';
import orderReducer from './slices/order-slice/orderSlice';
import userOrdersReducer from './slices/user-order-slice/userOrdersSlice';
import userReducer from './slices/user-slice/userSlice';
import { rootReducer } from './store';

describe('rootReducer', () => {
  it('should initialize with the correct state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    const expectedState = {
      ingredients: ingredientsReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      constructorItems: constructorItemsReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      feed: feedReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      user: userReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      order: orderReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      userOrders: userOrdersReducer(undefined, { type: 'UNKNOWN_ACTION' })
    };

    expect(initialState).toEqual(expectedState);
  });
});
