import React, { useEffect, Fragment } from "react";
import { type, typeIconObj, formats, modules } from "../../utils/utils";
import {
  setShowIssueTypeList,
  setIssueType,
} from "../../actions/issueModal/type";
import {
  setSelectedReporter,
  setShowReporterList,
} from "../../actions/issueModal/reporter";
import {
  setSummary,
  setNewProjectDescription,
} from "../../actions/createIssue";
import { useStyles } from "./CreateIssueStyle";
import { useDispatch, useSelector } from "react-redux";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreateIssue = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.projectReducer.loading);
  //issueType
  const issueType = useSelector((state) => state.typeReducer.type);
  const showIssueTypeList = useSelector(
    (state) => state.typeReducer.showIssueTypeList
  );
  //issueSummary-New
  const issueSummary = useSelector(
    (state) => state.createIssueReducer.issueSummary
  );
  //projectDescription - New
  const newProjectDescription = useSelector(
    (state) => state.createIssueReducer.newProjectDescription
  );
  //reporter
  const users =
    useSelector((state) => state.projectReducer.project.users) || [];
  const reportedId = useSelector((state) => state.reporterReducer.reporterId);
  const reporterData = useSelector(
    (state) => state.reporterReducer.reporterData
  );
  const showReporterList = useSelector(
    (state) => state.reporterReducer.showReporterList
  );

  const typeValuesArr = Object.values(type);
  const issueTypesOption = typeValuesArr.filter((el) => el !== issueType);
  const usersOption = users.filter((el) => el.id !== reportedId);

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

  const debounceHandler = (fn) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, 500);
    };
  };
  const changeNewProjectDescription = (value) => {
    const newProjectDescriptionText = value.replace(/(<([^>]+)>)/gi, "");
    console.log("newProjectDescriptionText#", newProjectDescriptionText);
    dispatch(setNewProjectDescription(newProjectDescriptionText));
  };
  const changeNewProjectDescriptionDebounceHandler = debounceHandler(
    changeNewProjectDescription
  );

  const showReporterListHandler = () => {
    dispatch(setShowReporterList(true));
  };

  const closeReporterListHandler = () => {
    dispatch(setShowReporterList(false));
  };

  const changeReporterHandler = (event, newValue) => {
    dispatch(setSelectedReporter(newValue.id, users));
    dispatch(setShowReporterList(false));
  };

  useEffect(() => {
    if (!loader) {
      dispatch(setIssueType("story"));
      dispatch(setSelectedReporter(users[0].id, users));
    }
  }, [loader]);

  if (loader) {
    return <p>Loading...</p>;
  }
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
          formats={formats}
          modules={modules}
          style={{ height: "150px" }}
          theme="snow"
          onChange={changeNewProjectDescriptionDebounceHandler}
          value={newProjectDescription}
        />
      </div>
      <br />
      <br />
      <div>
        <span style={{ fontSize: "12px" }}>
          Describe the issue in as much detail as you'd like.
        </span>
      </div>
      <br />
      <p>Reporter</p>
      <Button
        variant="outlined"
        onClick={showReporterListHandler}
        className={classes.btn}
      >
        <div className={classes.btnContent}>
          <Avatar
            src={reporterData.avatarUrl}
            className={classes.avatarSize}
            style={{ width: "30px", height: "30px" }}
          />
          <span className={classes.btnText}>{reporterData.name}</span>
        </div>
        <div className={classes.btnContent}>
          <span className={classes.btnIcon}>
            <ArrowDropDownIcon />
          </span>
        </div>
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

export default CreateIssue;
