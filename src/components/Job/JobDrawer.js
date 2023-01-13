import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import JobDetails from "./JobDetails";
import { IoIosFlash } from "react-icons/io";

// navbar
const JobDrawer = (props) => {
  const { window } = props;
  const { handleDrawerToggle, mobileOpen, job } = props;

  const drawer = (
    <Box
      sx={{ py: 6, px: 8, display: "flex", justifyContent: "space-between" }}
    >
      <JobDetails job={job} />
      <Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            sx={{ fontWeight: 700, textTransform: "inherit" }}
            color="secondary"
            variant="contained"
            startIcon={<IoIosFlash />}
          >
            Apply
          </Button>
          <Button
            sx={{ fontWeight: 700, textTransform: "inherit" }}
            color="primary"
            variant="outlined"
            startIcon={<AiOutlineHeart />}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexShrink: { sm: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            // display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "70%",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

JobDrawer.propTypes = {
  window: PropTypes.func,
};

export default JobDrawer;
