import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Board from "./pages/board";
import CreateProject from "./pages/create";
import Lists from "./pages/lists";
import Signup from "./pages/signup";
import Login from "./pages/login";
// import Signup from "./pages/signup";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
      errorElement: <div>Hello Error</div>,
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
