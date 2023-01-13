import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard/Dashboard";
import Main from "../layout/Main/Main";
import AddJob from "../pages/Dashboard/AddJob";
import Home from "../pages/Main/Home/Home";
import Jobs from "../pages/Job/Jobs";
import Login from "../pages/Main/Login";
import NotFound from "../pages/Main/NotFound";
import Register from "../pages/Main/Register/Register";
import Signup from "../pages/Main/Signup";
import PrivateRoute from "../utils/PrivateRoute";
import JobDetailsPage from "../pages/Job/JobDetailsPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/job-details/:id",
        element: <JobDetailsPage />,
      },

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
        element: (
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        ),
      },
      {
        path: "/register/:type",
        element: (
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        ),
      },
    ],
  },
  // dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "add-job",
        element: <AddJob />,
      },
    ],
  },
  // 404 page
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default routes;
