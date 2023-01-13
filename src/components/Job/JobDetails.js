import { Box, Button, Stack, Typography } from "@mui/material";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { IoIosFlash } from "react-icons/io";
import { FacebookShareButton, TwitterShareButton } from "react-share";

const JobDetails = ({ job }) => {
  const {
    companyName,
    position,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    location,
    overview,
    skills,
    responsibilities,
    requirements,
    workType,
  } = job;
  return (
    <div>
      <Box>
        <Typography
          sx={{ fontSize: 14, fontWeight: 700 }}
          color="secondary"
          variant="subtitle1"
          gutterBottom
        >
          Job Provider: {companyName}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: 18, md: 20 } }}
          color="primary"
          variant="h3"
          gutterBottom
        >
          Position: {position}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.primary"
          variant="body1"
          gutterBottom
        >
          Location: {workType === "remote" ? "Remote" : location}
        </Typography>
        <Typography
          sx={{ fontSize: 12 }}
          color="text.primary"
          variant="body1"
          gutterBottom
        >
          Employment Type:{" "}
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
          gutterBottom
        >
          Salary Range: ${salaryRange}
        </Typography>
        <Typography sx={{ fontSize: 14 }} variant="subtitle2">
          Work Level: {workLevel}
        </Typography>
        <Typography sx={{ fontSize: 14 }} variant="subtitle2">
          Experience: {experience}
        </Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography
          sx={{ fontSize: 20 }}
          variant="h4"
          color="primary"
          gutterBottom
        >
          Details:{" "}
        </Typography>
        <Typography sx={{ fontSize: 16 }} variant="body1" gutterBottom>
          {overview}
        </Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography
          sx={{ fontSize: 20 }}
          variant="h4"
          color="primary"
          gutterBottom
        >
          Responsibilities:{" "}
        </Typography>
        {responsibilities.map((responsibility, index) => (
          <Typography sx={{ fontSize: 16 }} variant="body1" gutterBottom>
            {index + 1}. {responsibility}
          </Typography>
        ))}
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography
          sx={{ fontSize: 20 }}
          variant="h4"
          color="primary"
          gutterBottom
        >
          Requirements:{" "}
        </Typography>
        {requirements.map((requirement, index) => (
          <Typography sx={{ fontSize: 16 }} variant="body1" gutterBottom>
            {index + 1}. {requirement}
          </Typography>
        ))}
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography sx={{ fontSize: 20, mb: 2 }} variant="h4" color="primary">
          Necessary Skills:{" "}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={2}>
          {skills.map((skill, index) => (
            <Typography
              sx={{
                fontSize: 16,
                py: 1,
                px: 2,
                border: "1px solid",
                borderColor: "secondary.main",
                borderRadius: 2,
              }}
              variant="body1"
              gutterBottom
            >
              {skill}
            </Typography>
          ))}
        </Stack>
      </Box>
      <Box
        sx={{
          my: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Button
            sx={{ fontWeight: 700, textTransform: "inherit" }}
            color="secondary"
            variant="contained"
            startIcon={<IoIosFlash />}
          >
            Apply
          </Button>
        </Box>
        <Stack sx={{ alignItems: "center", py: 2 }} direction="row" gap={2}>
          <Typography sx={{ fontSize: 16 }} variant="body1">
            Share on Social Media:
          </Typography>
          <FacebookShareButton
            url={`https://jobhubplus.web.app/job-details/${job?._id}`}
            quote={`I found this job on JobHubPlus and I think it's a good fit for you. Check it out!`}
            title={`${position} | JobHubPlus`}
            hashtag={`#${skills[0]} #${skills[1]} #${skills[2]} #suhag_al_amin`}
          >
            <Button sx={{ fontSize: 20 }} variant="outlined">
              <BsFacebook />
            </Button>
          </FacebookShareButton>

          <TwitterShareButton
            url={`https://jobhubplus.web.app/job-details/${job?._id}`}
            title={`${position} | JobHubPlus`}
            hashtag={`#${skills[0]} #${skills[1]} #${skills[2]} #suhag_al_amin`}
          >
            <Button sx={{ fontSize: 20 }} variant="outlined">
              <BsTwitter />
            </Button>
          </TwitterShareButton>
        </Stack>
      </Box>
    </div>
  );
};

export default JobDetails;
