import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Board from "./pages/board";
import CreateProject from "./pages/create";
import Lists from "./pages/lists";
import Signup from "./pages/signup";
import Login from "./pages/login";
import PageNotFound from "./pages/404-page";
// import Signup from "./pages/signup";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "board",
          element: <Board />,
        },
        {
          path: "lists",
          element: <Lists />,
        },
      ],
    },
    {
      path: "/create",
      element: <CreateProject />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
