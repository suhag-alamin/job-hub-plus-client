import { Box, Paper, Typography } from "@mui/material";

const JobPageSidebar = ({ job }) => {
  const {
    companyName,
    experience,
    workLevel,
    salaryRange,
    location,
    workType,
    employeeRange,
    employerEmail,
    companyWebsite,
  } = job;

  return (
    <div>
      <Paper
        sx={{
          px: 3,
          py: 2,
          borderRadius: 2,
          bgcolor: "primary.main",
          my: 4,
        }}
      >
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{ fontSize: 16 }}
            color="info.main"
            variant="h5"
            gutterBottom
          >
            Experience
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700 }}
            variant="subtitle1"
            color="success.main"
          >
            {experience}
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{ fontSize: 16 }}
            color="info.main"
            variant="h5"
            gutterBottom
          >
            Work Level
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700 }}
            variant="subtitle1"
            color="success.main"
          >
            {workLevel}
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{ fontSize: 16 }}
            color="info.main"
            variant="h5"
            gutterBottom
          >
            Salary Range
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700 }}
            variant="subtitle1"
            color="success.main"
          >
            ${salaryRange}
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{ fontSize: 16 }}
            color="info.main"
            variant="h5"
            gutterBottom
          >
            Location
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700 }}
            variant="subtitle1"
            color="success.main"
          >
            {workType === "remote" ? "Remote" : location}
          </Typography>
        </Box>
      </Paper>
      <Paper
        sx={{
          px: 3,
          py: 2,
          borderRadius: 2,
          bgcolor: "primary.main",
          my: 4,
        }}
      >
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{ fontSize: 20 }}
            color="info.main"
            variant="h5"
            gutterBottom
          >
            {companyName}
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{ fontSize: 16 }}
            color="info.main"
            variant="h5"
            gutterBottom
          >
            Company Size
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700 }}
            variant="subtitle1"
            color="success.main"
          >
            {employeeRange}
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{ fontSize: 16 }}
            color="info.main"
            variant="h5"
            gutterBottom
          >
            Employer Email
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700 }}
            variant="subtitle1"
            color="success.main"
          >
            {employerEmail}
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{ fontSize: 16 }}
            color="info.main"
            variant="h5"
            gutterBottom
          >
            Company Website
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700 }}
            variant="subtitle1"
            color="success.main"
          >
            {companyWebsite}
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{ fontSize: 16 }}
            color="info.main"
            variant="h5"
            gutterBottom
          >
            Location
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700 }}
            variant="subtitle1"
            color="success.main"
          >
            {location}
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default JobPageSidebar;
