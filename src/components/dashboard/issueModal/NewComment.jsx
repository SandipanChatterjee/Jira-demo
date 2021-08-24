import React, { useRef, Fragment } from "react";
import { Avatar, Button, TextField } from "@material-ui/core";
import {
  setActive,
  newCommentTextHandler,
  saveNewCommentHandler,
} from "../../../actions/comments";
import { useStyles, getModalStyle } from "./style";
import { useSelector, useDispatch } from "react-redux";

const NewComment = ({ issue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const newCommentText = useSelector(
    (state) => state.commentsReducer.newCommentText
  );
  const activeNewComment = useSelector(
    (state) => state.commentsReducer.activeNewComment
  );

  const inputRef = useRef(null);

  const activeHandler = () => {
    dispatch(setActive(true));
  };

  const inActiveHandler = () => {
    dispatch(setActive(false));
    dispatch(newCommentTextHandler(""));
  };

  window.addEventListener("keypress", (e) => {
    if (e.key === "m") {
      activeHandler();
    }
  });
  const changeCommentHandler = (e) => {
    const val = e.target.value;
    dispatch(newCommentTextHandler(val));
  };
  const saveHandler = (e) => {
    e.preventDefault();
    const payload = {
      body: newCommentText,
      issueId: issue.id,
      userId: currentUser.id,
    };
    dispatch(saveNewCommentHandler(payload));
    inActiveHandler();
  };
  return (
    <div>
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
            rows={activeNewComment ? 4 : 1}
            onClick={activeHandler}
            onChange={changeCommentHandler}
            value={newCommentText}
          />
          <br />
          {activeNewComment ? null : (
            <div>
              <span>
                <b>Pro tip</b>: Press m to comment
              </span>
              <br />
            </div>
          )}
          <br />
          {activeNewComment ? (
            <Fragment>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveHandler}
                >
                  Save
                </Button>{" "}
                <Button onClick={inActiveHandler}>Cancel</Button>
              </div>
              <br />
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewComment;
