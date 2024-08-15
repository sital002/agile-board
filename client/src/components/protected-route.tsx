import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    console.log("Verifying user");
    return <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    console.log("Redirecting to signin");
    return <Navigate to={"/signin"} />;
  }
  console.log("user is", user, "loading is", isLoading, "error is", isError);
  console.log("rednering children");
  return children;
};

export default ProtectedRoute;
