import { saveComment, saveEditedComment } from "../services/saveComment";

export const actionTypes = {
  active_new_comment: "active_new_comment",
  new_comment_text: "new_comment",
  save_new_comment: "save_new_comment",
  save_fail_new_comment: "save_fail_new_comment",
  active_edit_comment: "active_edit_comment",
  edit_comment_text: "edit_comment_text",
  edit_comment_index: "edit_comment_index",
  save_edit_comment: "save_edit_comment",
  save_fail_edit_comment: "save_fail_edit_comment",
};

export const setActive = (flag) => {
  return {
    type: actionTypes.active_new_comment,
    activeNewComment: flag,
  };
};

export const newCommentTextHandler = (data) => {
  return {
    type: actionTypes.new_comment_text,
    newCommentText: data,
  };
};

export const saveNewCommentSuccess = (data) => {
  return {
    type: actionTypes.save_new_comment,
    newCommentData: data,
  };
};

export const saveNewCommentFail = (data) => {
  return {
    type: actionTypes.save_fail_new_comment,
    newCommentFailed: data,
  };
};

export const saveNewCommentHandler = (payload) => {
  return async (dispatch) => {
    try {
      let response = await saveComment(payload);
      const data = await response;
      dispatch(saveNewCommentSuccess(data.comment));
    } catch (e) {
      dispatch(saveNewCommentFail(e));
    }
  };
};

export const setEditActive = (flag) => {
  return {
    type: actionTypes.active_edit_comment,
    activeEditComment: flag,
  };
};

export const setCurrentCommentIndex = (index) => {
  return {
    type: actionTypes.edit_comment_index,
    currentCommentIndex: index,
  };
};

export const editCommentTextHandler = (data) => {
  return {
    type: actionTypes.edit_comment_text,
    editCommentText: data,
  };
};

export const saveEditCommentSuccess = (data) => {
  return {
    type: actionTypes.save_edit_comment,
    editCommentData: data,
  };
};

export const saveEditCommentFail = (data) => {
  return {
    type: actionTypes.save_fail_edit_comment,
    editCommentFailedData: data,
  };
};

export const saveEditCommentHandler = (id, payload) => {
  return async (dispatch) => {
    try {
      let response = await saveEditedComment(id, payload);
      const data = await response;
      dispatch(saveEditCommentSuccess(data.comment));
    } catch (e) {
      dispatch(saveEditCommentFail(e));
    }
  };
};
