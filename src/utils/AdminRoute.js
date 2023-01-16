import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/reuseable/Loading";

const AdminRoute = ({ children }) => {
  const { pathname } = useLocation();

  const {
    user: { email, role },
    isLoading,
  } = useSelector((state) => state.auth);

  if (role !== "admin" || isLoading) {
    return (
      <Box>
        <Loading />
        <Navigate to="/" state={{ path: pathname }} />
      </Box>
    );
  }
  if (email && role === "admin") {
    return children;
  }
  return <Navigate to="/" state={{ path: pathname }} />;
};

export default AdminRoute;
