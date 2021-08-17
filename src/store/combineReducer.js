import { combineReducers } from "redux";
import projectReducer from "../reducers/project";
import issueReducer from "../reducers/issue";
import searchReducer from "../reducers/search";
export const rootReducer = combineReducers({
  projectReducer,
  issueReducer,
  searchReducer,
});
