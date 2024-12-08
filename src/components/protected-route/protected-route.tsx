import { FC, ReactElement, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../services/slices/user-slice/userSlice';

interface ProtectedRouteProps {
  isPublic?: boolean;
  children: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isPublic,
  children
}) => {
  const isAuth = useSelector(selectIsAuth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isAuth && !isPublic) {
      navigate('/login', { state: { from: pathname } });
    }
  }, [isAuth, isPublic, navigate, pathname]);

  return children;
};
