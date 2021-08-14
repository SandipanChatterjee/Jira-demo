import { combineReducers } from "redux";
import projectReducer from "../reducers/project";
import issueReducer from "../reducers/issue";
export const rootReducer = combineReducers({
  projectReducer,
  issueReducer,
});
