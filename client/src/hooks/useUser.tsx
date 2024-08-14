import { getMyProfile } from "@/components/protected-route";
import type { User } from "@/schema/schema";
import { useQuery } from "@tanstack/react-query";
import { createContext, useLayoutEffect } from "react";
import React from "react";

interface UserWithProjectId extends User {
  projectId: string;
}
type UserContextType = {
  user: UserWithProjectId | null;
  setUser: React.Dispatch<React.SetStateAction<UserWithProjectId | null>>;
};

const userContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserWithProjectId | null>(null);
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getMyProfile,
  });
  useLayoutEffect(() => {
    if (data) {
      setUser(data.data.user);
    }
  }, []);
  return (
    <userContext.Provider
      value={{
        setUser,
        user,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
