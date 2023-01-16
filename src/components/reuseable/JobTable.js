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
import { useCancelAppliedJobMutation } from "../../features/job/jobApi";

const JobTable = ({ jobs }) => {
  const [cancelApplication, { isLoading, isError, isSuccess }] =
    useCancelAppliedJobMutation();

  const handleCancelApplication = (id) => {
    cancelApplication(id);
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
              <TableCell sx={{ p: 1 }} align="center">
                <Typography
                  sx={{ color: "info.main", fontWeight: 700 }}
                  variant="subtitle1"
                >
                  Status
                </Typography>
              </TableCell>
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
                key={job.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, p: 1 }}
              >
                <TableCell sx={{ p: 1 }} component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell sx={{ p: 1 }} align="center">
                  {job.jobPosition}
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
                <TableCell sx={{ p: 1 }} align="center">
                  {job.status}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleCancelApplication(job._id)}
                    sx={{ textTransform: "inherit" }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default JobTable;
