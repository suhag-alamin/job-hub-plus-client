import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/reuseable/Loading";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();

  const {
    user: { email },
    isLoading,
  } = useSelector((state) => state.auth);
  if (isLoading) {
    return <Loading />;
  }
  if (!email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }
  return children;
};

export default PrivateRoute;
