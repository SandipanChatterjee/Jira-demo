import { CircularProgress } from "@material-ui/core";
import "./style.css";
export const Loader = ({ size = 100 }) => {
  return <CircularProgress className="container" size={size} />;
};
