import { Button, Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import * as React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiLoginCircleFill, RiLogoutCircleFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import navStyles from "../../styles/Navbar.module.scss";

// navbar
const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ mt: 3, px: 2 }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <NavLink
          className={(navInfo) =>
            navInfo.isActive ? navStyles.navSelected : navStyles.navLink
          }
          to="/"
        >
          Home
        </NavLink>

        <Divider />

        <NavLink
          className={(navInfo) =>
            navInfo.isActive ? navStyles.navSelected : navStyles.navLink
          }
          to="/jobs"
        >
          Jobs
        </NavLink>

        <Divider />

        {/* {!user?.email ? ( */}
        <NavLink to="/login">
          <Button
            sx={{
              borderRadius: 8,
              alignItems: "center",
              textTransform: "inherit",
            }}
            variant="contained"
            endIcon={<RiLoginCircleFill />}
          >
            Login
          </Button>
        </NavLink>
        {/* ) : ( */}
        <Box sx={{}}>
          <NavLink
            className={(navInfo) =>
              navInfo.isActive ? navStyles.navSelected : navStyles.navLink
            }
            to="/dashboard"
          >
            Dashboard
          </NavLink>
          <Divider />
          {/* {user?.email && <p className=navStyles.navLink>{user?.displayName}</p>} */}

          {/* {user?.photoURL && (
              <img
                style={{ width: 50, borderRadius: "50%" }}
                src={user.photoURL}
                alt=""
              />
            )} */}
          <Divider />
          <Button
            sx={{
              borderRadius: 8,
              alignItems: "center",
              textTransform: "inherit",
            }}
            variant="contained"
            startIcon={<RiLogoutCircleFill />}
          >
            Log Out
          </Button>
        </Box>
        {/* )} */}

        <Divider />
      </nav>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="" sx={{ bgcolor: "transparent", boxShadow: 0, py: 1 }}>
        <Toolbar>
          <Container>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <img className={navStyles.logo} src={logo} alt="" />
              </Link>

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <nav style={{ display: "flex", alignItems: "center" }}>
                  <NavLink
                    className={(navInfo) =>
                      navInfo.isActive
                        ? navStyles.navSelected
                        : navStyles.navLink
                    }
                    to="/"
                  >
                    Home
                  </NavLink>

                  <NavLink
                    className={(navInfo) =>
                      navInfo.isActive
                        ? navStyles.navSelected
                        : navStyles.navLink
                    }
                    to="/jobs"
                  >
                    Jobs
                  </NavLink>
                  {/* {!user?.email ? ( */}

                  <NavLink to="/login">
                    <Button
                      sx={{
                        borderRadius: 8,
                        alignItems: "center",
                        textTransform: "inherit",
                      }}
                      variant="contained"
                      endIcon={<RiLoginCircleFill />}
                    >
                      Login
                    </Button>
                  </NavLink>
                  {/* ) : ( */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <NavLink
                      className={(navInfo) =>
                        navInfo.isActive
                          ? navStyles.navSelected
                          : navStyles.navLink
                      }
                      to="/dashboard"
                    >
                      Dashboard
                    </NavLink>
                    {/* {user?.email && (
                        <span className=navStyles.navLink>{user?.displayName}</span>
                      )} */}
                    {/* {user?.photoURL && (
                        <img
                          style={{
                            width: 50,
                            borderRadius: "50%",
                            marginRight: 10,
                          }}
                          src={user.photoURL}
                          alt=""
                        />
                      )} */}
                    <Button
                      sx={{
                        borderRadius: 8,
                        alignItems: "center",
                        textTransform: "inherit",
                      }}
                      variant="contained"
                      startIcon={<RiLogoutCircleFill />}
                    >
                      Log Out
                    </Button>
                  </Box>
                  {/* )} */}
                </nav>
              </Box>
            </Box>
          </Container>
          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" }, color: "#16425B" }}
          >
            <AiOutlineMenu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ flexShrink: { sm: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "70%",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
