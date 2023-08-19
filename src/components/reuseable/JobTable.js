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
import { Link, useNavigate } from "react-router-dom";
import {
  useCancelAppliedJobMutation,
  useDeleteJobByIdMutation,
} from "../../features/job/jobApi";
import { removeFromSaveJob } from "../../features/job/jobSlice";

const JobTable = ({ jobs, type }) => {
  const [cancelApplication, { isLoading, isError, isSuccess }] =
    useCancelAppliedJobMutation();
  const [
    deleteJob,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      isSuccess: deleteIsSuccess,
    },
  ] = useDeleteJobByIdMutation();
  const dispatch = useDispatch();

  // delete job
  const handleDeleteJob = (id) => {
    const confirm = window.confirm("Are you sure you want to remove?");
    if (confirm) {
      dispatch(deleteJob(id));
    } else {
      return;
    }
  };

  // cancel application
  const handleCancelApplication = (id) => {
    const confirm = window.confirm("Are you sure you want to cancel?");
    if (confirm) {
      cancelApplication(id);
    } else {
      return;
    }
  };

  const navigate = useNavigate();

  // handle manage click
  const handleManageClick = (id) => {
    navigate(`/dashboard/manage-jobs/${id}`);
  };

  // handle status

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toast.success("Application cancelled successfully!", { id: "cancel" });
    } else if (!isLoading && isError) {
      toast.error("Something went wrong", { id: "cancel" });
    }
  }, [isLoading, isError, isSuccess]);

  useEffect(() => {
    if (!deleteIsLoading && !deleteIsError && deleteIsSuccess) {
      toast.success("Job removed successfully!", { id: "cancel" });
    } else if (!deleteIsLoading && deleteIsError) {
      toast.error("Something went wrong", { id: "cancel" });
    }
  }, [deleteIsLoading, deleteIsError, deleteIsSuccess]);
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
              {type !== "manageJobs" && (
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
              )}
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
              {type === "manageJobs" && (
                <TableCell sx={{ p: 1 }} align="center">
                  <Typography
                    sx={{
                      color: "info.main",
                      fontWeight: 500,
                      fontSize: { xs: 16, md: 20 },
                    }}
                    variant="subtitle1"
                  >
                    Details
                  </Typography>
                </TableCell>
              )}
              {type === "manageJobs" && (
                <TableCell sx={{ p: 1 }} align="center">
                  <Typography
                    sx={{
                      color: "info.main",
                      fontWeight: 500,
                      fontSize: { xs: 16, md: 20 },
                    }}
                    variant="subtitle1"
                  >
                    Total candidates
                  </Typography>
                </TableCell>
              )}
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
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  p: 1,
                }}
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
                {type !== "manageJobs" && (
                  <TableCell sx={{ p: 1 }} align="center">
                    <a
                      href={job?.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Company Website
                    </a>
                  </TableCell>
                )}
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
                {type === "manageJobs" && (
                  <TableCell sx={{ p: 1 }} align="center">
                    <Button
                      onClick={() => handleManageClick(job?._id)}
                      sx={{ textTransform: "inherit" }}
                      variant="text"
                    >
                      Details
                    </Button>
                  </TableCell>
                )}
                {type === "manageJobs" && (
                  <TableCell sx={{ p: 1 }} align="center">
                    {job?.applicants?.length || 0}
                  </TableCell>
                )}
                {type === "manageJobs" && (
                  <TableCell align="center">
                    <Button
                      onClick={() => handleDeleteJob(job._id)}
                      sx={{ textTransform: "inherit" }}
                      variant="outlined"
                      color="error"
                    >
                      Remove
                    </Button>
                  </TableCell>
                )}
                {type === "appliedJobs" && (
                  <TableCell align="center">
                    <Button
                      onClick={() => handleCancelApplication(job._id)}
                      sx={{ textTransform: "inherit" }}
                      variant="outlined"
                      color="error"
                    >
                      Cancel
                    </Button>
                  </TableCell>
                )}
                {type === "savedJobs" && (
                  <TableCell align="center">
                    <Button
                      onClick={() => dispatch(removeFromSaveJob(job._id))}
                      sx={{ textTransform: "inherit" }}
                      variant="outlined"
                      color="error"
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
