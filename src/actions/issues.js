import { issueStatus } from "../utils/utils";

export const actionTypes = {
  backlog: "backlog",
  selected: "selected",
  inprogress: "inprogress",
  done: "done",
};

export const backlog = (data) => {
  console.log("data#", data);
  return {
    type: actionTypes.backlog,
    backlogIssue: data,
  };
};

export const selected = (data) => {
  return {
    type: actionTypes.selected,
    selectedIssue: data,
  };
};

export const inprogress = (data) => {
  return {
    type: actionTypes.inprogress,
    inprogressIssue: data,
  };
};

export const completed = (data) => {
  return {
    type: actionTypes.done,
    completedIssue: data,
  };
};

export const setIssueTypes = (issues) => {
  return (dispatch) => {
    console.log("setIssueTypes#issues", issues);
    const backlogIssue = issues.filter(
      (issue) => issue.status === issueStatus.backlog
    );
    console.log("backlogIssue", backlogIssue);
    dispatch(backlog(backlogIssue));
    const selectedIssue = issues.filter(
      (issue) => issue.status === issueStatus.selected
    );
    dispatch(selected(selectedIssue));
    const inprogressIssue = issues.filter(
      (issue) => issue.status === issueStatus.inprogress
    );
    dispatch(inprogress(inprogressIssue));

    const completedIssue = issues.filter(
      (issue) => issue.status === issueStatus.done
    );
    dispatch(completed(completedIssue));
  };
};
