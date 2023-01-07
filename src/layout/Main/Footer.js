import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box sx={{ py: 1, bgcolor: "#2b2d42" }}>
        <Container>
          <Typography
            sx={{ fontSize: 14 }}
            variant="body1"
            align="center"
            color="#fff"
          >
            &copy; {new Date().getFullYear()} All rights reserved. Design and
            Develop by Suhag Al Amin.
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
