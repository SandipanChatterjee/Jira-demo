import React, { useRef, Fragment, useEffect } from "react";
import { Avatar, Button, TextField, CircularProgress } from "@material-ui/core";
import {
  setActive,
  newCommentTextHandler,
  saveNewCommentHandler,
  saveNewCommentLoading,
} from "../../../actions/issueModal/comments";
import { useStyles, getModalStyle } from "./style";
import { useSelector, useDispatch } from "react-redux";

const NewComment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const issue = useSelector((state) => state.issueReducer.currentIssue);

  const currentUser = useSelector((state) => state.usersReducer.currentUser);

  const newCommentText = useSelector(
    (state) => state.commentsReducer.newCommentText
  );
  const activeNewComment = useSelector(
    (state) => state.commentsReducer.activeNewComment
  );
  const newCommentLoading = useSelector(
    (state) => state.commentsReducer.newCommentLoading
  );
  const newCommentData = useSelector(
    (state) => state.commentsReducer.newCommentData
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
  const saveHandler = () => {
    const payload = {
      body: newCommentText,
      issueId: issue.id,
      userId: currentUser.id,
    };
    dispatch(saveNewCommentHandler(payload));
  };

  useEffect(() => {
    if (Object.keys(newCommentData).length > 0 && !newCommentLoading) {
      inActiveHandler();
    }
  }, [newCommentData]);

  return (
    <div>
      <div className={classes.newComment}>
        <div className={classes.avatar}>
          <Avatar src={currentUser.avatarUrl} />
        </div>
        <div>
          <div className={classes.inputContainer}>
            <TextField
              ref={inputRef}
              className={classes.input}
              id="standard-search"
              type="search"
              variant="outlined"
              placeholder="Add a comment.."
              multiline
              rows={activeNewComment ? 4 : 1}
              onClick={activeHandler}
              onChange={changeCommentHandler}
              value={newCommentText}
            />
          </div>
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
                  <span>
                    {newCommentLoading ? (
                      <CircularProgress
                        size={20}
                        thickness={4}
                        color="secondary"
                      />
                    ) : null}{" "}
                    Save
                  </span>
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
