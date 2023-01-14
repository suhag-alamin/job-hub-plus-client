import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setJobTypes,
  setSalaryRange,
  togglePostedTime,
  toggleRemote,
} from "../../features/filter/filterSlice";

const JobFilter = () => {
  const [value, setValue] = useState([500, 3000]);
  const [checked, setChecked] = useState(false);
  const employmentTypes = [
    "All",
    "Full-Time",
    "Part-Time",
    "Contract",
    "Internship",
  ];
  const postedTimes = [
    "Any-Time",
    "Last-Day",
    "Last-3-Days",
    "Last-2-Weeks",
    "Last-Month",
  ];

  const dispatch = useDispatch();

  const handleRangeChange = (e, newValue) => {
    setValue(newValue);
    dispatch(setSalaryRange(value));
  };

  const handleRemoteChange = (e) => {
    setChecked(e.target.checked);
    dispatch(toggleRemote());
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap={{ xs: "wrap", md: "inherit" }}
        gap={{ xs: 1, md: 4 }}
      >
        {/* job types  */}
        <FormControl fullWidth>
          <InputLabel>All Job Types</InputLabel>
          <Select
            onChange={(e) =>
              dispatch(setJobTypes(e.target.value.toLowerCase()))
            }
            label="Employment Type"
          >
            {employmentTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* posted time  */}
        <FormControl fullWidth>
          <InputLabel>Posted Any Time</InputLabel>
          <Select
            onChange={(e) =>
              dispatch(togglePostedTime(e.target.value.toLowerCase()))
            }
            label="Employment Type"
          >
            {postedTimes.map((time, index) => (
              <MenuItem key={index} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* salary range  */}
        <Box sx={{ width: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Salary Range
          </Typography>
          <Slider
            defaultValue={value}
            max={100000}
            min={500}
            value={value}
            onChange={handleRangeChange}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* remote  */}

        <Box sx={{ width: 1 }}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleRemoteChange} />}
            label="Work from Home"
          />
        </Box>
      </Stack>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default JobFilter;
