import { Button } from "@mui/material";

const Badge = ({ children }) => {
  return (
    <div>
      <Button sx={{ textTransform: "inherit" }} variant="outlined">
        {children}
      </Button>
    </div>
  );
};

export default Badge;
