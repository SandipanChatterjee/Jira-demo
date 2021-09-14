import React, { useEffect, useState, useRef } from "react";
import { Modal } from "@material-ui/core";
import { getCurrentIssue } from "../../../actions/issues";
import { Loader } from "../../shared/loader/Loader";
import IssueModalContent from "../issueModal/IssueModalContent";
import { getModalStyle, useStyles } from "./style";
import { setShowMasterIssue } from "../../../actions/masterIssue";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const MasterIssueModal = () => {
  // const [modalActive, setModalActive] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const showMasterIssueModal = useSelector(
    (state) => state.masterIssueReducer.showMasterIssueModal
  );
  const currentIssueLoading = useSelector(
    (state) => state.issueReducer.currentIssueLoading
  );
  const currentIssue = useSelector((state) => state.issueReducer.currentIssue);
  const newCommentData = useSelector(
    (state) => state.commentsReducer.newCommentData
  );
  const editCommentData = useSelector(
    (state) => state.commentsReducer.editCommentData
  );
  const deleteCommentData = useSelector(
    (state) => state.commentsReducer.deleteCommentData
  );

  const loaderProject = useSelector((state) => state.projectReducer.loading);

  const history = useHistory();

  const [modalStyle] = React.useState(getModalStyle);

  const modalRef = useRef();

  const modalCloseHandler = () => {
    dispatch(setShowMasterIssue(false));
    history.goBack();
  };

  useEffect(() => {
    if (
      Object.keys(newCommentData).length > 0 ||
      Object.keys(editCommentData).length > 0 ||
      Object.keys(deleteCommentData).length > 0
    ) {
      if (Object.keys(currentIssue).length > 0) {
        console.log("currentIssue", currentIssue);
        dispatch(getCurrentIssue(currentIssue.id));
      }
    }
  }, [newCommentData, editCommentData, deleteCommentData]);

  useEffect(() => {
    console.log("ref##", modalRef.current);

    dispatch(setShowMasterIssue(true));
  }, []);

  if (!currentIssueLoading) {
    if (Object.keys(currentIssue).length == 0) {
      history.goBack();
    }
  }

  return (
    <div ref={modalRef}>
      <Modal
        open={showMasterIssueModal}
        onClose={modalCloseHandler}
        className={classes.modalStyle}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {currentIssueLoading ? (
          <div
            style={modalStyle}
            className={`${classes.paper} ${classes.loaderContainer}`}
          >
            <Loader />
          </div>
        ) : (
          <div style={loaderProject ? { pointerEvents: "none" } : null}>
            <IssueModalContent issue={currentIssue} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MasterIssueModal;
