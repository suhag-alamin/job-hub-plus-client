import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard/Dashboard";
import Main from "../layout/Main/Main";
import Home from "../pages/Main/Home/Home";
import Login from "../pages/Main/Login";
import NotFound from "../pages/Main/NotFound";
import Register from "../pages/Main/Register/Register";
import Signup from "../pages/Main/Signup";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  // dashboard
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [],
  },
  // 404 page
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default routes;
