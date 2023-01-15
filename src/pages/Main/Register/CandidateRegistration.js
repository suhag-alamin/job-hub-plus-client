import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CountrySelect from "../../../components/reuseable/CountrySelect";
import { useRegisterMutation } from "../../../features/auth/authApi";

const CandidateRegistration = () => {
  const [postUser, { isError, isLoading, isSuccess, error }] =
    useRegisterMutation();
  const {
    user: { email },
  } = useSelector((state) => state.auth);

  const [country, setCountry] = useState([]);

  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      email,
    },
  });
  const term = useWatch({ control, name: "term" });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.country = country?.label;
    data.countryCode = country?.code;
    data.role = "candidate";
    console.log(data);
    postUser(data);
  };

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toast.success("Registration successful", { id: "user-register" });
      navigate("/dashboard");
    } else if (!isLoading && !isSuccess && isError) {
      toast.error(error.message, { id: "user-register" });
    }
  }, [isLoading, isError, isSuccess, error, navigate]);

  const handleBack = () => {
    navigate("/register");
  };
  return (
    <>
      {isLoading && <LinearProgress />}
      <Container sx={{ py: 6 }}>
        <Box
          sx={{
            py: 3,
            px: 4,
            boxShadow: 1,
            borderRadius: 2,
          }}
        >
          <Box sx={{ mb: 6 }}>
            <Button onClick={handleBack} startIcon={<HiOutlineArrowLeft />}>
              Back
            </Button>
            <Typography
              sx={{ fontSize: { xs: 24, md: 30 }, textAlign: "center", my: 2 }}
              color="secondary"
              variant="h3"
            >
              Candidate
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="First Name"
                {...register("firstName")}
              />
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Last Name"
                {...register("lastName")}
              />
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                disabled
                type="email"
                variant="filled"
                label="Email"
                {...register("email")}
              />
              <FormControl fullWidth>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    {...register("gender")}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    {...register("gender")}
                  />

                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                    {...register("gender")}
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <Box sx={{ width: 1 }}>
                <CountrySelect setCountry={setCountry} />
              </Box>
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Street Address"
                {...register("address")}
              />
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="City"
                {...register("city")}
              />
              <TextField
                fullWidth
                type="number"
                variant="filled"
                label=" Postal Code"
                {...register("postcode")}
              />
            </Stack>

            <Box>
              <FormControlLabel
                control={<Checkbox />}
                label="I agree to terms and conditions"
                {...register("term")}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Button
                sx={{ textTransform: "inherit" }}
                type="submit"
                variant="contained"
                disabled={!term}
              >
                Register
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default CandidateRegistration;
