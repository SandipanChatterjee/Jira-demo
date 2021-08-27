import { combineReducers } from "redux";
import projectReducer from "../reducers/project";
import issueReducer from "../reducers/issue";
import searchReducer from "../reducers/search";
import usersReducer from "../reducers/users";
import commentsReducer from "../reducers/comments";
import editorReducer from "../reducers/editor";
export const rootReducer = combineReducers({
  projectReducer,
  issueReducer,
  searchReducer,
  usersReducer,
  commentsReducer,
  editorReducer,
});
