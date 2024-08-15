import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user && !isLoading && !isError) {
    return <Navigate to={"/board"} replace={true} />;
  }
  return <Fragment>{children}</Fragment>;
};

export default PublicRoute;
