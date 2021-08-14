import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectData } from "../../actions/project";
import { createGuestAccount } from "../../services/GuestAccount";
import Issue from "../issue/Issue";
import Navbar from "../navbar/Navbar";
const Dashboard = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projectReducer.project);
  const loader = useSelector((state) => state.projectReducer.loading);

  console.log("loader#", loader, project);
  useEffect(async () => {
    createGuestAccount();
    dispatch(getProjectData());
  }, []);

  if (loader) {
    return "loader";
  }
  return (
    <div>
      <Issue issues={project.issues} />
    </div>
  );
};

export default Dashboard;
