import axios from "../eaxios";
export const updateIssueList = async (payload, id) => {
  try {
    await axios.put(`/issues/${id}`, payload);
  } catch (e) {
    console.log(e);
  }
};
