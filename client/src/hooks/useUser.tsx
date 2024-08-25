import { useGetMyProfile, UserWithProject } from "@/api/user";
import { createContext } from "react";
import React from "react";

type UserContextType = {
  user?: UserWithProject;
  isLoading: boolean;
  isError: boolean;
};

const userContext = createContext<UserContextType | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isError } = useGetMyProfile();
  return (
    <userContext.Provider
      value={{
        user: data,
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
