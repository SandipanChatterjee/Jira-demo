import React, { Fragment, useState } from "react";
import DOMPurify from "dompurify";
import { Avatar, Button, Link, TextField } from "@material-ui/core";
import { useStyles, getModalStyle } from "./style";

import NewCommentSection from "./NewComment";
import CommentListSection from "./CommentList";
const IssueModalContent = ({ issue }) => {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  // useOutsideAlerter(inputRef, setActive);

  console.log("issue##", issue);

  if (Object.keys(issue).length == 0) {
    return null;
  }
  const safeIssueDescritpion = DOMPurify.sanitize(issue.description);

  return (
    <div style={modalStyle} className={classes.paper}>
      <h2>{issue.title}</h2>
      <p>Description</p>
      <div dangerouslySetInnerHTML={{ __html: safeIssueDescritpion }} />
      <br />
      <p>Comments</p>
      <br />
      <NewCommentSection issue={issue} />
      <CommentListSection issue={issue} />
    </div>
  );
};

export default IssueModalContent;
