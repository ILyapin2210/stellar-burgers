import { FC, ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../services/slices/userSlice';

interface ProtectedRouteProps {
  isPublic?: boolean;
  children: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isPublic,
  children
}) => {
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth && !isPublic) return <Navigate replace to='/login' />;

  return children;
};
