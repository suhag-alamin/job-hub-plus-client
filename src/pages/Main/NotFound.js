import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import error from "../../assets/images/404-Error.gif";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container sx={{ py: 6, textAlign: "center" }}>
        <img src={error} alt="404 Error" />
        <Box sx={{ textAlign: "center", my: 2 }}>
          <Button
            onClick={() => navigate("/")}
            sx={{ textTransform: "inherit" }}
            variant="contained"
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default NotFound;
