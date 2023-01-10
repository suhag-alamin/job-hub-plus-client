import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser, toggleIsLoading } from "./features/auth/authSlice";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0B4F6C",
    },
    secondary: {
      main: "#2A9D8F",
    },
    success: {
      main: "#55FFCC",
    },
    error: {
      main: "#FE5F55",
    },
    info: {
      main: "#ffff",
    },
    text: {
      primary: "#1C1018",
      secondary: "#0B4F6C",
    },
    divider: "#55FFCC",
  },
  typography: {
    fontFamily: ["Ralway", "Roboto"].join(","),
  },
});

function App() {
  // set user or persist user
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user?.email));
      } else {
        dispatch(toggleIsLoading());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Toaster />
          <RouterProvider router={routes} />
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
