import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { API } from "@/utils/api";
import { useUser } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  async function handleLogout() {
    try {
      const resp = await API.get("/api/auth/logout", {
        withCredentials: true,
      });
      if (resp) {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
  }

  return (
    <header className="flex justify-between border-b-2 p-4">
      <div>
        <Link to={"/board"} className="text-lg font-bold">
          Agile Board
        </Link>
      </div>
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <ModeToggle />
        <Bell size={20} />
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Link
              to={"/signin"}
              className="rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground"
            >
              Signin
            </Link>
            <Link
              to={"/signup"}
              className="rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
