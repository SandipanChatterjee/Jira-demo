import React, { Fragment } from "react";
import DOMPurify from "dompurify";
import { Avatar, Button, Link } from "@material-ui/core";
import { useStyles, getModalStyle } from "./style";

const IssueModalContent = ({ issue }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const preventDefault = (event) => event.preventDefault();

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
      {issue.comments.map((comment, index) => {
        return (
          <div className={classes.commentsContainer} key={index}>
            <div className={classes.avatar}>
              <Avatar src={comment.user.avatarUrl} />
            </div>
            <div>
              <b>{comment.user.name}</b>
              <br />
              <p>{comment.body}</p>
              <Link component="button" onClick={preventDefault}>
                Edit
              </Link>{" "}
              <Link component="button" onClick={preventDefault}>
                Delete
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IssueModalContent;
