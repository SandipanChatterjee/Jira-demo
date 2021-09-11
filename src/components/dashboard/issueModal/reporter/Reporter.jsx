import React, { useEffect, Fragment } from "react";
import {
  setSelectedReporter,
  setShowReporterList,
  updateIssueListHandler,
} from "../../../../actions/issueModal/reporter";
import { TextField, Avatar, Button } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { useStyles } from "./reporterStyle";
import { useDispatch, useSelector } from "react-redux";

const Reporter = ({ issue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.projectReducer.project.users);
  const reportedId = useSelector((state) => state.reporterReducer.reporterId);
  const reporterData = useSelector(
    (state) => state.reporterReducer.reporterData
  );

  const showReporterList = useSelector(
    (state) => state.reporterReducer.showReporterList
  );
  const showReporterListHandler = () => {
    dispatch(setShowReporterList(true));
  };

  const closeReporterListHandler = () => {
    dispatch(setShowReporterList(false));
  };

  const changeReporterHandler = (event, newValue) => {
    dispatch(setSelectedReporter(newValue.id, users));
    dispatch(updateIssueListHandler({ reporterId: newValue.id }, issue.id));
    dispatch(setShowReporterList(false));
  };

  useEffect(() => {
    if (users.length > 0) {
      dispatch(setSelectedReporter(issue.reporterId, users));
    }
  }, []);

  const usersOption = users.filter((el) => el.id !== reportedId);

  return (
    <div>
      <p>REPORTER</p>
      <Button
        variant="contained"
        onClick={showReporterListHandler}
        className={classes.parentContainer}
      >
        <Avatar src={reporterData.avatarUrl} className={classes.avatarSize} />
        <span className={classes.text}>{reporterData.name}</span>
      </Button>
      {showReporterList ? (
        <div onBlur={closeReporterListHandler}>
          <Autocomplete
            freeSolo
            onChange={(event, newValue) =>
              changeReporterHandler(event, newValue)
            }
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
                size="small"
              />
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Reporter;
