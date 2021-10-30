import { actionTypes } from "../actions/createIssue";
const initState = {
  openCreateIssue: false,
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
    default:
      return state;
  }
};

export default reducer;
