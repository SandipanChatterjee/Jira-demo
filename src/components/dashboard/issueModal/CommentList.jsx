import React, { Fragment, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  CircularProgress,
  Modal,
} from "@material-ui/core";
import { useStyles, getModalStyle } from "./style";
import {
  setEditActive,
  setCurrentCommentIndex,
  editCommentTextHandler,
  saveEditCommentHandler,
  deleteModal,
  deleteCommentHandler,
} from "../../../actions/comments";
import { useSelector, useDispatch } from "react-redux";

let currentDeleteElementId = 0;
let currentCommentIndex = null;

const CommentList = ({ issue }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const dispatch = useDispatch();
  const acitveEditComment = useSelector(
    (state) => state.commentsReducer.acitveEditComment
  );
  const editCommentText = useSelector(
    (state) => state.commentsReducer.editCommentText
  );
  const editCommentLoading = useSelector(
    (state) => state.commentsReducer.editCommentLoading
  );
  const editCommentData = useSelector(
    (state) => state.commentsReducer.editCommentData
  );
  const showDeleteModal = useSelector(
    (state) => state.commentsReducer.showDeleteModal
  );
  const deleteCommentData = useSelector(
    (state) => state.commentsReducer.deleteCommentData
  );
  const deleteCommentLoading = useSelector(
    (state) => state.commentsReducer.deleteCommentLoading
  );

  const editCommentActiveHandler = (index) => {
    dispatch(setEditActive(true));
    currentCommentIndex = index;
    // dispatch(setCurrentCommentIndex(index));
  };

  const editCommentInActiveHandler = () => {
    dispatch(setEditActive(false));
    dispatch(editCommentTextHandler(""));
    currentCommentIndex = null;
    // dispatch(setCurrentCommentIndex(null));
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
  };

  const deleteModalHandler = (id) => {
    console.log("deleteModalHandler#", id);
    currentDeleteElementId = id;
    dispatch(deleteModal(true));
  };
  const deleteModalCloseHandler = () => {
    dispatch(deleteModal(false));
  };

  useEffect(() => {
    if (Object.keys(editCommentData).length > 0 && !editCommentLoading) {
      editCommentInActiveHandler();
    }
    if (Object.keys(deleteCommentData).length > 0 && !deleteCommentLoading) {
      deleteModalCloseHandler();
    }
  }, [editCommentData, deleteCommentData]);

  const renderModal = (id) => {
    console.log("id##", id);
    return (
      <Modal
        open={showDeleteModal}
        onClose={deleteModalCloseHandler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.modalContainer}>
          <h2>Are you sure you want to delete this comment?</h2>
          <span>Once you delete, it's gone for good.</span>
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            size="small"
            style={{ marginRight: "15px" }}
            onClick={() => dispatch(deleteCommentHandler(id))}
          >
            Delete Comment
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => deleteModalCloseHandler()}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    );
  };
  useEffect(() => {
    return () => {
      currentDeleteElementId = 0;
    };
  }, []);
  return (
    <Fragment>
      <div>
        {issue.comments.map((comment, index) => {
          console.log("issue#comments");
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
                        {" "}
                        <div className={classes.buttonContainer}>
                          {editCommentLoading ? (
                            <CircularProgress
                              size={18}
                              thickness={4}
                              color="secondary"
                            />
                          ) : null}

                          <span>Save</span>
                        </div>
                      </Button>
                      {"   "}
                      <Button onClick={editCommentInActiveHandler}>
                        Cancel
                      </Button>
                    </div>
                    <br />
                  </div>
                ) : (
                  <div className={classes.commentBody}>
                    <p>{comment.body}</p>
                    <Link
                      component="button"
                      onClick={() => editCommentActiveHandler(index)}
                    >
                      Edit
                    </Link>{" "}
                    <Link
                      component="button"
                      onClick={() => deleteModalHandler(comment.id)}
                    >
                      Delete
                    </Link>
                  </div>
                )}
              </div>
              <div>
                {showDeleteModal && currentDeleteElementId === comment.id
                  ? renderModal(comment.id)
                  : null}
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default CommentList;
