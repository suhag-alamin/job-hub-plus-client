import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostJobMutation } from "../../features/job/jobApi";

const AddJob = () => {
  const { companyName } = useSelector((state) => state.auth.user);
  const [postJob, { isLoading, isError, error, isSuccess }] =
    usePostJobMutation();

  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      companyName,
    },
  });
  const navigate = useNavigate();

  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({ control, name: "skills" });

  const {
    fields: responsibilityFields,
    append: responsibilityAppend,
    remove: responsibilityRemove,
  } = useFieldArray({ control, name: "responsibilities" });

  const {
    fields: requirementFields,
    append: requirementAppend,
    remove: requirementRemove,
  } = useFieldArray({ control, name: "requirements" });

  const onSubmit = (data) => {
    postJob(data);
  };

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toast.success("Job posted successfully");
      navigate("/dashboard");
    }
    if (!isLoading && isError) {
      toast.error(error.status);
    }
  }, [isLoading, isError, error, isSuccess]);

  return (
    <>
      <Container>
        <Box
          sx={{
            py: 3,
            px: 4,
            boxShadow: 1,
            borderRadius: 2,
          }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              sx={{ fontSize: { xs: 24, md: 30 }, textAlign: "center", my: 2 }}
              color="secondary"
              variant="h3"
            >
              Add a new Position
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Position"
                {...register("position")}
              />
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Company Name"
                {...register("companyName")}
              />
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Experience"
                {...register("experience")}
              />
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label=" Work Level"
                {...register("workLevel")}
              />
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Employment Type"
                {...register("employmentType")}
              />
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Salary Range"
                {...register("salaryRange")}
              />
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Location"
                {...register("location")}
              />
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                multiline
                fullWidth
                type="text"
                variant="filled"
                label="Overview"
                {...register("overview")}
              />
            </Stack>
            {/* skills  */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1">Skills</Typography>
              <Box>
                {skillFields.map((item, index) => {
                  return (
                    <Stack
                      sx={{ mb: 2 }}
                      key={item.key}
                      direction="row"
                      gap={2}
                    >
                      <TextField
                        fullWidth
                        type="text"
                        variant="filled"
                        label="Skill"
                        {...register(`skills[${index}]`)}
                      />
                      <Button
                        onClick={() => skillRemove(index)}
                        sx={{ fontSize: 30 }}
                        color="error"
                        variant="text"
                      >
                        <TiDelete />
                      </Button>
                    </Stack>
                  );
                })}
              </Box>

              <Button
                onClick={() => skillAppend("")}
                sx={{ textTransform: "inherit", borderRadius: 8, my: 1 }}
                variant="outlined"
              >
                Add Skill
              </Button>
            </Box>
            {/* Responsibilities  */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1">Responsibilities</Typography>
              <Box>
                {responsibilityFields.map((item, index) => {
                  return (
                    <Stack
                      sx={{ mb: 2 }}
                      key={item.key}
                      direction="row"
                      gap={2}
                    >
                      <TextField
                        fullWidth
                        type="text"
                        variant="filled"
                        label="Responsibility"
                        {...register(`responsibilities[${index}]`)}
                      />
                      <Button
                        onClick={() => responsibilityRemove(index)}
                        sx={{ fontSize: 30 }}
                        color="error"
                        variant="text"
                      >
                        <TiDelete />
                      </Button>
                    </Stack>
                  );
                })}
              </Box>

              <Button
                onClick={() => responsibilityAppend("")}
                sx={{ textTransform: "inherit", borderRadius: 8, my: 1 }}
                variant="outlined"
              >
                Add Responsibility
              </Button>
            </Box>
            {/* Requirements  */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1">Requirements</Typography>
              <Box>
                {requirementFields.map((item, index) => {
                  return (
                    <Stack
                      sx={{ mb: 2 }}
                      key={item.key}
                      direction="row"
                      gap={2}
                    >
                      <TextField
                        fullWidth
                        type="text"
                        variant="filled"
                        label="Requirement"
                        {...register(`requirements[${index}]`)}
                      />
                      <Button
                        onClick={() => requirementRemove(index)}
                        sx={{ fontSize: 30 }}
                        color="error"
                        variant="text"
                      >
                        <TiDelete />
                      </Button>
                    </Stack>
                  );
                })}
              </Box>

              <Button
                onClick={() => requirementAppend("")}
                sx={{ textTransform: "inherit", borderRadius: 8, my: 1 }}
                variant="outlined"
              >
                Add Requirement
              </Button>
            </Box>

            <Box sx={{ my: 3 }}>
              <Button
                sx={{ textTransform: "inherit" }}
                type="submit"
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size="20px" color="info" />
                ) : (
                  " Add Position"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default AddJob;
