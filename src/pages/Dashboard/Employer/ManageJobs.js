import { Box, Container, LinearProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import JobTable from "../../../components/reuseable/JobTable";
import { useGetPostedJobsByEmailQuery } from "../../../features/job/jobApi";

const ManageJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetPostedJobsByEmailQuery(email);

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
                Manage Jobs
              </Typography>
            </Box>
            <JobTable jobs={data?.data} type="manageJobs" />
          </>
        ) : (
          <Typography
            sx={{ fontSize: { xs: 24, md: 30 }, textAlign: "center", my: 2 }}
            variant="h3"
            color="error"
          >
            You have not posted any jobs yet!{" "}
            <Link to="/dashboard/add-job">Post Job</Link>
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default ManageJobs;
