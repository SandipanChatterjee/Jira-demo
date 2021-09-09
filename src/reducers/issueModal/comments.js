import { actionTypes } from "../../actions/issueModal/comments";
const initState = {
  activeNewComment: false,
  newCommentText: "",
  newCommentLoading: false,
  newCommentData: {},
  newCommentFailedData: null,
  acitveEditComment: false,
  editCommentText: "",
  editCommentData: {},
  editCommentLoading: false,
  editCommentFaliedData: null,
  showDeleteModal: false,
  deleteCommentData: {},
  deleteCommentLoading: false,
  deleteCommentFaliedData: null,
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
    case actionTypes.save_new_comment_loading:
      return {
        ...state,
        newCommentLoading: true,
      };
    case actionTypes.save_new_comment:
      return {
        ...state,
        newCommentData: action.newCommentData,
        newCommentLoading: false,
      };
    case actionTypes.save_fail_new_comment:
      return {
        ...state,
        newCommentFailedData: action.newCommentFailed,
        newCommentLoading: false,
      };
    case actionTypes.active_edit_comment:
      return {
        ...state,
        acitveEditComment: action.activeEditComment,
      };

    case actionTypes.edit_comment_text:
      return {
        ...state,
        editCommentText: action.editCommentText,
      };
    case actionTypes.save_edit_comment_loading:
      return {
        ...state,
        editCommentLoading: action.editCommentLoading,
      };
    case actionTypes.save_edit_comment:
      return {
        ...state,
        editCommentData: action.editCommentData,
        editCommentLoading: false,
      };
    case actionTypes.save_fail_edit_comment:
      return {
        ...state,
        editCommentFaliedData: action.editCommentFaliedData,
        editCommentLoading: false,
      };
    case actionTypes.show_delete_modal:
      return {
        ...state,
        showDeleteModal: action.showDeleteModal,
      };
    case actionTypes.delete_comment_loading:
      return {
        ...state,
        deleteCommentLoading: action.deleteCommentLoading,
      };
    case actionTypes.delete_comment_success:
      return {
        ...state,
        deleteCommentData: action.deleteCommentData,
        deleteCommentLoading: false,
      };
    case actionTypes.delete_comment_fail:
      return {
        ...state,
        deleteCommentFailedData: action.deleteCommentFailedData,
        deleteCommentLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
