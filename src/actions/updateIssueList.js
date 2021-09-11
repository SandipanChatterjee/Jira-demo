import { updateIssueList } from "../services/updateIssueList";
export const actionTypes = {
  success_update_issue_list: "success_update_issue_list",
  fail_update_issue_list: "fail_update_issue_list",
};
export const updateIssueListSuccess = () => {
  return {
    type: actionTypes.success_update_issue_list,
    success: true,
  };
};
export const updateIssueListFail = (msg) => {
  return {
    type: actionTypes.fail_update_issue_list,
    errorMsg: msg,
  };
};

export const updateIssueListHandler = (payload, id) => {
  return async (dispatch) => {
    try {
      const response = await updateIssueList(payload, id);
      await response;
      dispatch(updateIssueListSuccess());
    } catch (e) {
      console.log(e);
      dispatch(updateIssueListFail());
    }
  };
};
