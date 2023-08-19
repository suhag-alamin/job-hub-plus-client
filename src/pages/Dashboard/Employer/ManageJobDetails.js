import { Box, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ViewApplication from "../../../components/Dashboard/Employer/ViewApplication";
import { useGetJobByIdQuery } from "../../../features/job/jobApi";

const ManageJobDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetJobByIdQuery(id);

  const job = data?.data;
  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box sx={{ mb: 6 }}>
          <Typography
            sx={{
              fontSize: { xs: 24, md: 30 },
              textAlign: "center",
              my: 2,
            }}
            color="secondary"
            variant="h3"
          >
            Manage Job - {job?.position}
          </Typography>
          <ViewApplication job={job} />
        </Box>
      )}
    </div>
  );
};

export default ManageJobDetails;
