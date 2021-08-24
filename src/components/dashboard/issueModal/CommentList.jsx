import React, { Fragment } from "react";
import { Avatar, Button, TextField, Link } from "@material-ui/core";
import { useStyles } from "./style";
import {
  setEditActive,
  setCurrentCommentIndex,
  editCommentTextHandler,
  saveEditCommentHandler,
} from "../../../actions/comments";
import { useSelector, useDispatch } from "react-redux";
const CommentList = ({ issue }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const acitveEditComment = useSelector(
    (state) => state.commentsReducer.acitveEditComment
  );
  const currentCommentIndex = useSelector(
    (state) => state.commentsReducer.currentCommentIndex
  );
  const editCommentText = useSelector(
    (state) => state.commentsReducer.editCommentText
  );

  const editCommentActiveHandler = (index) => {
    dispatch(setEditActive(true));
    dispatch(setCurrentCommentIndex(index));
  };

  const editCommentInActiveHandler = () => {
    dispatch(setEditActive(false));
    dispatch(editCommentTextHandler(""));
    dispatch(setCurrentCommentIndex(null));
  };

  const changeCommentHandler = (e) => {
    const val = e.target.value;
    dispatch(editCommentTextHandler(val));
  };
  const editHandler = (e, id) => {
    e.preventDefault();
    const payload = {
      body: editCommentText,
    };
    dispatch(saveEditCommentHandler(id, payload));
    editCommentInActiveHandler();
  };
  return (
    <Fragment>
      {issue.comments.map((comment, index) => {
        return (
          <div className={classes.commentsContainer} key={index}>
            <div className={classes.avatar}>
              <Avatar src={comment.user.avatarUrl} />
            </div>
            <div>
              <b>{comment.user.name}</b>
              <br />

              {acitveEditComment && currentCommentIndex == index ? (
                <div>
                  <br />
                  <TextField
                    className={classes.input}
                    id="standard-search"
                    label="Search field"
                    type="search"
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={changeCommentHandler}
                    value={
                      editCommentText !== "" ? editCommentText : comment.body
                    }
                  />
                  <br />
                  <br />
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => editHandler(e, comment.id)}
                      disabled={editCommentText === "" ? true : false}
                    >
                      Save
                    </Button>
                    {"   "}
                    <Button onClick={editCommentInActiveHandler}>Cancel</Button>
                  </div>
                  <br />
                </div>
              ) : (
                <Fragment>
                  <p>{comment.body}</p>
                  <Link
                    component="button"
                    onClick={() => editCommentActiveHandler(index)}
                  >
                    Edit
                  </Link>{" "}
                  <Link component="button">Delete</Link>
                </Fragment>
              )}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default CommentList;
