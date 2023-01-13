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
  const now = new Date();
  const twentyFourHoursAgo = new Date(
    now.getTime() - 24 * 60 * 60 * 1000
  ).toISOString();
  const threeDaysAgo = new Date(
    now.getTime() - 3 * 24 * 60 * 60 * 1000
  ).toISOString();
  const twoWeeksAgo = new Date(
    now.getTime() - 14 * 24 * 60 * 60 * 1000
  ).toISOString();
  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  ).toISOString();

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
    if (employmentType !== "all" || postedTime !== "any-time" || remote) {
      content = data?.data
        ?.filter((job) => {
          if (employmentType !== "all") {
            return job.employmentType === employmentType;
          }
          return job;
        })
        ?.filter((job) => {
          if (postedTime === "last-day") {
            return job.createdDate > twentyFourHoursAgo;
          } else if (postedTime === "last-3-days") {
            return job.createdDate > threeDaysAgo;
          }
          if (postedTime === "last-2-weeks") {
            return job.createdDate > twoWeeksAgo;
          } else if (postedTime === "last-month") {
            return job.createdDate > oneMonthAgo;
          }
          return job;
        })
        ?.filter((job) => {
          if (remote) {
            return job?.workType === "remote";
          }
          return job;
        })
        ?.map((job) => <JobCard key={job._id} job={job} />);
    }
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
