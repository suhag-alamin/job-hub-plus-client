import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import hero1 from "../../../assets/images/hero-01.jpg";
import hero2 from "../../../assets/images/hero-02.jpg";
import hero3 from "../../../assets/images/hero-03.jpg";
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
    <Box sx={{ py: 14, px: 8 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        <Grid xs={2} sm={4} md={6}>
          <Box sx={{ maxWidth: 500 }}>
            <Typography
              sx={{ fontSize: { xs: 30, md: 48 }, fontWeight: 700, my: 2 }}
              variant="h1"
            >
              Find the perfect <br /> job for you
            </Typography>
            <Typography
              sx={{ fontSize: { xs: 16, md: 22 }, mb: 2 }}
              variant="body1"
            >
              Search your career opportunity <br /> through 12,800+ jobs
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
        <Grid xs={2} sm={4} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 7,
            }}
          >
            <Box
              sx={{
                borderRadius: 4,
                boxShadow: 2,
                py: 2,
                px: 2,
                bgcolor: "#fff",
                position: "relative",
                left: "40%",
                width: 280,
              }}
              className="statCard"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{ fontSize: 24, fontWeight: 700 }}
                  variant="subtitle1"
                  color="primary"
                >
                  319+
                </Typography>
                <Typography variant="body1">Job offers</Typography>
              </Box>
              <Typography variant="body1">In Business Development</Typography>
            </Box>
            <Box
              sx={{
                borderRadius: 4,
                boxShadow: 2,
                py: 2,
                px: 2,
                bgcolor: "#fff",
                position: "relative",
                left: "30%",
                width: 280,
              }}
              className="statCard"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{ fontSize: 24, fontWeight: 700 }}
                  variant="subtitle1"
                  color="primary"
                >
                  265+
                </Typography>
                <Typography variant="body1">Job offers</Typography>
              </Box>
              <Typography variant="body1">
                In Marketing & Communication
              </Typography>
            </Box>
            <Box
              sx={{
                borderRadius: 4,
                boxShadow: 2,
                py: 2,
                px: 2,
                bgcolor: "#fff",
                position: "relative",
                left: "20%",
                width: 280,
              }}
              className="statCard"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{ fontSize: 24, fontWeight: 700 }}
                  variant="subtitle1"
                  color="primary"
                >
                  324+
                </Typography>
                <Typography variant="body1">Job offers</Typography>
              </Box>
              <Typography variant="body1">In Project Management</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          maxWidth: 672,
          height: "80vh",
          borderRadius: "0 0 9999px 9999px",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: -1,
        }}
      >
        <img id="hero1" src={hero1} alt="" className={homeStyles.heroImage} />
        <img id="hero2" src={hero2} alt="" className={homeStyles.heroImage} />
        <img id="hero3" src={hero3} alt="" className={homeStyles.heroImage} />
      </Box>
    </Box>
  );
};

export default Landing;
