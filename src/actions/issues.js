import { issueTypes } from "../utils/utils";

export const actionTypes = {
  backlog: "backlog",
  selected: "selected",
  inprogress: "inprogress",
  done: "done",
};

const backlog = (data) => {
  console.log("data#", data);
  return {
    type: actionTypes.backlog,
    backlogIssue: data,
  };
};

const selected = (data) => {
  return {
    type: actionTypes.selected,
    selectedIssue: data,
  };
};

const inprogress = (data) => {
  return {
    type: actionTypes.inprogress,
    inprogressIssue: data,
  };
};

const completed = (data) => {
  return {
    type: actionTypes.done,
    completedIssue: data,
  };
};

export const setIssueTypes = (issues) => {
  return (dispatch) => {
    console.log("setIssueTypes#issues", issues);
    const backlogIssue = issues.filter(
      (issue) => issue.status === issueTypes.backlog
    );
    console.log("backlogIssue", backlogIssue);
    dispatch(backlog(backlogIssue));
    const selectedIssue = issues.filter(
      (issue) => issue.status === issueTypes.selected
    );
    dispatch(selected(selectedIssue));
    const inprogressIssue = issues.filter(
      (issue) => issue.status === issueTypes.inprogress
    );
    dispatch(inprogress(inprogressIssue));

    const completedIssue = issues.filter(
      (issue) => issue.status === issueTypes.done
    );
    dispatch(completed(completedIssue));
  };
};
