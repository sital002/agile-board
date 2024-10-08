import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex gap-2">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
