import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import login from "../../assets/images/login.svg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <Container sx={{ py: 6 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
        sx={{ alignItems: "center" }}
      >
        <Grid xs={2} sm={4} md={6}>
          <Box>
            <img src={login} alt="login" />
          </Box>
        </Grid>
        <Grid xs={2} sm={4} md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                maxWidth: 600,
                py: 4,
                px: 3,
                borderRadius: 2,
                bgcolor: "#fff",
                boxShadow: 2,
              }}
            >
              <Typography
                sx={{ fontSize: { xs: 20, md: 30 }, textAlign: "center" }}
                variant="h4"
                color="primary"
              >
                Login
              </Typography>
              <TextField
                label="Email"
                type="email"
                placeholder="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <TextField
                label="Password"
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                })}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />

              <Button
                sx={{ textTransform: "inherit" }}
                type="submit"
                variant="contained"
              >
                Login
              </Button>
              <Typography variant="body1">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </Typography>
              <Button variant="outlined">Login with Google</Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
