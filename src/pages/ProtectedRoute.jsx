import { Navigate, Route } from "react-router-dom";
import { isAuthenticated } from "../services/authApi";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return <Route
      {...rest}
      render={(props) => {
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" replace={true} />
        );
      }}
    />
};

export default ProtectedRoute;
