import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  logoutApi,
  getUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: {
    email: '',
    name: ''
  },
  isAuth: false,
  isLoading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? null;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? null;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
        state.isLoading = false;
        state.user = {
          email: '',
          name: ''
        };
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error?.message ?? null;
      });
  },
  selectors: {
    selectUser: (state: TUserState) => state.user,
    selectUserName: (state: TUserState) => state.user.name,
    selectIsAuth: (state: TUserState) => state.isAuth,
    selectIsLoading: (state: TUserState) => state.isLoading
  }
});

export const { selectUser, selectUserName, selectIsAuth, selectIsLoading } =
  userSlice.selectors;
export default userSlice.reducer;
