import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import JobDrawer from "./JobDrawer";

const JobCard = ({ job }) => {
  const {
    companyName,
    position,
    employmentType,
    location,
    workType,
    salaryRange,
  } = job;

  // drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Paper
        onClick={handleDrawerToggle}
        sx={{
          my: 4,
          px: 4,
          py: 2,
          boxShadow: 2,
          borderRadius: 2,

          cursor: "pointer",
          zIndex: 1,
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700 }}
            color="secondary"
            variant="subtitle1"
            gutterBottom
          >
            {companyName}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: 18, md: 20 } }}
            color="primary"
            variant="h3"
            gutterBottom
          >
            {position}
          </Typography>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.primary"
            variant="body1"
            gutterBottom
          >
            {workType === "remote" ? "Remote" : location}
          </Typography>
          <Typography
            sx={{ fontSize: 12 }}
            color="text.primary"
            variant="body1"
            gutterBottom
          >
            {employmentType === "full-time"
              ? "Full-Time"
              : employmentType === "part-time"
              ? "Part-Time"
              : employmentType === "contract"
              ? "Contract"
              : "Internship"}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700 }}
            color="secondary"
            variant="subtitle2"
          >
            ${salaryRange}
          </Typography>
        </Box>
      </Paper>
      <JobDrawer
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        job={job}
      />
    </>
  );
};

export default JobCard;
