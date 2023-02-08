import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillLinkedin, AiOutlineLink } from "react-icons/ai";
import {
  BsArrowReturnRight,
  BsFacebook,
  BsFillEnvelopeFill,
  BsTwitter,
} from "react-icons/bs";
import { IoIosFlash } from "react-icons/io";
import { RiWhatsappFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import JobPageSidebar from "../../components/Job/JobPageSidebar";
import { useGetJobByIdQuery } from "../../features/job/jobApi";

const JobDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetJobByIdQuery(id);
  const [isCopied, setIsCopied] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box>
        <LinearProgress />
      </Box>
    );
  }

  const {
    _id,
    position,
    experience,
    employmentType,
    overview,
    skills,
    responsibilities,
    requirements,
  } = data?.data || {};

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/job-details/${_id}`
    );
    setIsCopied(true);
  };

  const handleApply = () => {
    if (user?.role === "employer") {
      toast.error("You need a candidate account to apply for a job", {
        id: "apply",
      });
    } else if (user?.role === "") {
      navigate("/register");
    } else {
      navigate(`/apply/${_id}`);
    }
  };

  return (
    <div>
      <Container sx={{ py: 6 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={8}>
            <Box>
              <Typography
                sx={{ fontSize: { xs: 18, md: 20 } }}
                color="primary"
                variant="h3"
                gutterBottom
              >
                {position}
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
              <Typography
                sx={{ fontSize: 20, mb: 2 }}
                variant="h4"
                color="primary"
              >
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
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box>
                <Button
                  onClick={handleApply}
                  sx={{ fontWeight: 700, textTransform: "inherit" }}
                  color="secondary"
                  variant="contained"
                  startIcon={<IoIosFlash />}
                >
                  Apply
                </Button>
              </Box>
              <Stack
                sx={{ alignItems: "center", py: 2 }}
                direction="row"
                gap={1}
                flexWrap="wrap"
              >
                <Typography sx={{ fontSize: 16 }} variant="body1">
                  Share on Social Media:
                </Typography>
                <FacebookShareButton
                  windowWidth={750}
                  windowHeight={675}
                  url={`https://jobhubplus.web.app/job-details/${_id}`}
                  quote={`I found this job on JobHubPlus and I think it's a good fit for you. Check it out!`}
                  title={`${position} | JobHubPlus`}
                  hashtag={`#${skills[0]} #${skills[1]} #${skills[2]} #suhag_al_amin`}
                >
                  <Button sx={{ fontSize: 20 }} variant="outlined">
                    <BsFacebook />
                  </Button>
                </FacebookShareButton>
                <TwitterShareButton
                  windowWidth={750}
                  windowHeight={675}
                  url={`https://jobhubplus.web.app/job-details/${_id}`}
                  title={`${position} | JobHubPlus`}
                  hashtags={`#${skills[0]} #${skills[1]} #${skills[2]} #suhag_al_amin`}
                  via="suhag_al_amin_me"
                >
                  <Button sx={{ fontSize: 20 }} variant="outlined">
                    <BsTwitter />
                  </Button>
                </TwitterShareButton>
                <LinkedinShareButton
                  windowWidth={750}
                  windowHeight={675}
                  url={`https://jobhubplus.web.app/job-details/${_id}`}
                  title={`${position} | JobHubPlus`}
                  summary={`I found this job on JobHubPlus and I think it's a good fit for you. Check it out!`}
                  source="JobHubPlus"
                >
                  <Button sx={{ fontSize: 20 }} variant="outlined">
                    <AiFillLinkedin />
                  </Button>
                </LinkedinShareButton>
                <WhatsappShareButton
                  windowWidth={750}
                  windowHeight={675}
                  url={`https://jobhubplus.web.app/job-details/${_id}`}
                  title={`${position} | JobHubPlus`}
                  separator=":: "
                >
                  <Button sx={{ fontSize: 20 }} variant="outlined">
                    <RiWhatsappFill />
                  </Button>
                </WhatsappShareButton>
                <EmailShareButton
                  windowWidth={750}
                  windowHeight={675}
                  url={`https://jobhubplus.web.app/job-details/${_id}`}
                  subject={`${position} | JobHubPlus`}
                  body={`I found this job on JobHubPlus and I think it's a good fit for you. Check it out!`}
                >
                  <Button sx={{ fontSize: 20 }} variant="outlined">
                    <BsFillEnvelopeFill />
                  </Button>
                </EmailShareButton>
                <Button
                  onClick={handleCopyToClipboard}
                  sx={{ textTransform: "inherit" }}
                  variant={isCopied ? "contained" : "outlined"}
                  startIcon={<AiOutlineLink />}
                >
                  {isCopied ? "Copied" : "Copy"}
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <JobPageSidebar job={data?.data} />
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container sx={{ py: 6 }}>
        <Typography sx={{ fontSize: 20 }} variant="h4" color="primary">
          General Q/A
        </Typography>
        <Stack
          sx={{ my: 4, width: { xs: 1, md: 2 / 3 } }}
          direction="row"
          gap={2}
        >
          <TextField fullWidth label="Ask a question" />
          <Button sx={{ fontSize: 20 }} variant="outlined">
            <BsArrowReturnRight />
          </Button>
        </Stack>
      </Container>
    </div>
  );
};

export default JobDetailsPage;
