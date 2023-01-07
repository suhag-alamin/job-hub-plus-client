import { Button } from "@mui/material";

const Badge = ({ children, className }) => {
  return (
    <div>
      <Button
        className={`${className}`}
        sx={{ textTransform: "inherit" }}
        variant="outlined"
      >
        {children}
      </Button>
    </div>
  );
};

export default Badge;
