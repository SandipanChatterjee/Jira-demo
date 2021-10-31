import { actionTypes } from "../actions/createIssue";
const initState = {
  openCreateIssue: false,
  issueSummary: "",
  newProjectDescription: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CREATE_ISSUE:
      return {
        ...state,
        openCreateIssue: true,
      };
    case actionTypes.CLOSE_CREATE_ISSUE:
      return {
        ...state,
        openCreateIssue: false,
      };
    case actionTypes.SET_SUMMARY:
      return {
        ...state,
        issueSummary: action.issueSummary,
      };
    case actionTypes.NEW_PROJECT_DESCRIPTION:
      return {
        ...state,
        newProjectDescription: action.newProjectDescription,
      };
    default:
      return state;
  }
};

export default reducer;
