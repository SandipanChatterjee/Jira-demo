export const actionTypes = {
  OPEN_CREATE_ISSUE: "OPEN_CREATE_ISSUE",
  CLOSE_CREATE_ISSUE: "CLOSE_CREATE_ISSUE",
  SET_SUMMARY: "SET_SUMMARY",
  NEW_PROJECT_DESCRIPTION: "NEW_PROJECT_DESCRIPTION",
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

export const setSummary = (text) => {
  return {
    type: actionTypes.SET_SUMMARY,
    issueSummary: text,
  };
};

export const setNewProjectDescription = (text) => {
  return {
    type: actionTypes.NEW_PROJECT_DESCRIPTION,
    newProjectDescription: text,
  };
};
