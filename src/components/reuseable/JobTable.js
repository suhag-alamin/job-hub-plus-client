import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCancelAppliedJobMutation } from "../../features/job/jobApi";
import { removeFromSaveJob } from "../../features/job/jobSlice";

const JobTable = ({ jobs, type }) => {
  const [cancelApplication, { isLoading, isError, isSuccess }] =
    useCancelAppliedJobMutation();
  const dispatch = useDispatch();
  const handleCancelApplication = (id) => {
    const confirm = window.confirm("Are you sure you want to cancel?");
    if (confirm) {
      cancelApplication(id);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toast.success("Application cancelled successfully", { id: "cancel" });
    } else if (!isLoading && isError) {
      toast.error("Something went wrong", { id: "cancel" });
    }
  }, [isLoading, isError, isSuccess]);
  return (
    <Box sx={{ overflowX: "hidden", width: { xs: 300, sm: 600, md: 1 } }}>
      <Paper sx={{ boxShadow: 2, borderRadius: 2, overflowX: "auto" }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ p: 1 }}>
                <Typography
                  sx={{
                    color: "info.main",
                    fontWeight: 500,
                    fontSize: { xs: 16, md: 20 },
                  }}
                  variant="subtitle1"
                >
                  No.
                </Typography>
              </TableCell>
              <TableCell sx={{ p: 1 }} align="center">
                <Typography
                  sx={{
                    color: "info.main",
                    fontWeight: 500,
                    fontSize: { xs: 16, md: 20 },
                  }}
                  variant="subtitle1"
                >
                  Job Title
                </Typography>
              </TableCell>
              <TableCell sx={{ p: 1 }} align="center">
                <Typography
                  sx={{
                    color: "info.main",
                    fontWeight: 500,
                    fontSize: { xs: 16, md: 20 },
                  }}
                  variant="subtitle1"
                >
                  Company Name
                </Typography>
              </TableCell>
              <TableCell sx={{ p: 1 }} align="center">
                <Typography
                  sx={{
                    color: "info.main",
                    fontWeight: 500,
                    fontSize: { xs: 16, md: 20 },
                  }}
                  variant="subtitle1"
                >
                  Company Website
                </Typography>
              </TableCell>
              <TableCell sx={{ p: 1 }} align="center">
                <Typography
                  sx={{
                    color: "info.main",
                    fontWeight: 500,
                    fontSize: { xs: 16, md: 20 },
                  }}
                  variant="subtitle1"
                >
                  Employment Type
                </Typography>
              </TableCell>
              {type === "appliedJobs" && (
                <TableCell sx={{ p: 1 }} align="center">
                  <Typography
                    sx={{ color: "info.main", fontWeight: 700 }}
                    variant="subtitle1"
                  >
                    Status
                  </Typography>
                </TableCell>
              )}
              {type === "savedJobs" && (
                <TableCell sx={{ p: 1 }} align="center">
                  <Typography
                    sx={{ color: "info.main", fontWeight: 700 }}
                    variant="subtitle1"
                  >
                    Job Details
                  </Typography>
                </TableCell>
              )}
              <TableCell sx={{ p: 1 }} align="center">
                <Typography
                  sx={{ color: "info.main", fontWeight: 700 }}
                  variant="subtitle1"
                >
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job, index) => (
              <TableRow
                key={job._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, p: 1 }}
              >
                <TableCell sx={{ p: 1 }} component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell sx={{ p: 1 }} align="center">
                  {job.jobPosition || job.position}
                </TableCell>
                <TableCell sx={{ p: 1 }} align="center">
                  {job.companyName}
                </TableCell>
                <TableCell sx={{ p: 1 }} align="center">
                  <a target="_blank" rel="noreferrer" href={job.companyWebsite}>
                    Company Website
                  </a>
                </TableCell>
                <TableCell sx={{ p: 1 }} align="center">
                  {job.employmentType.toUpperCase()}
                </TableCell>
                {type === "appliedJobs" && (
                  <TableCell sx={{ p: 1 }} align="center">
                    {job.status}
                  </TableCell>
                )}
                {type === "savedJobs" && (
                  <TableCell sx={{ p: 1 }} align="center">
                    <Link to={`/job-details/${job._id}`}>View Job</Link>
                  </TableCell>
                )}
                {type === "appliedJobs" ? (
                  <TableCell align="center">
                    <Button
                      onClick={() => handleCancelApplication(job._id)}
                      sx={{ textTransform: "inherit" }}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell align="center">
                    <Button
                      onClick={() => dispatch(removeFromSaveJob(job._id))}
                      sx={{ textTransform: "inherit" }}
                      variant="outlined"
                    >
                      Remove
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default JobTable;
