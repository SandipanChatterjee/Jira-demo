import { actionTypes } from "../actions/search";
const initState = {
  searchValue: "",
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH:
      return {
        ...state,
        searchValue: action.searchValue,
      };
    default:
      return state;
  }
};

export default reducer;
