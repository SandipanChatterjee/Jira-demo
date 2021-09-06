import React, { useEffect } from "react";
import {
  setSelectedReporter,
  setShowReporterList,
  updateIssueListHandler,
} from "../../../../actions/reporter";
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
    dispatch(setSelectedReporter(newValue.id, newValue));
    dispatch(updateIssueListHandler({ reporterId: newValue.id }, issue.id));
    dispatch(setShowReporterList(false));
  };

  useEffect(() => {
    const reporter = users.find((el) => el.id == issue.reporterId);
    dispatch(setSelectedReporter(issue.reporterId, reporter));
  }, []);

  const usersOption = users.filter((el) => el.id !== reportedId);

  return (
    <div>
      <p>REPORTER</p>
      <Button variant="contained" onClick={showReporterListHandler}>
        <Avatar src={reporterData.avatarUrl} sizes="10px" />
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
            clearOnBlur={true}
            clearOnEscape={true}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                margin="normal"
                variant="outlined"
              />
            )}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Reporter;
