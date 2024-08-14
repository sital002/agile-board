import type { User } from "@/schema/schema";
import { createContext } from "react";
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
