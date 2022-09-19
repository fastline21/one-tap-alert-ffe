import React from 'react';
import { Navigate } from 'react-router-dom';

import { isLogin } from 'Services/Utils/authToken';

const PrivateRoute = ({ children }) => {
  const auth = isLogin();
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
