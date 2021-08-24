import { actionTypes } from "../actions/comments";
const initState = {
  activeNewComment: false,
  newCommentText: "",
  newCommentData: {},
  newCommentFailedData: null,
  acitveEditComment: false,
  currentCommentIndex: null,
  editCommentText: "",
  editCommentData: {},
  editCommentFaliedData: null,
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.active_new_comment:
      return {
        ...state,
        activeNewComment: action.activeNewComment,
      };
    case actionTypes.new_comment_text:
      return {
        ...state,
        newCommentText: action.newCommentText,
      };
    case actionTypes.save_new_comment:
      return {
        ...state,
        newCommentData: action.newCommentData,
      };
    case actionTypes.save_fail_new_comment:
      return {
        ...state,
        newCommentFailedData: action.newCommentFailed,
      };
    case actionTypes.active_edit_comment:
      return {
        ...state,
        acitveEditComment: action.activeEditComment,
      };
    case actionTypes.edit_comment_index:
      return {
        ...state,
        currentCommentIndex: action.currentCommentIndex,
      };
    case actionTypes.edit_comment_text:
      return {
        ...state,
        editCommentText: action.editCommentText,
      };
    case actionTypes.save_edit_comment:
      return {
        ...state,
        editCommentData: action.editCommentData,
      };
    case actionTypes.save_fail_edit_comment:
      return {
        ...state,
        editCommentFaliedData: action.editCommentFaliedData,
      };
    default:
      return state;
  }
};

export default reducer;
