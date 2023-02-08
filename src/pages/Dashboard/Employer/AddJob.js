import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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
import { usePostJobMutation } from "../../../features/job/jobApi";

const AddJob = () => {
  const { companyName, employeeRange, email, companyWebsite } = useSelector(
    (state) => state.auth.user
  );
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
    data.companyWebsite = companyWebsite;
    data.employeeRange = employeeRange;
    data.employerEmail = email;
    data.createdDate = new Date().toISOString();
    if (parseInt(data.salaryRangeFrom) < parseInt(data.salaryRangeTo)) {
      data.salaryRange = [
        parseInt(data.salaryRangeFrom),
        parseInt(data.salaryRangeTo),
      ];

      delete data.salaryRangeFrom;
      delete data.salaryRangeTo;
    } else {
      toast.error("Salary range is not valid", { id: "job-post" });
      return;
    }

    postJob(data);
  };

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toast.success("Job posted successfully", { id: "job-post" });
      navigate("/dashboard");
    }
    if (!isLoading && isError) {
      toast.error(error.status);
    }
  }, [isLoading, isError, error, isSuccess, navigate]);

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
                disabled
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
                helperText="e.g. 2 years"
              />
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Work Level"
                {...register("workLevel")}
                helperText="e.g. Junior"
              />
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <FormControl fullWidth>
                <InputLabel>Employment Type</InputLabel>
                <Select
                  variant="filled"
                  label="Employment Type"
                  {...register("employmentType")}
                >
                  <MenuItem value="full-time">Full-Time</MenuItem>
                  <MenuItem value="part-time">Part-Time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <Stack direction="row" gap={2}>
                  <TextField
                    sx={{ width: 1 / 2 }}
                    type="number"
                    variant="filled"
                    label="Salary Range From $"
                    helperText="Salary Range From $1000"
                    {...register("salaryRangeFrom")}
                  />
                  <TextField
                    sx={{ width: 1 / 2 }}
                    type="number"
                    variant="filled"
                    label="Salary Range To $"
                    helperText="Salary Range To $5000"
                    {...register("salaryRangeTo")}
                  />
                </Stack>
              </FormControl>
            </Stack>
            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Location"
                {...register("location")}
                helperText="e.g. New York, USA"
              />
              <FormControl fullWidth>
                <FormLabel>Work Type</FormLabel>
                <RadioGroup row>
                  <FormControlLabel
                    value="onSite"
                    control={<Radio />}
                    label="On Site"
                    {...register("workType")}
                  />
                  <FormControlLabel
                    value="remote"
                    control={<Radio />}
                    label="Remote"
                    {...register("workType")}
                  />
                </RadioGroup>
              </FormControl>
            </Stack>

            <Stack sx={{ my: 2 }} direction="row" gap={4}>
              <TextField
                multiline
                fullWidth
                type="text"
                variant="filled"
                label="Overview"
                {...register("overview")}
                helperText="e.g. We are looking for a talented and experienced..."
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
