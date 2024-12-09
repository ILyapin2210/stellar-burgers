import { TUser } from '@utils-types';
import { TUserState } from './userSlice';

export const initialState: TUserState = {
  user: {
    email: '',
    name: ''
  },
  isAuth: false,
  isLoading: false,
  error: null
};

export const mockedAuthResponse = {
  user: {
    email: 'example@.test',
    name: 'user'
  },
  refreshToken: 'refreshToken',
  accessToken: 'accessToken'
};

export const mockedAuthError = 'Ошибка авторризации';

export const mockedLoginError = 'Не удалось выполнить вход';
export const mockedUpdateUserError = 'Не удалось обновить пользователя';

export const mockedUserResponse = {
  success: true,
  user: {
    email: 'example@.test',
    name: 'user'
  }
};
