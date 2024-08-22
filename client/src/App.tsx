import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Board from "./pages/board";
import ProctedRoute from "./components/protected-route";
import Lists from "./pages/lists";
import CreateProject from "./pages/create";
import PublicRoute from "./components/public-route";
import PageNotFound from "./pages/404-page";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ProjectList from "./pages/view-project";
import Teams from "./pages/team";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "board",
          element: (
            <ProctedRoute>
              <Board />
            </ProctedRoute>
          ),
        },
        {
          path: "lists",
          element: (
            <ProctedRoute>
              <Lists />
            </ProctedRoute>
          ),
        },
        {
          path: "team",
          element: (
            <ProctedRoute>
              <Teams />
            </ProctedRoute>
          ),
        },
        {
          path: "projects",
          element: (
            <ProctedRoute>
              <ProjectList />
            </ProctedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProctedRoute>
              <div>Settings</div>
            </ProctedRoute>
          ),
        },
      ],
    },
    {
      path: "/create",
      element: (
        <ProctedRoute>
          <CreateProject />{" "}
        </ProctedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
    {
      path: "/signin",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
