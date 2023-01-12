import { Box, Button, Paper, Typography } from "@mui/material";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const JobCard = ({ job }) => {
  const {
    companyName,
    position,
    employmentType,
    location,
    workType,
    salaryRange,
  } = job;
  return (
    <Paper
      sx={{
        my: 4,
        px: 4,
        py: 2,
        boxShadow: 2,
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
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
          {salaryRange}
        </Typography>
      </Box>
      <Box>
        <Button sx={{ fontSize: 24 }} color="primary" variant="outlined">
          <AiOutlineHeart />
        </Button>
      </Box>
    </Paper>
  );
};

export default JobCard;
