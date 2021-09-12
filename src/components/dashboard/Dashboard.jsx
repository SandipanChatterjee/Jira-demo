import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectData } from "../../actions/project";
import { createGuestAccount } from "../../services/GuestAccount";
import { setIssueTypes } from "../../actions/issues";
import { getCurrentUserData } from "../../actions/users";
import MasterIssue from "./issue/MasterIssue";
import Header from "../shared/Header";
import Search from "./search/Search";
import Users from "./users/Users";
import { useStyles } from "./style";
import { CircularProgress } from "@material-ui/core";
import { Loader } from "../shared/loader/Loader";
import { dashboardBackGroundColor } from "../../utils/globalStyles";
const Dashboard = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projectReducer.project);
  const loader = useSelector((state) => state.projectReducer.loading);
  const error = useSelector((state) => state.projectReducer.error);
  const ref = useRef(true);
  const classes = useStyles();
  console.log("loader#", loader, project);

  useEffect(async () => {
    if (Object.keys(project).length == 0) {
      dispatch(getProjectData());
      dispatch(getCurrentUserData());
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    if (Object.keys(project).length > 0) {
      dispatch(setIssueTypes(project.issues));
    }
  }, [project]);

  if (loader) {
    return <Loader />;
  }

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div
      style={{
        display: "block",
        width: "auto",
        backgroundColor: dashboardBackGroundColor,
        height: "100vh",
        padding: "1rem",
      }}
    >
      <Header
        name={"Kanban board"}
        title={"Projects / singularity 1.0 vv2 / Kanban Board"}
      />
      <br />
      <div className={classes.container}>
        <Search />
        <Users />
      </div>
      <br />
      <MasterIssue />
    </div>
  );
};

export default Dashboard;
