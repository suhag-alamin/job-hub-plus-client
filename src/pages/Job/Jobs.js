import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import JobCard from "../../components/Job/JobCard";
import JobFilter from "../../components/Job/JobFilter";

import { useGetJobsQuery } from "../../features/job/jobApi";
import SearchBar from "../../components/reuseable/SearchBar";

const Jobs = () => {
  const { data, isLoading, isError } = useGetJobsQuery();
  const { employmentType, postedTime, salaryRange, remote } = useSelector(
    (state) => state.filter
  );
  const { searchJobs } = useSelector((state) => state.job);
  console.log(searchJobs);

  // for postedTime filter
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

  if (searchJobs.length > 0) {
    if (employmentType === "all" || postedTime === "any-time") {
      content = searchJobs.map((job) => <JobCard key={job._id} job={job} />);
    }
    if (
      employmentType !== "all" ||
      postedTime !== "any-time" ||
      remote ||
      salaryRange
    ) {
      content = searchJobs
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
        ?.filter((job) => {
          if (salaryRange.length > 0) {
            if (salaryRange[0] === 500 && salaryRange[1] === 3000) return job;
            return (
              salaryRange[0] <= job?.salaryRange[0] &&
              salaryRange[1] >= job?.salaryRange[1]
            );
          }
          return job;
        })
        ?.map((job) => <JobCard key={job._id} job={job} />);
    }
  } else {
    if (isLoading) {
      content = (
        <Box>
          <LinearProgress />
        </Box>
      );
      return content;
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
      if (
        employmentType !== "all" ||
        postedTime !== "any-time" ||
        remote ||
        salaryRange
      ) {
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
          ?.filter((job) => {
            if (salaryRange.length > 0) {
              if (salaryRange[0] === 500 && salaryRange[1] === 3000) return job;
              return (
                salaryRange[0] <= job?.salaryRange[0] &&
                salaryRange[1] >= job?.salaryRange[1]
              );
            }
            return job;
          })
          ?.map((job) => <JobCard key={job._id} job={job} />);
      }
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
        <Box>
          <SearchBar />
        </Box>
        <Typography sx={{ fontSize: 20, mb: 2 }} variant="h4">
          Available Jobs for you -
        </Typography>

        {content.length ? (
          content
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" color="error">
              No matching jobs found
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Jobs;
