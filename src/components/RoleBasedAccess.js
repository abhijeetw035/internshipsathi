import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const RoleBasedAccess = ({ children, allowedRoles = [], fallback = null }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback;
  }

  return children;
};

export default RoleBasedAccess;
