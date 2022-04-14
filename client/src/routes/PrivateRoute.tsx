import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ component }: { component: ReactJSXElement }) => {
  const location = useLocation();
  const authLogin = localStorage.getItem("token");
  return authLogin ? (
    component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
