import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectData } from "../../actions/project";
import { createGuestAccount } from "../../services/GuestAccount";
import { setIssueTypes } from "../../actions/issues";
import MasterIssue from "../issue/MasterIssue";
import Header from "../shared/Header";
import Search from "../search/Search";
const Dashboard = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projectReducer.project);
  const loader = useSelector((state) => state.projectReducer.loading);
  const ref = useRef(true);
  const [searchData, setSearchedData] = useState([]);
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

  const handleSearch = (data) => {
    console.log("data###########", data);
    setSearchedData(data);
  };

  if (loader) {
    return "loader";
  }
  return (
    <div>
      <Header
        name={"Kanban board"}
        title={"Projects / singularity 1.0 vv2 / Kanban Board"}
      />
      <Search handleSearch={handleSearch} />
      <MasterIssue searchedData={searchData} />
    </div>
  );
};

export default Dashboard;
