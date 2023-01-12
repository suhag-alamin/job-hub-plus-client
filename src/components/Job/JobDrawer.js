import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import JobDetails from "./JobDetails";

// navbar
const JobDrawer = (props) => {
  const { window } = props;
  const { handleDrawerToggle, mobileOpen, job } = props;

  const drawer = (
    <Box sx={{ py: 6, px: 8, display: "flex" }}>
      <JobDetails job={job} />
      <Box>
        <Button
          sx={{ fontSize: 24, zIndex: 999 }}
          color="primary"
          variant="outlined"
        >
          <AiOutlineHeart />
        </Button>
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
