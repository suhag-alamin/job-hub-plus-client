import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import Badge from "../../../components/reuseable/Badge";
import homeStyles from "../../../styles/Home.module.scss";

const Landing = () => {
  const keywords = [
    "Web Developer",
    "Web Designer",
    "Writer",
    "Fullstack",
    "Senior",
    "Team Lead",
    "Administration",
    "SQA",
    "Tester",
  ];
  return (
    <Container sx={{ py: 8 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        <Grid xs={2} sm={4} md={6}>
          <Box>
            <Typography
              sx={{ fontSize: { xs: 30, md: 48 }, fontWeight: 700, my: 2 }}
              variant="h1"
            >
              Find the perfect job for you
            </Typography>
            <Typography
              sx={{ fontSize: { xs: 18, md: 24 }, mb: 4 }}
              variant="body1"
            >
              Search your career opportunity through 12,800 jobs
            </Typography>
            <Box className={homeStyles.searchBox}>
              <TextField
                label="Job title or Keyword"
                variant="outlined"
                fullWidth
                type="search"
                sx={{ borderRadius: "100px" }}
              />
              <Button sx={{ borderRadius: 8 }} variant="contained">
                <BiSearchAlt />
              </Button>
            </Box>
            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {keywords.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid xs={2} sm={4} md={6}></Grid>
      </Grid>
    </Container>
  );
};

export default Landing;
