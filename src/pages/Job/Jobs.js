import { Container, Typography } from "@mui/material";
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
  // function checkRecentDate(date) {

  //   if (date > twentyFourHoursAgo.toISOString()) {
  //     return true;
  //   } else if (date > threeDaysAgo.toISOString()) {
  //     return true;
  //   } else if (date > twoWeeksAgo.toISOString()) {
  //     return true;
  //   } else if (date > oneMonthAgo.toISOString()) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  let content;
  // if (isLoading) {
  //   content = (
  //     <Box>
  //       <LinearProgress />
  //     </Box>
  //   );
  // } else
  if (!isLoading && isError) {
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
    if (postedTime !== "any-time") {
      // filter jobs by postedTime - 1 day, 3 days, 2 weeks, 1 month
      content = data?.data
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
        ?.map((job) => <JobCard key={job._id} job={job} />);
    }
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
