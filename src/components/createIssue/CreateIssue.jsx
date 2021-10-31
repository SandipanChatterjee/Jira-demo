import React, { useEffect, Fragment } from "react";
import { type, typeIconObj, formats, modules } from "../../utils/utils";
import {
  setShowIssueTypeList,
  setIssueType,
} from "../../actions/issueModal/type";
import {
  setSummary,
  setNewProjectDescription,
} from "../../actions/createIssue";
import { useStyles } from "./CreateIssueStyle";
import { useDispatch, useSelector } from "react-redux";

import ReactQuill from "react-quill";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "react-quill/dist/quill.snow.css";
const CreateIssue = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const issueType = useSelector((state) => state.typeReducer.type);
  const showIssueTypeList = useSelector(
    (state) => state.typeReducer.showIssueTypeList
  );
  const issueSummary = useSelector(
    (state) => state.createIssueReducer.issueSummary
  );
  const newProjectDescription = useSelector(
    (state) => (state) => state.createIssueReducer.newProjectDescription
  );
  const typeValuesArr = Object.values(type);
  const issueTypesOption = typeValuesArr.filter((el) => el !== issueType);

  const changeIssueTypeHandler = (event, newType) => {
    dispatch(setIssueType(newType));
    dispatch(setShowIssueTypeList(false));
  };

  const showIssueTypeListHandler = () => {
    dispatch(setShowIssueTypeList(true));
  };
  const closeIssueTypeListHandler = () => {
    dispatch(setShowIssueTypeList(false));
  };
  const changeSummaryHandler = (e) => {
    dispatch(setSummary(e.target.value));
  };
  const changeNewProjectDescription = (e) => {
    dispatch(setNewProjectDescription(e.target.value));
  };
  useEffect(() => {
    dispatch(setIssueType("story"));
  }, []);
  return (
    <div className={classes.root}>
      <h2>Create Issue</h2>
      <br />
      <br />
      <p>Issue Type</p>
      <Button
        onClick={showIssueTypeListHandler}
        className={classes.btn}
        variant="outlined"
      >
        <div className={classes.btnContent}>
          <span className={classes.icon}>
            {typeIconObj[typeValuesArr.indexOf(issueType)]}
          </span>
          <span className={classes.btnText}>{issueType}</span>
        </div>
        <div className={classes.btnContent}>
          <span className={classes.btnIcon}>
            <ArrowDropDownIcon />
          </span>
        </div>
      </Button>
      <span style={{ fontSize: "12px" }}>
        Start typing to get a list of possible matches.
      </span>
      {showIssueTypeList ? (
        <div onBlur={closeIssueTypeListHandler}>
          <Autocomplete
            freeSolo
            className={classes.autoCompleteContainer}
            onChange={(event, newValue) =>
              changeIssueTypeHandler(event, newValue)
            }
            options={issueTypesOption}
            renderOption={(option) => {
              console.log("option##", option);
              return (
                <Fragment>
                  {typeIconObj[typeValuesArr.indexOf(option)]}
                  <span style={{ marginLeft: "5px" }}>
                    {type[typeValuesArr.indexOf(option)]}
                  </span>
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
      <hr />
      <p>Short Summary</p>
      <div className={classes.inputElements}>
        <TextField
          required
          id="summary"
          error={issueSummary === ""}
          value={issueSummary}
          onChange={changeSummaryHandler}
          variant="outlined"
          size="small"
          className={classes.textField}
        />
        <span style={{ fontSize: "12px" }}>
          Concisely summarize the issue in one or two sentences.
        </span>
        <br />
        {issueSummary === "" ? (
          <span className={classes.errorText}>This field is required</span>
        ) : null}
      </div>
      <br />
      <p>Description</p>
      <div>
        <ReactQuill
          id="description"
          formats={formats}
          modules={modules}
          theme="snow"
          style={{ height: "150px" }}
          onChange={changeNewProjectDescription}
          value={newProjectDescription}
        />
      </div>
      <div>
        <span style={{ fontSize: "12px" }}>
          Describe the issue in as much detail as you'd like.
        </span>
      </div>
    </div>
  );
};

export default CreateIssue;
