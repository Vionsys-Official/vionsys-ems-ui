import { Navigate } from 'react-router-dom';
import getUserIdRole from '../utils/getUserIdRole';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  const AuthWrapper = (props) => {
    const {role} = getUserIdRole();
    // if (user.role === 'user') {
    //   return <Navigate to="/dashboard" />;
    // }
    // Check if the user has the required roles for authorization
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
