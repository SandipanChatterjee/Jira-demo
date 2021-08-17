import { issueStatus } from "../utils/utils";

export const actionTypes = {
  backlog: "backlog",
  selected: "selected",
  inprogress: "inprogress",
  done: "done",
};

export const backlog = (data) => {
  const arr = JSON.parse(JSON.stringify(data));
  arr.forEach((el) => {
    el.status = issueStatus.backlog;
  });
  return {
    type: actionTypes.backlog,
    backlogIssue: arr,
  };
};

export const selected = (data) => {
  const arr = JSON.parse(JSON.stringify(data));
  arr.forEach((el) => {
    el.status = issueStatus.selected;
  });
  return {
    type: actionTypes.selected,
    selectedIssue: arr,
  };
};

export const inprogress = (data) => {
  const arr = JSON.parse(JSON.stringify(data));
  arr.forEach((el) => {
    el.status = issueStatus.inprogress;
  });
  return {
    type: actionTypes.inprogress,
    inprogressIssue: arr,
  };
};

export const completed = (data) => {
  const arr = JSON.parse(JSON.stringify(data));
  arr.forEach((el) => {
    el.status = issueStatus.done;
  });
  return {
    type: actionTypes.done,
    completedIssue: arr,
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
