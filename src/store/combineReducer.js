import { combineReducers } from "redux";
import projectReducer from "../reducers/project";
import issueReducer from "../reducers/issue";
import searchReducer from "../reducers/search";
import usersReducer from "../reducers/users";
import commentsReducer from "../reducers/issueModal/comments";
import editorReducer from "../reducers/issueModal/editor";
import issueStatusReducer from "../reducers/issueModal/issueStatus";
import assigneesReducer from "../reducers/issueModal/assignees";
import reporterReducer from "../reducers/issueModal/reporter";
import priortyReducer from "../reducers/issueModal/priority";

export const rootReducer = combineReducers({
  projectReducer,
  issueReducer,
  searchReducer,
  usersReducer,
  commentsReducer,
  editorReducer,
  issueStatusReducer,
  assigneesReducer,
  reporterReducer,
  priortyReducer,
});
