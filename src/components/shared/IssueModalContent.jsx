import React, { Fragment, useState, useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import { Avatar, Button, Link, TextField } from "@material-ui/core";
import { useStyles, getModalStyle } from "./style";
import { useSelector } from "react-redux";

const useOutsideAlerter = (ref, setActive) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      console.log(event);
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const IssueModalContent = ({ issue }) => {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);
  const [modalStyle] = React.useState(getModalStyle);
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  useOutsideAlerter(inputRef, setActive);

  const preventDefault = (event) => event.preventDefault();

  console.log("issue##", issue);

  if (Object.keys(issue).length == 0) {
    return null;
  }
  const safeIssueDescritpion = DOMPurify.sanitize(issue.description);

  const activeHandler = (e) => {
    setActive(true);
  };

  window.addEventListener("keypress", (e) => {
    if (e.key === "m") {
      activeHandler();
    }
  });
  return (
    <div style={modalStyle} className={classes.paper}>
      <h2>{issue.title}</h2>
      <p>Description</p>
      <div dangerouslySetInnerHTML={{ __html: safeIssueDescritpion }} />
      <br />
      <p>Comments</p>
      <br />
      <div className={classes.newComment}>
        <div className={classes.avatar}>
          <Avatar src={currentUser.avatarUrl} />
        </div>
        <div>
          <TextField
            ref={inputRef}
            className={classes.input}
            id="standard-search"
            label="Search field"
            type="search"
            variant="outlined"
            multiline
            rows={active ? 4 : 1}
            onClick={activeHandler}
          />
          <br />
          {active ? null : (
            <div>
              <span>
                <b>Pro tip</b>: Press m to comment
              </span>
              <br />
            </div>
          )}
          <br />
          {active ? (
            <Fragment>
              <div>
                <Button variant="contained" color="primary">
                  Save
                </Button>{" "}
                <Button>Cancel</Button>
              </div>
              <br />
            </Fragment>
          ) : null}
        </div>
      </div>

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
