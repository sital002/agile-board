import { useUser } from "@/hooks/useUser";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export async function getMyProfile() {
  return API.get("/api/auth/me");
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useUser();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMyProfile,
  });

  useLayoutEffect(() => {
    if (data) {
      // console.log(data.data.user);
      setUser(data.data.user);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    return <Navigate to={"/signin"} />;
  }
  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
