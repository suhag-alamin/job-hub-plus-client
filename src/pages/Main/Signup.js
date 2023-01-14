import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/images/login.svg";
import {
  createUser,
  googleLogin,
  toggleIsSuccess,
} from "../../features/auth/authSlice";

const Signup = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // redux
  const { isLoading, isError, error, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // watching password and password2
  const password = useWatch({ control, name: "password" });
  const password2 = useWatch({ control, name: "password2" });

  const [disabled, setDisabled] = useState(true);

  // handle error and success
  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      password2 !== undefined &&
      password2 !== "" &&
      password === password2
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);

      // toast.error("Password doesn't match", { id: "password" });
    }
  }, [password, password2]);

  // handle error and success

  const navigate = useNavigate();
  useEffect(() => {
    if (!isError && isSuccess && !isLoading) {
      reset();
      toast.success("Signup successful!", { id: "signup" });
      navigate("/");
      dispatch(toggleIsSuccess());
    } else if (isError && !isSuccess) {
      toast.error(error, { id: "signup" });
    }
  }, [isError, error, isSuccess, isLoading, dispatch, navigate, reset]);

  // handle submit
  const onSubmit = (data) => {
    dispatch(createUser({ email: data.email, password: data.password }));
  };

  // google login
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
                  Sign Up
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
                {errors.password &&
                  toast.error("Please enter a valid email address", {
                    id: "password",
                  })}
                <TextField
                  label="Password"
                  helperText="Password must be more then 6 characters long and contain at least one number and one special character"
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
                  })}
                />
                {errors.password &&
                  toast.error(
                    "Password must be more then 6  characters long and contain at least one number and one special character",
                    { id: "password" }
                  )}
                <TextField
                  label="Re-enter Password"
                  helperText="Re-enter the same password"
                  type="password"
                  placeholder="Re-enter Password"
                  {...register("password2", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
                  })}
                />

                <Button
                  sx={{ textTransform: "inherit" }}
                  type="submit"
                  variant="contained"
                  disabled={disabled || isLoading}
                >
                  Sign Up
                </Button>
                <Typography variant="body1">
                  Already have an account? <Link to="/login">Login</Link>
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

export default Signup;
