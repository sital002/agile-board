import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Signup from "./pages/signup";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
