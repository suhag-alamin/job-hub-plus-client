import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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

const EmployerRegistration = () => {
  const [country, setCountry] = useState([]);

  const [postUser, { isError, isLoading, isSuccess, error }] =
    useRegisterMutation();
  const {
    user: { email },
  } = useSelector((state) => state.auth);

  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      email,
    },
  });
  const term = useWatch({ control, name: "term" });
  const navigate = useNavigate();

  const businessCategory = [
    "Automotive",
    "Business Support & Supplies",
    "Computers & Electronics",
    "Construction & Contractors",
    "Design Agency",
    "Education",
    "Entertainment",
    "Food & Dining",
    "Health & Medicine",
    "Home & Garden",
    "IT Farm",
    "Legal & Financial",
    "Manufacturing, Wholesale, Distribution",
    "Merchants (Retail)",
    "Miscellaneous",
    "Personal Care & Services",
    "Real Estate",
    "Travel & Transportation",
  ];

  const employeeRange = ["1 - 10", "11 - 50", "51 - 100", "Above 100"];

  const onSubmit = (data) => {
    data.country = country?.label;
    data.countryCode = country?.code;
    data.role = "employer";
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
              Employee
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
                disabled
                fullWidth
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
                type="url"
                variant="filled"
                label="Company Website"
                {...register("companyWebsite")}
              />
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Company's  Name"
                {...register("companyName")}
              />
              <FormControl fullWidth>
                <InputLabel>Employee Range</InputLabel>
                <Select
                  variant="filled"
                  label="Employee Range"
                  {...register("employeeRange")}
                >
                  {employeeRange
                    ?.sort((a, b) => a.localeCompare(b))
                    ?.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <FormControl fullWidth>
                <InputLabel>Company's Category</InputLabel>
                <Select
                  variant="filled"
                  label="Company's Category"
                  {...register("companyCategory")}
                >
                  {businessCategory
                    .sort((a, b) => a.localeCompare(b))
                    .map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label=" Your role in company"
                {...register("roleInCompany")}
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

export default EmployerRegistration;
