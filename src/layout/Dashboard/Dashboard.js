import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { AiOutlineControl, AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { HiQueueList } from "react-icons/hi2";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { RiLogoutCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import dashStyles from "../../styles/Dashboard.module.scss";
import { MdPlaylistAddCheck } from "react-icons/md";

const drawerWidth = 240;

function Dashboard(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: 1 }}>
      <Toolbar
        sx={{
          py: 1,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 700 }}
            color="primary"
            variant="h4"
            gutterBottom
          >{`${user?.firstName}  ${user?.lastName}`}</Typography>
          {user?.role === "employer" && (
            <Typography color="secondary" variant="subtitle1">
              {user?.roleInCompany}
            </Typography>
          )}
        </Box>
      </Toolbar>
      <Divider />

      <Box sx={{ py: 4, height: "82%" }}>
        <ListItem color="primary">
          <ListItemIcon>
            <MdOutlineDashboard className={dashStyles.dashboardMenuIcon} />
          </ListItemIcon>
          <ListItemText
            as={Link}
            to="/dashboard"
            className={dashStyles.menuItem}
            primary="Dashboard"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AiOutlineHome className={dashStyles.dashboardMenuIcon} />
          </ListItemIcon>
          <ListItemText
            as={Link}
            to="/"
            className={dashStyles.menuItem}
            primary="Home"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <HiQueueList className={dashStyles.dashboardMenuIcon} />
          </ListItemIcon>
          <ListItemText
            as={Link}
            to="/jobs"
            className={dashStyles.menuItem}
            primary="Jobs"
          />
        </ListItem>

        {/* <ListItem>
            <ListItemIcon>
              <AiOutlineSetting className={dashStyles.dashboardMenuIcon} />
            </ListItemIcon>
            <ListItemText
              as={Link}
              to={`/dashboard/makeAdmin`}
              className={dashStyles.menuItem}
              primary="Make Admin"
            />
          </ListItem> */}

        {user?.role === "employer" && (
          <>
            <ListItem>
              <ListItemIcon>
                <AiOutlineControl className={dashStyles.dashboardMenuIcon} />
              </ListItemIcon>
              <ListItemText
                as={Link}
                to={`/dashboard/manage-jobs`}
                className={dashStyles.menuItem}
                primary="Manage Jobs"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <IoAddCircleOutline className={dashStyles.dashboardMenuIcon} />
              </ListItemIcon>
              <ListItemText
                as={Link}
                to={`/dashboard/add-job`}
                className={dashStyles.menuItem}
                primary="Add Job"
              />
            </ListItem>
          </>
        )}
        {user?.role === "candidate" && (
          <>
            <ListItem>
              <ListItemIcon>
                <BsClipboardData className={dashStyles.dashboardMenuIcon} />
              </ListItemIcon>
              <ListItemText
                as={Link}
                to={`/dashboard/applied-jobs`}
                className={dashStyles.menuItem}
                primary="Applied Jobs"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MdPlaylistAddCheck className={dashStyles.dashboardMenuIcon} />
              </ListItemIcon>
              <ListItemText
                as={Link}
                to={`/dashboard/saved-jobs`}
                className={dashStyles.menuItem}
                primary="Saved Jobs"
              />
            </ListItem>
          </>
        )}
      </Box>
      {/* log out  */}
      <Box sx={{ mt: "auto" }}>
        <Button
          fullWidth
          sx={{ borderRadius: 0 }}
          onClick={() => dispatch(logout())}
          variant="contained"
          startIcon={<RiLogoutCircleFill />}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          boxShadow: 0,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <AiOutlineMenu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {user?.role === "employer"
              ? "Employer Dashboard"
              : user?.role === "candidate"
              ? "Job Seeker Dashboard"
              : "Dashboard"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: 2,
          mr: 0,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
