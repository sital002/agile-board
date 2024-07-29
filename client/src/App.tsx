import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Board from "./pages/board";
import CreateProject from "./pages/create";
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
      ],
    },
    {
      path: "/create",
      element: <CreateProject />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
