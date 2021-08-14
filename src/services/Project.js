import axios from "../eaxios";
export const getProject = async () => {
  return await axios.get("/project");
};
