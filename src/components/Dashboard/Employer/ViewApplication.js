import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useGetApplicantsByJobUserIdsMutation } from "../../../features/job/jobApi";
import ApplicationTable from "./ApplicationTable";

const ViewApplication = ({ job }) => {
  const [getApplications, { data, isLoading }] =
    useGetApplicantsByJobUserIdsMutation();

  useEffect(() => {
    const jobData = {
      applicants: job?.applicants,
      jobId: job?._id,
    };
    if (job?.applicants?.length > 0) {
      getApplications(jobData);
    }
  }, [job, getApplications]);

  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box sx={{ mt: 4 }}>
          {data?.data?.length === 0 ? (
            <Typography
              sx={{ fontSize: { xs: 24, md: 30 }, textAlign: "center", my: 2 }}
              variant="h3"
              color="error"
            >
              No applications yet!
            </Typography>
          ) : (
            <ApplicationTable applications={data?.data} />
          )}
        </Box>
      )}
    </div>
  );
};

export default ViewApplication;
