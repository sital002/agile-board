import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    return <Navigate to={"/signin"} />;
  }
  return children;
};

export default ProtectedRoute;
