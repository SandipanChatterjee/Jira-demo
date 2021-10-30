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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useStyles } from "./style";
import { CircularProgress } from "@material-ui/core";
import { Loader } from "../shared/loader/Loader";
import { dashboardBackGroundColor } from "../../utils/globalStyles";
import { useSelectorIssues } from "../../utils/useSelectorIssues";
import CreateIssue from "../createIssue/CreateIssue";
import { closeCreateIssue } from "../../actions/createIssue";
const Dashboard = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projectReducer.project);
  const loader = useSelector((state) => state.projectReducer.loading);
  const error = useSelector((state) => state.projectReducer.error);
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const openCreateIssueModal = useSelector(
    (state) => state.createIssueReducer.openCreateIssue
  );
  const classes = useStyles();
  console.log("loader#", loader, project);
  const selector = useSelectorIssues();
  const arr = [
    selector.backlogIssues,
    selector.selectedIssues,
    selector.inprogressIssues,
    selector.completedIssues,
  ].flat(Infinity);

  const modalCloseHandler = () => {
    dispatch(closeCreateIssue());
  };

  useEffect(async () => {
    if (Object.keys(project).length !== 0) {
      dispatch(setIssueTypes(arr));
    }
    if (Object.keys(currentUser).length === 0) {
      dispatch(getCurrentUserData());
    }
  }, []);

  if (loader) {
    return (
      <div className={classes.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div>
      <Header
        name={"Kanban board"}
        title={`Projects / ${project.name} / Kanban Board`}
      />
      <br />
      <div className={classes.container}>
        <Search />
        <Users />
      </div>
      <br />
      <MasterIssue />
      <br />
      <Dialog
        open={openCreateIssueModal}
        onClose={modalCloseHandler}
        fullWidth="true"
        maxWidth="lg"
        scroll="body"
      >
        <DialogContent>
          <CreateIssue />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
