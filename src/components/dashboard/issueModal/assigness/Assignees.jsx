import React, { useEffect, useRef, Fragment } from "react";
import { TextField, Avatar, Button } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { Add, Clear } from "@material-ui/icons";
import {
  setShowUsersList,
  setAssignedUsers,
  setDeleteUsers,
  resetUsers,
} from "../../../../actions/issueModal/assignees";
import { useStyles } from "./assigneesStyle";
import { useSelector, useDispatch } from "react-redux";
import { updateIssueList } from "../../../../services/updateIssueList";

const Assignees = ({ issue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.projectReducer.project.users);
  const showUsersList = useSelector(
    (state) => state.assigneesReducer.showUsersList
  );
  const assignedUsersId = useSelector(
    (state) => state.assigneesReducer.assignedUsersId
  );
  const assignedUsers = useSelector(
    (state) => state.assigneesReducer.assignedUsers
  );

  const usersRef = useRef(true);

  const showUsersListHandler = () => {
    dispatch(setShowUsersList(true));
  };
  const changeUsersHandler = (e, val) => {
    if (assignedUsersId.includes(val.id)) {
      dispatch(setShowUsersList(false));
      return;
    }
    console.log("changeUsersHandler##");
    dispatch(setAssignedUsers(val));
    dispatch(setShowUsersList(false));
  };
  const deleteUserHandler = (userId) => {
    console.log("userId", userId);
    dispatch(setDeleteUsers(userId));
    dispatch(setShowUsersList(true));
  };

  const closeUsersListHandler = () => {
    dispatch(setShowUsersList(false));
  };

  useEffect(() => {
    if (usersRef.current) {
      usersRef.current = false;
      return;
    }
    const payload = {
      userIds: [...assignedUsersId],
      users: [...assignedUsers],
    };
    updateIssueList(payload, issue.id);
  }, [assignedUsersId]);

  useEffect(() => {
    if (issue.userIds.length > 0) {
      issue.users.map((user) => dispatch(setAssignedUsers(user)));
    }

    return () => {
      dispatch(resetUsers());
    };
  }, []);
  const usersOption = users.filter((el) => !assignedUsersId.includes(el.id));
  return (
    // issue.userIds.length == 0 && !showUsersList
    <div>
      <p>ASSIGNEES</p>
      {assignedUsers.length == 0 ? (
        <Button variant="contained" onClick={showUsersListHandler}>
          <p>Unassigned</p>
        </Button>
      ) : (
        <div>
          {assignedUsers.map((user) => {
            return (
              <Button
                className={classes.parentContainer}
                variant="contained"
                onClick={() => deleteUserHandler(user.id)}
              >
                <Avatar src={user.avatarUrl} className={classes.avatarSize} />
                <span className={classes.text}>{user.name}</span>
                <Clear fontSize="small" />
              </Button>
            );
          })}
          <Button
            color="primary"
            className={classes.addMoreButton}
            onClick={showUsersListHandler}
          >
            <div className={classes.container}>
              <Add fontSize="small" className={classes.text} />
              <span>Add more</span>
            </div>
          </Button>
        </div>
      )}
      {showUsersList ? (
        <div onBlur={closeUsersListHandler}>
          <Autocomplete
            freeSolo
            onChange={(event, newValue) => changeUsersHandler(event, newValue)}
            options={usersOption}
            getOptionLabel={(option) => option.name}
            renderOption={(option) => {
              return (
                <Fragment>
                  <Avatar
                    src={option.avatarUrl}
                    className={classes.avatarSize}
                  />
                  <span className={classes.text}>{option.name}</span>
                </Fragment>
              );
            }}
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                variant="outlined"
                autoFocus
              />
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Assignees;
