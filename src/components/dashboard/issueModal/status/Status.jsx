import React, { useEffect, useState, useRef } from "react";
import { Button, TextField } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { issueStatus } from "../../../../utils/utils";
import {
  setIssueStatusDropDown,
  setIssueStatus,
  updateIssueStatus,
} from "../../../../actions/issueModal/issueStatus";
import {
  backlog,
  completed,
  getCurrentIssue,
  inprogress,
  selected,
} from "../../../../actions/issues";
import { useStyles } from "./statusStyle";
import { useSelector, useDispatch } from "react-redux";
import { useSelectorIssues } from "../../../../utils/useSelectorIssues";

let issueStatusList = Object.keys(issueStatus).map((el) => el);
let issueStatusFilteredList = [];
const filter = createFilterOptions();
let modifiedIssues = [];
let response;
const usePreviousStatus = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const usePreviousIssue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = { ...value };
  });
  return ref.current;
};

const Status = ({ issue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showIssueStatusDropdown = useSelector(
    (state) => state.issueStatusReducer.showIssueStatusDropdown
  );
  const selectedIssueStatus = useSelector(
    (state) => state.issueStatusReducer.selectedIssueStatus
  );
  const updatedIssue = useSelector(
    (state) => state.issueStatusReducer.updatedIssue
  );

  const selectorIssue = useSelectorIssues();
  const prevIssueStatus = usePreviousStatus(
    selectedIssueStatus || issue.status
  );
  const prevUpdateIssue = usePreviousIssue(updatedIssue || issue);

  const updateRef = useRef(true);

  const showDropDownHandler = () => {
    dispatch(setIssueStatusDropDown(true));
  };

  const modifyIssueHandler = (issueEl, updatedIssue) => {
    const issuesCopy = JSON.parse(JSON.stringify(issueEl));
    console.log(
      "modifyIssueHandler#",
      issuesCopy,
      updatedIssue,
      selectedIssueStatus
    );
    issuesCopy.push(updatedIssue);
    console.log("modifyIssueHandler#issueCopy", issuesCopy);
    return issuesCopy;
  };

  const deleteIssue = (issueEl) => {
    const issuesCopy = JSON.parse(JSON.stringify(issueEl));
    console.log("issueCopy##", issuesCopy);
    const id = updatedIssue.id || issue.id;
    const filterdIssues = issuesCopy.filter((el) => el.id !== id);

    return filterdIssues;
  };

  const changeIssueStatusHandler = (event, currentIssueStatus) => {
    console.log("changeIssueStatusHandler###", issueStatus, currentIssueStatus);
    dispatch(setIssueStatus(currentIssueStatus));
    dispatch(setIssueStatusDropDown(false));
    dispatch(updateIssueStatus({ status: currentIssueStatus }, issue.id));

    issueStatusFilteredList = issueStatusList.filter(
      (issueStatusEl) => issueStatusEl !== currentIssueStatus
    );
  };

  const closeIssueStatusHandler = () => {
    dispatch(setIssueStatusDropDown(false));
  };

  useEffect(() => {
    if (!prevIssueStatus || prevIssueStatus === selectedIssueStatus) {
      return;
    }
    console.log("prevIssueStat#", prevIssueStatus, selectedIssueStatus);

    let filteredList = [];
    if (prevIssueStatus === issueStatus.backlog) {
      console.log("backlogIssues#", selectorIssue.backlogIssues);
      filteredList = deleteIssue(selectorIssue.backlogIssues);
      console.log("filteredList##", filteredList);
      dispatch(backlog(filteredList));
    } else if (prevIssueStatus === issueStatus.selected) {
      filteredList = deleteIssue(selectorIssue.selectedIssues);
      dispatch(selected(filteredList));
    } else if (prevIssueStatus === issueStatus.inprogress) {
      filteredList = deleteIssue(selectorIssue.inprogressIssues);
      dispatch(inprogress(filteredList));
    } else {
      filteredList = deleteIssue(selectorIssue.completedIssues);
      dispatch(completed(filteredList));
    }
  }, [selectedIssueStatus]);

  useEffect(() => {
    if (updateRef.current) {
      updateRef.current = false;
      return;
    }
    if (Object.keys(updatedIssue).length == 0) {
      return;
    }
    let issuesList = [];
    console.log("updatedIssues###", updatedIssue, prevUpdateIssue);
    if (selectedIssueStatus === issueStatus.backlog) {
      issuesList = modifyIssueHandler(
        selectorIssue.backlogIssues,
        updatedIssue
      );
      console.log("issueList##", issuesList);
      dispatch(backlog(issuesList));
    } else if (selectedIssueStatus === issueStatus.done) {
      issuesList = modifyIssueHandler(
        selectorIssue.completedIssues,
        updatedIssue
      );
      dispatch(completed(issuesList));
    } else if (selectedIssueStatus === issueStatus.inprogress) {
      issuesList = modifyIssueHandler(
        selectorIssue.inprogressIssues,
        updatedIssue
      );
      dispatch(inprogress(issuesList));
    } else {
      issuesList = modifyIssueHandler(
        selectorIssue.selectedIssues,
        updatedIssue
      );
      dispatch(selected(issuesList));
    }
  }, [updatedIssue]);

  useEffect(() => {
    dispatch(setIssueStatus(issue.status));
    issueStatusFilteredList = issueStatusList.filter(
      (issueStatus) => issueStatus !== issue.status
    );
    return () => {
      dispatch(setIssueStatusDropDown(false));
    };
  }, []);

  return (
    <div className={classes.root}>
      <p>STATUS</p>
      <Button
        color="primary"
        variant="contained"
        onClick={showDropDownHandler}
        className={classes.button}
      >
        <span>{selectedIssueStatus}</span>{" "}
        <span className={classes.btnIcon}>
          <ArrowDropDown />
        </span>
      </Button>
      <br />
      <br />
      {showIssueStatusDropdown ? (
        <Autocomplete
          value={selectedIssueStatus}
          onChange={(event, newValue) =>
            changeIssueStatusHandler(event, newValue)
          }
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            return filtered;
          }}
          onClose={closeIssueStatusHandler}
          id="issue-status"
          options={issueStatusFilteredList}
          getOptionLabel={(option) => {
            return option === issueStatus.backlog
              ? "BACKLOG"
              : option === issueStatus.selected
              ? "SELECTED FOR DEVELOPMENT"
              : option === issueStatus.inprogress
              ? "IN PROGRESS"
              : "DONE";
          }}
          renderOption={(option) =>
            option === issueStatus.backlog
              ? "BACKLOG"
              : option === issueStatus.selected
              ? "SELECTED FOR DEVELOPMENT"
              : option === issueStatus.inprogress
              ? "IN PROGRESS"
              : "DONE"
          }
          freeSolo
          renderInput={(params) => {
            console.log("params##", params);
            return (
              <TextField
                {...params}
                margin="normal"
                variant="outlined"
                autoFocus
                size="small"
              />
            );
          }}
        />
      ) : null}
    </div>
  );
};

export default Status;
