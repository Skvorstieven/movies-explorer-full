import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouteElement(props) {
  const { loggedIn, element } = props;
  return (
    loggedIn ? element : <Navigate to="/" replace />
  );
}
