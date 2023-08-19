import {
  Box,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useApplyJobMutation,
  useGetJobByIdQuery,
} from "../features/job/jobApi";

const Apply = () => {
  const { jobId } = useParams();
  const { data, isLoading: jobLoading } = useGetJobByIdQuery(jobId);
  const { companyName, position, companyWebsite, employmentType, salaryRange } =
    data?.data || {};

  const {
    user: { _id, email, firstName, lastName },
  } = useSelector((state) => state.auth);
  const [applyJob, { isLoading, isError, error, isSuccess }] =
    useApplyJobMutation();
  const dispatch = useDispatch();
  console.log(error);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName,
      lastName,
      candidateEmail: email,
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.candidateName = `${data.firstName} ${data.lastName}`;
    data.userId = _id;
    data.jobId = jobId;
    data.jobPosition = position;
    data.companyName = companyName;
    data.companyWebsite = companyWebsite;
    data.employmentType = employmentType;
    data.status = "applied";

    delete data.firstName;
    delete data.lastName;
    dispatch(applyJob(data));
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toast.success("Job application submitted successfully", {
        id: "applyJob",
      });
      navigate("/dashboard");
    } else if (isError && !isLoading && !isSuccess) {
      toast.error("Job application failed. Please try again later.", {
        id: "applyJob",
      });
    }
  }, [isLoading, isSuccess, isError, navigate]);

  if (jobLoading) {
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
                label="Relevant Previous Job Title"
                {...register("previousJobTitle")}
              />
              <TextField
                fullWidth
                type="text"
                variant="standard"
                label="Relevant Previous Company Name"
                {...register("previousCompanyName")}
              />
            </Stack>
            <Box sx={{ my: 2 }}>
              {/* <Typography variant="subtitle1" gutterBottom>
                Resume (required)
              </Typography> */}

              {/* <Input
                // onChange={handleFileUpload}
                accept="application/pdf"
                type="file"
                {...register("resume")}
              /> */}
              <TextField
                required={true}
                fullWidth
                type="url"
                variant="standard"
                label="Resume link"
                helperText="Please provide a link to your resume. We recommend using Google Drive or Dropbox."
                {...register("resumeLink")}
              />
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size="20px" color="info" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Apply;
