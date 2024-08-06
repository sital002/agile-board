import { API } from "@/utils/api";
import { isAxiosError } from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const ProctedRoute = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<boolean>();

  const checkAuth = async () => {
    try {
      const response = await API.get("/auth/me");
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
  }, [auth]);

  if (!auth) {
    return <Navigate to={"/signin"} />;
  }
  return <Fragment>{children}</Fragment>;
};

export default ProctedRoute;
