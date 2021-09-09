import React, { useEffect, Fragment } from "react";
import { TextField, Avatar, Button } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import {
  setPriority,
  setShowPriorityList,
  updateIssueListHandler,
} from "../../../../actions/issueModal/priority";

import { useDispatch, useSelector } from "react-redux";
import "./priority.css";

const priorityObj = {
  1: "Highest",
  2: "High",
  3: "Medium",
  4: "Low",
  5: "Lowest",
};

const proirtyIcon = {
  1: (
    <ArrowUpward
      className="priority"
      style={{ color: "#8B0000", fontSize: "1rem", marginTop: "5px" }}
    />
  ),
  2: (
    <ArrowUpward
      className="priority"
      style={{ color: "#FF7F7F", fontSize: "1rem", marginTop: "5px" }}
    />
  ),
  3: (
    <ArrowUpward
      className="priority"
      style={{ color: "#FFA500", fontSize: "1rem", marginTop: "5px" }}
    />
  ),
  4: (
    <ArrowDownward
      className="priority"
      style={{ color: "#90EE90", fontSize: "1rem", marginTop: "5px" }}
    />
  ),
  5: (
    <ArrowDownward
      className="priority"
      style={{ color: "#006400", fontSize: "1rem", marginTop: "5px" }}
    />
  ),
};
const Priority = ({ issue }) => {
  const dispatch = useDispatch();
  const priority = useSelector((state) => state.priortyReducer.priority);
  const showPriorityList = useSelector(
    (state) => state.priortyReducer.showPriorityList
  );
  const showPriorityListHandler = () => {
    dispatch(setShowPriorityList(true));
  };
  const closePriorityListHandler = () => {
    dispatch(setShowPriorityList(false));
  };
  const changePriorityHandler = (event, newValue) => {
    dispatch(setPriority(newValue));
    dispatch(updateIssueListHandler({ priority: newValue }, issue.id));
    dispatch(setShowPriorityList(false));
  };

  const priorityOptions = Object.keys(priorityObj).filter(
    (el) => el !== priority
  );
  useEffect(() => {
    dispatch(setPriority(issue.priority));
  }, []);
  return (
    <div>
      <p>PRIORITY</p>
      <Button
        variant="text"
        onClick={showPriorityListHandler}
        style={{
          paddingTop: ".2rem",
          paddingBottom: ".2rem",
          paddingLeft: ".2rem",
          marginBottom: ".5rem",
          width: "auto",
          justifyContent: "flex-start",
        }}
      >
        <span style={{ textAlign: "left" }}>{proirtyIcon[priority]}</span>
        <span>{priorityObj[priority]}</span>
      </Button>
      {showPriorityList ? (
        <div onBlur={closePriorityListHandler}>
          <Autocomplete
            freeSolo
            onChange={(event, newValue) =>
              changePriorityHandler(event, newValue)
            }
            options={priorityOptions}
            renderOption={(option) => {
              return (
                <Fragment>
                  <span>{proirtyIcon[option]}</span>
                  <span>{priorityObj[option]}</span>
                </Fragment>
              );
            }}
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

export default Priority;
