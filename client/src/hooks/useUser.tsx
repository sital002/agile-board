import type { Project, User } from "@/schema/schema";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import React from "react";

interface UserWithProject extends User {
  currentProject: Project;
}
type UserContextType = {
  user?: UserWithProject;
  isLoading: boolean;
  isError: boolean;
};

const userContext = createContext<UserContextType | null>(null);

async function getMyProfile() {
  return API.get("/api/auth/me");
}
function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getMyProfile,
  });
  return (
    <userContext.Provider
      value={{
        user: data?.data?.user,
        isError,
        isLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

function useUser() {
  const context = React.useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
