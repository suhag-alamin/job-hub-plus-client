import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard/Dashboard";
import Main from "../layout/Main/Main";
import Apply from "../pages/Apply";
import AppliedJobs from "../pages/Dashboard/Candidate/AppliedJobs";
import SavedJobs from "../pages/Dashboard/Candidate/SavedJobs";
import AddJob from "../pages/Dashboard/Employer/AddJob";
import ManageJobDetails from "../pages/Dashboard/Employer/ManageJobDetails";
import ManageJobs from "../pages/Dashboard/Employer/ManageJobs";
import JobDetailsPage from "../pages/Job/JobDetailsPage";
import Jobs from "../pages/Job/Jobs";
import Home from "../pages/Main/Home/Home";
import Login from "../pages/Main/Login";
import NotFound from "../pages/Main/NotFound";
import Register from "../pages/Main/Register/Register";
import Signup from "../pages/Main/Signup";
import EmployerRoute from "../utils/EmployerRoute";
import MainDashboard from "../utils/MainDashboard";
import PrivateRoute from "../utils/PrivateRoute";

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
        path: "/apply/:jobId",
        element: (
          <PrivateRoute>
            <Apply />
          </PrivateRoute>
        ),
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
      { path: "/dashboard", element: <MainDashboard /> },
      {
        path: "add-job",
        element: (
          <EmployerRoute>
            <AddJob />
          </EmployerRoute>
        ),
      },
      {
        path: "manage-jobs",
        element: (
          <EmployerRoute>
            <ManageJobs />
          </EmployerRoute>
        ),
      },
      {
        path: "manage-jobs/:id",
        element: (
          <EmployerRoute>
            <ManageJobDetails />
          </EmployerRoute>
        ),
      },
      {
        path: "applied-jobs",
        element: <AppliedJobs />,
      },
      {
        path: "saved-jobs",
        element: <SavedJobs />,
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
