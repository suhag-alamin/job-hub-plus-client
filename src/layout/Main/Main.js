import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ minHeight: "100vh" }}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default Main;
