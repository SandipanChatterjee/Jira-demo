import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@material-ui/core";
import { useStyles } from "./style";
import { useSelectorIssues } from "../../../utils/useSelectorIssues";
import { convertToArrayOfObjects } from "../../../utils/utils";
import { searchedDataHandler } from "../../../actions/search";
import { setUsers } from "../../../actions/users";
import { useSelector, useDispatch } from "react-redux";

const Users = () => {
  const project = useSelector((state) => state.projectReducer.project);
  const selector = useSelectorIssues();
  const currentUsers = useSelector((state) => state.usersReducer.users);
  const dispatch = useDispatch();

  const ref = useRef(true);
  const classes = useStyles();

  const issueList = [
    selector.backlogIssues,
    selector.selectedIssues,
    selector.inprogressIssues,
    selector.completedIssues,
  ].flat(Infinity);

  console.log("arr##", issueList);

  const handleRemove = (userId) => {
    console.log("handleRemove");
    const users = currentUsers.filter((user) => user.id !== userId);
    dispatch(setUsers(users));
  };

  const handleAdd = (userId) => {
    console.log("handleAdd");
    const currentUser = project.users.filter((user) => user.id === userId);
    const users = [...currentUsers, ...currentUser];
    dispatch(setUsers(users));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    console.log(currentUsers, issueList);
    const filterData = issueList.filter((issue) =>
      currentUsers.find((user) => issue.userIds.includes(user.id))
    );
    const data = filterData.length > 0 ? filterData : issueList;
    const convertedData = convertToArrayOfObjects(data);
    dispatch(searchedDataHandler(convertedData));
  }, [currentUsers]);

  useEffect(() => {
    return () => {
      dispatch(setUsers([]));
    };
  }, []);

  return (
    <div className={classes.root}>
      {project.users.map((user, index) => {
        let userFound = currentUsers.find((currentUser) => {
          if (currentUser.id === user.id) {
            return currentUser;
          }
        });
        console.log(userFound, currentUsers);
        return (
          <Avatar
            key={index}
            alt={user.name}
            src={user.avatarUrl}
            className={userFound ? classes.active : classes.inactive}
            onClick={() =>
              userFound ? handleRemove(user.id) : handleAdd(user.id)
            }
          />
        );
      })}
    </div>
  );
};

export default Users;
