export const actionTypes = {
  OPEN_CREATE_ISSUE: "OPEN_CREATE_ISSUE",
  CLOSE_CREATE_ISSUE: "CLOSE_CREATE_ISSUE",
};

export const openCreateIssue = () => {
  return {
    type: actionTypes.OPEN_CREATE_ISSUE,
  };
};

export const closeCreateIssue = () => {
  return {
    type: actionTypes.CLOSE_CREATE_ISSUE,
  };
};
