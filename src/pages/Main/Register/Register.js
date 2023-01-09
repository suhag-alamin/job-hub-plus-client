import { Box, Container, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import candidate from "../../../assets/images/candidate.svg";
import employer from "../../../assets/images/employer.svg";
import styles from "../../../styles/Register.module.scss";
import CandidateRegistration from "./CandidateRegistration";
import EmployerRegistration from "./EmployerRegistration";

const Register = () => {
  const { type } = useParams();

  if (type === "candidate") {
    return <CandidateRegistration />;
  }

  if (type === "employer") {
    return <EmployerRegistration />;
  }
  return (
    <div>
      <Container sx={{ py: 6 }}>
        <Typography
          sx={{ fontSize: { xs: 24, md: 30 }, textAlign: "center" }}
          variant="h3"
          color="primary"
        >
          Continue as ...
        </Typography>
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              py: 6,
            }}
          >
            <Grid item xs={2} sm={4} md={6}>
              <Box className={styles.imgBox}>
                <Link to="/register/candidate">
                  <img src={candidate} alt="candidate" />
                  <Typography
                    sx={{ fontSize: { xs: 18, md: 20 } }}
                    variant="h5"
                    color="primary"
                  >
                    Candidate
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={2} sm={4} md={6}>
              <Box className={styles.imgBox}>
                <Link to="/register/employer">
                  <img src={employer} alt="employer" />
                  <Typography
                    sx={{ fontSize: { xs: 18, md: 20 } }}
                    variant="h5"
                    color="primary"
                  >
                    Employer
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
