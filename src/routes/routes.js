import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Main/Home/Home";
import Login from "../pages/Main/Login";
import NotFound from "../pages/Main/NotFound";
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
    ],
  },
  // 404 page
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default routes;
