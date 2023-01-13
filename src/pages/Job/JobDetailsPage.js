import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import JobDetails from "../../components/Job/JobDetails";
import { useGetJobByIdQuery } from "../../features/job/jobApi";

const JobDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetJobByIdQuery(id);

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
  } else if (!data?.data && !isLoading) {
    content = (
      <Typography sx={{ textAlign: "center" }} variant="h5" color="error">
        No jobs found
      </Typography>
    );
  } else if (data?.data && !isLoading) {
    content = <JobDetails job={data?.data} />;
  }

  return <Container sx={{ py: 6 }}>{content}</Container>;
};

export default JobDetailsPage;
