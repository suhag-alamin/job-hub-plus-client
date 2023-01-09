import { Box } from "@mui/material";
import loading from "../../assets/images/loading.gif";
const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <Box>
        <img src={loading} alt="" />
      </Box>
    </Box>
  );
};

export default Loading;
