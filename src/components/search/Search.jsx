import React, { useEffect, useRef, useState } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import { search } from "../../actions/search";
import { setIssueTypes } from "../../actions/issues";
import { useStyles } from "./style";
import { backlog, completed, inprogress, selected } from "../../actions/issues";
import { useSelector, useDispatch } from "react-redux";
import { issueStatus } from "../../utils/utils";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

function convertToArrayOfObjects(data) {
  let backlog = [],
    selected = [],
    inProgress = [],
    completed = [];
  const output = data.map((el) => {
    if (el.status == issueStatus.backlog) {
      backlog.push(el);
    } else if (el.status == issueStatus.selected) {
      selected.push(el);
    } else if (el.status == issueStatus.inprogress) {
      inProgress.push(el);
    } else {
      completed.push(el);
    }
    return [backlog, selected, inProgress, completed];
  });

  return output[0];
}

const Search = ({ handleSearch }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const classes = useStyles();
  const ref = useRef(true);

  const backlogIssues = useSelector(
    (state) => state.issueReducer.backlogIssues
  );
  const selectedIssues = useSelector(
    (state) => state.issueReducer.selectedIssue
  );
  const inprogressIssues = useSelector(
    (state) => state.issueReducer.inprogressIssues
  );
  const completedIssues = useSelector(
    (state) => state.issueReducer.completedIssues
  );

  const arr = [
    backlogIssues,
    selectedIssues,
    inprogressIssues,
    completedIssues,
  ].flat(Infinity);

  const handleChange = (e) => {
    const val = e.target.value;
    dispatch(search(val));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    if (searchValue !== "") {
      console.log(arr);
      let issues = arr.filter((el) => {
        let title = el.title.toUpperCase();
        let value = searchValue.toUpperCase();
        return title.includes(value);
      });
      let searchedData = convertToArrayOfObjects(issues);
      handleSearch(searchedData);
    } else {
      dispatch(setIssueTypes(arr));
    }
  }, [searchValue]);

  useEffect(() => {
    return () => {
      dispatch(search(""));
    };
  }, []);

  return (
    <div className={classes.root}>
      <TextField
        id="search"
        className={classes.textField}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
        }}
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
