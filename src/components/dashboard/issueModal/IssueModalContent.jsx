import React, { Fragment, useState, useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import { useStyles, getModalStyle } from "./style";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import NewCommentSection from "./NewComment";
import CommentListSection from "./CommentList";
import { updateIssueList } from "../../../services/updateIssueList";
import { issueStatus, useOutsideAlerter } from "../../../utils/utils";
import {
  setTitleEditor,
  setTitleText,
  setDescriptionText,
  setDescriptionEditor,
} from "../../../actions/editor";
import {
  backlog,
  selected,
  inprogress,
  completed,
} from "../../../actions/issues";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@material-ui/core";
import { useSelectorIssues } from "../../../utils/useSelectorIssues";
import Status from "./status/Status";
import Assignees from "./assigness/Assignees";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

let modifiedIssues = [];
let prevDescriptionValue = "";

const IssueModalContent = ({ issue }) => {
  console.log("issue####", issue);
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectorIssue = useSelectorIssues();
  const showTitleEditor = useSelector(
    (state) => state.editorReducer.showTitleEditor
  );
  const titleText = useSelector((state) => state.editorReducer.titleText);

  const showDescriptionEditor = useSelector(
    (state) => state.editorReducer.showDescriptionEditor
  );
  const descriptionText = useSelector(
    (state) => state.editorReducer.descriptionText
  );
  const [modalStyle] = React.useState(getModalStyle);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setTitleEditor);

  const safeIssueDescritpion = DOMPurify.sanitize(descriptionText);

  const modifyIssueHandler = (issueEl, titleText) => {
    const issuesCopy = JSON.parse(JSON.stringify(issueEl));
    const currentFilteredIssue = issuesCopy.find(
      (issuesEls) => issue.id === issuesEls.id
    );
    const index = issuesCopy.indexOf(currentFilteredIssue);
    issuesCopy.splice(index, 1);
    currentFilteredIssue.title = titleText;
    issuesCopy.splice(index, 0, { ...currentFilteredIssue });
    modifiedIssues = [...issuesCopy];
  };

  const handleTitleChange = (value) => {
    console.log("handleTitleChange####", value);
    const titleText = value.replace(/(<([^>]+)>)/gi, "");

    if (issue.status === issueStatus.backlog) {
      modifyIssueHandler(selectorIssue.backlogIssues, titleText);
    } else if (issue.status === issueStatus.done) {
      modifyIssueHandler(selectorIssue.completedIssues, titleText);
    } else if (issue.status === issueStatus.inprogress) {
      modifyIssueHandler(selectorIssue.inprogressIssues, titleText);
    } else {
      modifyIssueHandler(selectorIssue.selectedIssues, titleText);
    }

    dispatch(setTitleText(titleText));
    updateIssueList({ title: titleText }, issue.id);
  };

  const handleDescriptionChange = (value) => {
    console.log("handleDescriptionChange####", value);
    dispatch(setDescriptionText(value));
  };

  const updateDescriptionHandler = () => {
    prevDescriptionValue = descriptionText;
    updateIssueList({ description: descriptionText }, issue.id);
    dispatch(setDescriptionEditor(false));
  };

  const cancelDescriptionHandler = () => {
    dispatch(setDescriptionText(prevDescriptionValue));
    dispatch(setDescriptionEditor(false));
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

  const handleTitleChangeDebounce = debounceHandler(handleTitleChange);
  const handleDescriptionChangeDebounce = debounceHandler(
    handleDescriptionChange
  );

  useEffect(() => {
    console.log("issuee##", issue);
    dispatch(setTitleText(issue.title));
    dispatch(setDescriptionText(issue.description));
    prevDescriptionValue = issue.description;
  }, [issue]);

  useEffect(() => {
    return () => {
      prevDescriptionValue = "";
      dispatch(setTitleText(""));
      dispatch(setDescriptionText(""));
      dispatch(setDescriptionEditor(false));
      dispatch(setTitleEditor(false));
      if (modifiedIssues.length > 0) {
        if (issue.status === issueStatus.backlog) {
          dispatch(backlog(modifiedIssues));
        } else if (issue.status === issueStatus.done) {
          dispatch(completed(modifiedIssues));
        } else if (issue.status === issueStatus.inprogress) {
          dispatch(inprogress(modifiedIssues));
        } else {
          dispatch(selected(modifiedIssues));
        }
      }
    };
  }, []);

  if (Object.keys(issue).length == 0) {
    return null;
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ flex: 2 }}>
        {showTitleEditor ? (
          <div ref={wrapperRef}>
            <ReactQuill
              theme="snow"
              onChange={handleTitleChangeDebounce}
              value={titleText || ""}
            />
          </div>
        ) : (
          <h2
            className={classes.titleText}
            onClick={() => dispatch(setTitleEditor(true))}
          >
            {titleText}
          </h2>
        )}

        <p>Description</p>
        {showDescriptionEditor ? (
          <Fragment>
            <ReactQuill
              formats={formats}
              modules={modules}
              theme="snow"
              onChange={handleDescriptionChangeDebounce}
              value={safeIssueDescritpion || ""}
            />
            <br />
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={updateDescriptionHandler}
            >
              Save
            </Button>{" "}
            <Button size="small" onClick={cancelDescriptionHandler}>
              Cancel
            </Button>
            <br />
          </Fragment>
        ) : (
          <div
            onClick={() => dispatch(setDescriptionEditor(true))}
            style={{ width: "500px", overflow: "auto" }}
            dangerouslySetInnerHTML={{ __html: safeIssueDescritpion }}
          />
        )}

        <br />
        <p>Comments</p>
        <br />
        <NewCommentSection issue={issue} />
        <CommentListSection issue={issue} />
      </div>
      <div style={{ flex: 1 }}>
        {" "}
        <Status issue={issue} />
        <Assignees issue={issue} />
      </div>
    </div>
  );
};

IssueModalContent.defaultProps = {
  issue: {},
};

export default IssueModalContent;
