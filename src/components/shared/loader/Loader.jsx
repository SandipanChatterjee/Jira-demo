import React from "react";
import { CircularProgress } from "@material-ui/core";
import "./style.css";
export const Loader = ({ size = 150 }) => {
  return <CircularProgress className="container" size={size} />;
};
