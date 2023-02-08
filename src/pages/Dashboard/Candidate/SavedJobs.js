import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import JobTable from "../../../components/reuseable/JobTable";

const SavedJobs = () => {
  const { savedJobs } = useSelector((state) => state.job);
  return (
    <div>
      <Container>
        {savedJobs?.length > 0 ? (
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
                Saved Jobs ({savedJobs?.length})
              </Typography>
            </Box>
            <JobTable jobs={savedJobs} type="savedJobs" />
          </>
        ) : (
          <Typography
            sx={{ fontSize: { xs: 24, md: 30 }, textAlign: "center", my: 2 }}
            variant="h3"
            color="error"
          >
            No Saved Jobs Yet!
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default SavedJobs;
