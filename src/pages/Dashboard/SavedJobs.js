import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";

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
                Applied Jobs
              </Typography>
            </Box>
            {/* <JobTable jobs={data?.data} /> */}
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
