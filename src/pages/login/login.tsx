import { FC, SyntheticEvent, useLayoutEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  loginUser,
  selectIsAuth,
  selectIsLoading
} from '../../services/slices/user-slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const isAuth = useSelector(selectIsAuth);

  const location = useLocation();

  useLayoutEffect(() => {
    if (isAuth) navigate(location?.state?.from || '/');
  }, [isAuth, location, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isLoading) return <Preloader />;

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
