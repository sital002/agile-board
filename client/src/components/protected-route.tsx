import { API } from "@/utils/api";
import { isAxiosError } from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<boolean | null>(null); 

  const checkAuth = async () => {
    try {
      const response = await API.get("/api/auth/me", {
        withCredentials: true,
      });
      setAuth(response.data.status);
    } catch (err) {
      if (isAxiosError(err)) {
        console.log(err.response?.data);
      }
      console.log(err);
      setAuth(false);
    }
  };

  useLayoutEffect(() => {
    checkAuth();
  }, []);

  if (auth === null) {
    return <div>Loading...</div>; 
  }

  if (!auth) {
    return <Navigate to={"/signin"} />;
  }
  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
