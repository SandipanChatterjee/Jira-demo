import React, { Fragment, useState, useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import { useStyles, getModalStyle } from "./style";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import NewCommentSection from "./NewComment";
import CommentListSection from "./CommentList";
import { updateIssueList } from "../../../services/updateIssueList";
import { useOutsideAlerter } from "../../../utils/utils";
import {
  setTitleEditor,
  setTitleText,
  setDescriptionText,
  setDescriptionEditor,
} from "../../../actions/editor";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

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

const IssueModalContent = ({ issue }) => {
  console.log("issue####", issue);
  const classes = useStyles();
  const dispatch = useDispatch();
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

  const handleTitleChange = (value) => {
    console.log("handleTitleChange####", value);
    const titleText = value.replace(/(<([^>]+)>)/gi, "");
    dispatch(setTitleText(titleText));
    updateIssueList({ title: titleText }, issue.id);
  };

  const handleDescriptionChange = (value) => {
    console.log("handleDescriptionChange####", value);
    dispatch(setDescriptionText(value));
  };

  const updateDescriptionHandler = () => {
    updateIssueList({ description: descriptionText }, issue.id);
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
  }, [issue]);

  useEffect(() => {
    return () => {
      dispatch(setTitleText(""));
      dispatch(setDescriptionText(""));
      dispatch(setDescriptionEditor(false));
      dispatch(setTitleEditor(false));
    };
  }, []);

  if (Object.keys(issue).length == 0) {
    return null;
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      {showTitleEditor ? (
        <div ref={wrapperRef}>
          <ReactQuill
            theme="snow"
            onChange={handleTitleChangeDebounce}
            value={titleText || ""}
          />
        </div>
      ) : (
        <h2 onClick={() => dispatch(setTitleEditor(true))}>{titleText}</h2>
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
          <Button
            size="small"
            onClick={() => dispatch(setDescriptionEditor(false))}
          >
            Cancel
          </Button>
          <br />
        </Fragment>
      ) : (
        <div
          onClick={() => dispatch(setDescriptionEditor(true))}
          dangerouslySetInnerHTML={{ __html: safeIssueDescritpion }}
        />
      )}

      <br />
      <p>Comments</p>
      <br />
      <NewCommentSection issue={issue} />
      <CommentListSection issue={issue} />
    </div>
  );
};

export default IssueModalContent;
