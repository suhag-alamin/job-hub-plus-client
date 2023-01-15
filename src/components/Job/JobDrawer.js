import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoIosFlash } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToSaveJob } from "../../features/job/jobSlice";
import JobDetails from "./JobDetails";

// navbar
const JobDrawer = (props) => {
  const { window } = props;
  const { handleDrawerToggle, mobileOpen, job } = props;

  const dispatch = useDispatch();
  const { savedJobs } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  const alreadySaved = savedJobs?.find(
    (savedJob) => savedJob?._id === job?._id
  );

  const navigate = useNavigate();

  const handleApply = () => {
    if (user?.role === "employer") {
      toast.error("You need a candidate account to apply for a job", {
        id: "apply",
      });
    } else if (user?.role === "") {
      navigate("/register");
    } else {
      navigate(`/apply/${job?._id}`);
    }
  };

  const drawer = (
    <Box sx={{ py: { xs: 2, md: 6 }, px: { xs: 2, md: 8 } }}>
      <Box sx={{ textAlign: "right" }}>
        <Link target="_blank" to={`/job-details/${job._id}`}>
          Open in a New Tab
        </Link>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <JobDetails job={job} />
        <Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              onClick={handleApply}
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
              startIcon={alreadySaved ? <AiFillHeart /> : <AiOutlineHeart />}
              onClick={() => dispatch(addToSaveJob(job))}
            >
              Save
            </Button>
          </Box>
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
