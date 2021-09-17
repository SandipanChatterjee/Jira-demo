import { updateIssueList } from "../../services/updateIssueList";

export const actionTypes = {
  show_issueType_list: "show_issueType_list",
  set_issueType: "set_issueType",
};

export const setIssueType = (data) => {
  return {
    type: actionTypes.set_issueType,
    issueType: data,
  };
};

export const setShowIssueTypeList = (flag) => {
  return {
    type: actionTypes.show_issueType_list,
    showIssueTypeList: flag,
  };
};

export const updateIssueListHandler = (payload, id) => {
  return async (dispatch) => {
    try {
      const response = await updateIssueList(payload, id);
      await response;
    } catch (e) {
      console.log(e);
    }
  };
};
