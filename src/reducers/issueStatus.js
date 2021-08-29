import { actionTypes } from "../actions/issueStatus";

const initState = {
  showIssueStatusDropdown: false,
  selectedIssueStatus: "",
  updatedIssue: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.show_issue_status_dropdown:
      return {
        ...state,
        showIssueStatusDropdown: action.showIssueStatusDropdown,
      };
    case actionTypes.set_issue_status:
      return {
        ...state,
        selectedIssueStatus: action.selectedIssueStatus,
      };
    case actionTypes.update_issue:
      return {
        ...state,
        updatedIssue: action.updatedIssue,
      };
    default:
      return state;
  }
};

export default reducer;
