import { updateIssueList } from "../../services/updateIssueList";

export const actionTypes = {
  set_estismate: "set_estismate",
};

export const setEstimationHandler = (data) => {
  return {
    type: actionTypes.set_estismate,
    estimate: data,
  };
};

export const updateIssueListHandler = (payload, id) => {
  return async (dispatch) => {
    try {
      const response = await updateIssueList(payload, id);
      await response;
    } catch (e) {
      console.log(e);
    }
  };
};
