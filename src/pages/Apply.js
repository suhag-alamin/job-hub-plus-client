import {
  Box,
  Button,
  Container,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../features/job/jobApi";

const Apply = () => {
  const { jobId } = useParams();
  const { data, isLoading } = useGetJobByIdQuery(jobId);
  const { companyName, position } = data?.data || {};

  const {
    user: { _id, email, firstName, lastName },
  } = useSelector((state) => state.auth);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName,
      lastName,
      candidateEmail: email,
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.userId = _id;
    data.jobId = jobId;
    console.log(data);
  };
  if (isLoading) {
    return (
      <Box>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <div>
      <Container sx={{ py: 6 }}>
        <Typography
          sx={{
            fontSize: { xs: 24, md: 30 },
            fontWeight: 500,
            textAlign: "center",
            borderBottom: "1px solid #ccc",
            pb: 2,
          }}
          color="primary"
          variant="h4"
          gutterBottom
        >
          Apply for job - {position} @ {companyName}
        </Typography>
        <Box
          sx={{
            my: 4,
            width: 2 / 3,
            mx: "auto",
            bgcolor: "info.main",
            boxShadow: 2,
            borderRadius: 2,
            px: 4,
            py: 3,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                disabled
                type="text"
                variant="standard"
                label="First Name"
                {...register("firstName")}
              />
              <TextField
                fullWidth
                disabled
                type="text"
                variant="standard"
                label="Last Name"
                {...register("lastName")}
              />
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                disabled
                type="email"
                variant="standard"
                label="Email"
                {...register("candidateEmail")}
              />
              <TextField
                fullWidth
                type="tel"
                variant="standard"
                label="Phone Number"
                {...register("phoneNumber")}
              />
            </Stack>
            <Typography variant="subtitle1" gutterBottom>
              Relevant experience
            </Typography>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                type="text"
                variant="standard"
                label="Job title"
                {...register("jobTitle")}
              />
              <TextField
                fullWidth
                type="text"
                variant="standard"
                label="Company Name"
                {...register("companyName")}
              />
            </Stack>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Resume (required)
              </Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{ textTransform: "inherit" }}
                startIcon={<AiOutlineFilePdf />}
              >
                Upload Resume (PDF)
                <input
                  hidden
                  accept="application/pdf"
                  type="file"
                  {...register("resume")}
                />
              </Button>
            </Box>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                type="text"
                multiline
                variant="standard"
                label="Cover Letter (optional)"
                {...register("coverLetter")}
              />
            </Stack>

            <Box sx={{ my: 4 }}>
              <Button
                sx={{ textTransform: "inherit" }}
                type="submit"
                variant="contained"
              >
                Apply Now
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Apply;
