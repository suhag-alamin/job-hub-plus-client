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

const ApplicationTable = ({ applications }) => {
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
                  Candidate Name
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
                  Candidate Email
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
                  Candidate Phone
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
                  Candidate Pre. Job
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
                  Candidate Pre. Company
                </Typography>
              </TableCell>

              <TableCell sx={{ p: 1 }} align="center">
                <Typography
                  sx={{ color: "info.main", fontWeight: 700 }}
                  variant="subtitle1"
                >
                  Resume
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.map((job, index) => (
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
                  {job.jobPosition}
                </TableCell>
                <TableCell sx={{ p: 1 }} align="center">
                  {job.candidateName}
                </TableCell>
                <TableCell sx={{ p: 1 }} align="center">
                  {job.candidateEmail}
                </TableCell>
                <TableCell sx={{ p: 1 }} align="center">
                  {job.phoneNumber || "N/A"}
                </TableCell>
                <TableCell sx={{ p: 1 }} align="center">
                  {job.previousJobTitle || "N/A"}
                </TableCell>
                <TableCell sx={{ p: 1 }} align="center">
                  {job.previousCompany || "N/A"}
                </TableCell>

                <TableCell sx={{ p: 1 }} align="center">
                  {/* open link in a new tab using React Router */}
                  <a
                    href={job.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      sx={{
                        textTransform: "capitalize",
                      }}
                      variant="outlined"
                    >
                      View
                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ApplicationTable;
