import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks";

export function AuthRoute(props) {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return <Route {...props} />;
}
