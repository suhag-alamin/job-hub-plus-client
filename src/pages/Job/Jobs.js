import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import JobCard from "../../components/Job/JobCard";
import JobFilter from "../../components/Job/JobFilter";

import { useGetJobsQuery } from "../../features/job/jobApi";

const Jobs = () => {
  const { data, isLoading, isError } = useGetJobsQuery();
  const { employmentType, postedTime, salaryRange, remote } = useSelector(
    (state) => state.filter
  );

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
    if (employmentType === "all" || postedTime === "any-time") {
      content = data?.data?.map((job) => <JobCard key={job._id} job={job} />);
    }
    if (employmentType !== "all") {
      content = data?.data
        ?.filter((job) => job.employmentType === employmentType)
        ?.map((job) => <JobCard key={job._id} job={job} />);
    }
    // if (postedTime !== "any-time") {
    //   content = data?.data
    //     ?.filter((job) => job.postedTime === postedTime)
    //     ?.map((job) => <JobCard key={job._id} job={job} />);
    // }
    if (remote) {
      content = data?.data
        ?.filter((job) => job?.workType === "remote")
        ?.map((job) => <JobCard key={job._id} job={job} />);
    }
  }

  // else if (data?.data?.length > 0 && employmentType === "all" && !isLoading) {
  //   content = data?.data?.map((job) => <JobCard key={job._id} job={job} />);
  // } else if (data?.data?.length > 0 && employmentType === "full-time") {
  //   content = data?.data
  //     ?.filter((job) => job.employmentType === "full-time")
  //     ?.map((job) => <JobCard key={job._id} job={job} />);
  // }
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
