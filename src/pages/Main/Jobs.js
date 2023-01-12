import { Container, Typography } from "@mui/material";
import JobCard from "../../components/Job/JobCard";
import JobFilter from "../../components/Job/JobFilter";

import { useGetJobsQuery } from "../../features/job/jobApi";

const Jobs = () => {
  const { data, isLoading, isError } = useGetJobsQuery();
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
        {data?.data?.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </Container>
    </div>
  );
};

export default Jobs;
