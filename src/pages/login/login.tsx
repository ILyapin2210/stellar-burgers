import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import {
  loginUser,
  selectIsAuth,
  selectIsLoading
} from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const isAuth = useSelector(selectIsAuth);

  if (isAuth) navigate('/profile');

  if (isLoading) return <Preloader />;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

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
