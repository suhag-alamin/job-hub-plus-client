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

const JobFilter = () => {
  const [value, setValue] = useState([500, 3000]);
  const [checked, setChecked] = useState(false);
  const employmentTypes = ["Full-Time", "Part-Time", "Contract", "Internship"];
  const postedTimes = ["Last Day", "Last 3 Days", "Last 2 Weeks", "Last Month"];

  const handleRangeChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleRemoteChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap={{ xs: "wrap", md: "inherit" }}
        gap={4}
      >
        {/* job types  */}
        <FormControl fullWidth>
          <InputLabel>All Job Types</InputLabel>
          <Select label="Employment Type">
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
          <Select label="Employment Type">
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
