import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/reuseable/Loading";

const EmployerRoute = ({ children }) => {
  const { pathname } = useLocation();

  const {
    user: { email, role },
    isLoading,
  } = useSelector((state) => state.auth);

  if (role !== "employer" || isLoading) {
    return (
      <Box>
        <Loading />
        <Navigate to="/dashboard" state={{ path: pathname }} />
      </Box>
    );
  }
  if (email && role === "employer") {
    return children;
  }
  return <Navigate to="/dashboard" state={{ path: pathname }} />;
};

export default EmployerRoute;
