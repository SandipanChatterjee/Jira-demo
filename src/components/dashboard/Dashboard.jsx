import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectData } from "../../actions/project";
import { createGuestAccount } from "../../services/GuestAccount";
import { setIssueTypes } from "../../actions/issues";
import MasterIssue from "../issue/MasterIssue";
const Dashboard = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projectReducer.project);
  const loader = useSelector((state) => state.projectReducer.loading);
  const ref = useRef(true);
  console.log("loader#", loader, project);
  useEffect(async () => {
    if (Object.keys(project).length == 0) {
      createGuestAccount();
      dispatch(getProjectData());
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    dispatch(setIssueTypes(project.issues));
  }, [project]);

  if (loader) {
    return "loader";
  }
  return (
    <div>
      <MasterIssue />
    </div>
  );
};

export default Dashboard;
