import { API } from "@/utils/api";
import { isAxiosError } from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<boolean | null>(null); 

  const getUserInfo = async () => {
    try {
      const resp = await API.get("/api/auth/me", {
        withCredentials: true,
      });
      setAuth(resp.data.status);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }
      setAuth(false);
    }
  };

  useLayoutEffect(() => {
    getUserInfo();
  }, []);

  if (auth === null) {
    return <div>Loading...</div>; 
  }

  if (auth) {
    return <Navigate to={"/board"} />;
  }
  return <Fragment>{children}</Fragment>;
};

export default PublicRoute;
