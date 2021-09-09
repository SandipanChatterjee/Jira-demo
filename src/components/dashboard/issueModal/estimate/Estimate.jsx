import React, { useEffect } from "react";
import { TextField, Input } from "@material-ui/core";
import {
  setEstimationHandler,
  updateIssueListHandler,
} from "../../../../actions/issueModal/estimate";
import { useSelector, useDispatch } from "react-redux";
import "./estimate.css";
const Estimate = ({ issue }) => {
  const dispatch = useDispatch();
  const estimate =
    useSelector((state) => state.estimateReducer.estimate) || issue.estimate;

  const estimateChangeHandler = (e) => {
    e.preventDefault();
    const val = parseInt(e.target.value);
    dispatch(setEstimationHandler(val));
  };
  const updateEstimate = (e) => {
    estimateChangeHandler(e);
    dispatch(
      updateIssueListHandler({ estimate: parseInt(e.target.value) }, issue.id)
    );
  };

  const debounce = (fn) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, 1000);
    };
  };

  const estimateCallHandler = debounce(updateEstimate);
  return (
    <div>
      <p>ORIGINAL ESTIMATE (HOURS)</p>
      <TextField
        id="input-container"
        type="number"
        margin="normal"
        variant="outlined"
        onMouseUp={(e) => estimateCallHandler(e)}
        onKeyUp={(e) => estimateCallHandler(e)}
        defaultValue={estimate}
        inputProps={{ min: 0 }}
      />
    </div>
  );
};

export default Estimate;
