import { actionTypes } from "../actions/users";

const initData = {
  users: [],
};

const reducer = (state = initData, action) => {
  switch (action.type) {
    case actionTypes.users:
      return { ...state, users: action.users };
    default:
      return state;
  }
};

export default reducer;
