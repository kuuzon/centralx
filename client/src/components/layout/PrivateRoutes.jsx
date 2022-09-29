import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom'; 
import useAuth from '../../hooks/useAuth';

const PrivateRoutes = () => {
  const { getCurrentUser } = useAuth();
  const location = useLocation();

  return (
    !getCurrentUser()
      ? <Navigate to="/login" state={{ from: location }} replace />
      : <Outlet /> 
  )
}

export default PrivateRoutes