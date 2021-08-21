import React, { useEffect, useRef } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import { search, searchedDataHandler } from "../../../actions/search";
import { setIssueTypes } from "../../../actions/issues";
import { useStyles } from "./style";
import { convertToArrayOfObjects } from "../../../utils/utils";
import { useSelectorIssues } from "../../../utils/useSelectorIssues";
import { useSelector, useDispatch } from "react-redux";
const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const selector = useSelectorIssues();
  const classes = useStyles();
  const ref = useRef(true);

  const issueTypes = [
    selector.backlogIssues,
    selector.selectedIssues,
    selector.inprogressIssues,
    selector.completedIssues,
  ];

  const arr = [
    selector.backlogIssues,
    selector.selectedIssues,
    selector.inprogressIssues,
    selector.completedIssues,
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
      let searchedDataArr = convertToArrayOfObjects(issues);
      let data = searchedDataArr || issueTypes;
      console.log("searchedDataArr#", searchedDataArr);
      dispatch(searchedDataHandler(data));
    } else {
      dispatch(setIssueTypes(arr));
    }
  }, [searchValue]);

  useEffect(() => {
    return () => {
      dispatch(search(""));
      dispatch(searchedDataHandler([]));
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
