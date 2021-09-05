import { makeStyles } from "@material-ui/core/styles";
import {
  primaryButtonColor,
  primaryButtonWidth,
} from "../../../../utils/globalStyles";
export const useStyles = makeStyles((theme) => ({
  parentContainer: {
    padding: ".1rem",
    marginBottom: ".5rem",
    width: primaryButtonWidth,
  },
  container: {
    display: "flex",
    "&:hover ": {
      cursor: "pointer",
    },
  },
  text: {
    marginTop: "auto",
    marginBottom: "auto",
  },

  addMoreButton: {
    marginLeft: "10px",
    "&:hover ": {
      textDecoration: "underline",
    },
  },
  icon: {
    marginTop: "auto",
    marginBottom: "auto",
  },
}));
