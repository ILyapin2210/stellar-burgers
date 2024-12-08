import userReducer, {
  loginUser,
  getUser,
  registerUser,
  updateUser,
  logoutUser
} from './userSlice';
import {
  initialState,
  mockedAuthError,
  mockedLoginError,
  mockedUpdateUserError,
  mockedAuthResponse,
  mockedUserResponse
} from './mockedUserData';
import { setCookie } from '../../../utils/cookie';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve()
    }) as any
);

jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

describe('тест userSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn()
    };
  });

  test('тест registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toEqual(null);
  });

  test('тест registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockedAuthResponse
    };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      mockedAuthResponse.refreshToken
    );
    expect(setCookie).toHaveBeenCalledWith(
      'accessToken',
      mockedAuthResponse.accessToken
    );
    expect(state.user).toEqual(mockedAuthResponse.user);
  });

  test('тест registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: mockedAuthError }
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedAuthError);
  });

  test('тест loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(true);
    expect(state.error).toEqual(null);
  });

  test('тест loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockedUserResponse
    };
    const state = userReducer(initialState, action);
    expect(state.isAuth).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockedUserResponse.user);
  });

  test('тест loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: mockedLoginError }
    };
    const state = userReducer(initialState, action);
    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedLoginError);
  });

  test('тест updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(true);
    expect(state.error).toEqual(null);
  });

  test('тест updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockedUserResponse
    };
    const state = userReducer(initialState, action);
    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockedUserResponse.user);
  });

  test('тест updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: mockedUpdateUserError }
    };
    const state = userReducer(initialState, action);
    expect(state.isAuth).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedUpdateUserError);
  });

  test('тест logout.fullfiled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(initialState, action);
    expect(state.isAuth).toEqual(false);
    expect(state.user).toEqual({
      email: '',
      name: ''
    });
  });

  test('Тест getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.isAuth).toBe(false);
    expect(state.error).toBe(null);
  });

  test('Тест getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: mockedAuthResponse
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(mockedAuthResponse.user);
  });

  test('Тест getUser.rejected', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: mockedAuthError }
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedAuthError);
  });
});
