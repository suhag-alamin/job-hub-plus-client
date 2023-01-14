import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/images/login.svg";
import {
  googleLogin,
  loginUser,
  toggleIsSuccess,
} from "../../features/auth/authSlice";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, error, isSuccess, isLoading } = useSelector(
    (state) => state.auth
  );

  // handle error and success
  useEffect(() => {
    if (!isError && isSuccess && !isLoading) {
      reset();
      toast.success("Login successful!", { id: "login" });
      navigate("/");
      dispatch(toggleIsSuccess());
    } else if (isError && !isSuccess && !isLoading) {
      toast.error(error, { id: "login" });
    }
  }, [isError, error, isSuccess, isLoading, reset, navigate, dispatch]);

  // email password login
  const onSubmit = ({ email, password }) => {
    if (!email || !password) {
      toast.error("Please fill all the fields", { id: "login" });
    } else {
      dispatch(loginUser({ email, password }));
    }
  };

  // google login
  const handleGoogleLogin = () => {
    dispatch(googleLogin());
    dispatch(toggleIsSuccess());
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <Container sx={{ py: 6 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
          sx={{ alignItems: "center" }}
        >
          <Grid item xs={2} sm={4} md={6}>
            <Box>
              <img src={login} alt="login" />
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
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
                  {...register("email")}
                />
                <TextField
                  label="Password"
                  type="password"
                  placeholder="password"
                  {...register("password")}
                />
                <FormControlLabel control={<Checkbox />} label="Remember me" />

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
                <Button
                  onClick={handleGoogleLogin}
                  startIcon={<FcGoogle />}
                  variant="outlined"
                >
                  Continue with Google
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
