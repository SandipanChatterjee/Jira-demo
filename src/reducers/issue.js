import { actionTypes } from "../actions/issues";
const initState = {
  backlogIssues: [],
  inprogressIssues: [],
  completedIssues: [],
  selectedIssue: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.backlog:
      return {
        ...state,
        backlogIssues: action.backlogIssue,
      };
    case actionTypes.inprogress:
      return {
        ...state,
        inprogressIssues: action.inprogressIssue,
      };
    case actionTypes.done:
      return {
        ...state,
        completedIssues: action.completedIssue,
      };
    case actionTypes.selected:
      return {
        ...state,
        selectedIssue: action.selectedIssue,
      };
    default:
      return state;
  }
};

export default reducer;
