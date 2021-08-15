import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectData } from "../../actions/project";
import { createGuestAccount } from "../../services/GuestAccount";
import MasterIssue from "../issue/MasterIssue";
import Navbar from "../navbar/Navbar";
const Dashboard = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projectReducer.project);
  const loader = useSelector((state) => state.projectReducer.loading);

  console.log("loader#", loader, project);
  useEffect(async () => {
    if (Object.keys(project).length == 0) {
      createGuestAccount();
      dispatch(getProjectData());
    }
  }, []);

  if (loader) {
    return "loader";
  }
  return (
    <div>
      <MasterIssue issues={project.issues} />
    </div>
  );
};

export default Dashboard;
