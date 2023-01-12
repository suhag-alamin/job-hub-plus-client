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

  const handleRangeChange = (newValue) => {
    setValue(newValue);
  };

  const handleRemoteChange = (event) => {
    setChecked(event.target.checked);
  };
  console.log(value);
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
            <MenuItem value="full-time">Full-Time</MenuItem>
            <MenuItem value="part-time">Part-Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="internship">Internship</MenuItem>
          </Select>
        </FormControl>
        {/* posted time  */}
        <FormControl fullWidth>
          <InputLabel>Posted Any Time</InputLabel>
          <Select label="Employment Type">
            <MenuItem value="full-time">Last Day</MenuItem>
            <MenuItem value="part-time">Last 3 Days</MenuItem>
            <MenuItem value="contract">Last 2 Weeks</MenuItem>
            <MenuItem value="internship">Last Month</MenuItem>
          </Select>
        </FormControl>
        {/* salary range  */}
        <Box sx={{ width: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Salary Range
          </Typography>
          <Slider
            defaultValue={value}
            max={10000}
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
