import { Box, Container, LinearProgress, Typography } from "@mui/material";
import JobCard from "../../components/Job/JobCard";
import JobFilter from "../../components/Job/JobFilter";

import { useGetJobsQuery } from "../../features/job/jobApi";

const Jobs = () => {
  const { data, isLoading, isError } = useGetJobsQuery();
  let content;
  if (isLoading) {
    content = (
      <Box>
        <LinearProgress />
      </Box>
    );
  } else if (!isLoading && isError) {
    content = (
      <Typography sx={{ textAlign: "center" }} variant="h5" color="error">
        Something went wrong
      </Typography>
    );
  } else if (data?.data?.length === 0 && !isLoading) {
    content = (
      <Typography sx={{ textAlign: "center" }} variant="h5" color="error">
        No jobs found
      </Typography>
    );
  } else if (data?.data?.length > 0 && !isLoading) {
    content = data?.data?.map((job) => <JobCard key={job._id} job={job} />);
  }
  return (
    <div>
      {/* filters  */}
      <Container sx={{ py: 2 }}>
        <JobFilter />
      </Container>
      {/* jobs  */}
      <Container sx={{ py: 2 }}>
        <Typography sx={{ fontSize: 20, mb: 2 }} variant="h4">
          Available Jobs for you -
        </Typography>
        {content}
      </Container>
    </div>
  );
};

export default Jobs;
