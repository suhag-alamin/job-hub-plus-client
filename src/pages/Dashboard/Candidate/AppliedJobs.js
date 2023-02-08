import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import JobTable from "../../../components/reuseable/JobTable";
import { useGetAppliedJobsByEmailQuery } from "../../../features/job/jobApi";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsByEmailQuery(email);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <div>
      <Container>
        {data?.data?.length > 0 ? (
          <>
            <Box sx={{ mb: 6 }}>
              <Typography
                sx={{
                  fontSize: { xs: 24, md: 30 },
                  textAlign: "center",
                  my: 2,
                }}
                color="secondary"
                variant="h3"
              >
                Applied Jobs
              </Typography>
            </Box>
            <JobTable jobs={data?.data} type="appliedJobs" />
          </>
        ) : (
          <Typography
            sx={{ fontSize: { xs: 24, md: 30 }, textAlign: "center", my: 2 }}
            variant="h3"
            color="error"
          >
            No Applied Jobs
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default AppliedJobs;
