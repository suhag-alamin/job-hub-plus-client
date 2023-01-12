import { Container } from "@mui/material";
import JobFilter from "../../../components/reuseable/JobFilter";
import { useGetJobsQuery } from "../../../features/job/jobApi";

const Jobs = () => {
  const { data, isLoading, isError } = useGetJobsQuery();
  return (
    <div>
      {/* filters  */}
      <Container sx={{ py: 2 }}>
        <JobFilter />
      </Container>
    </div>
  );
};

export default Jobs;
