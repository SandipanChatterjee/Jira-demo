import { makeStyles } from "@material-ui/core/styles";
import {
  primaryButtonColor,
  primaryButtonWidth,
  avatarSize,
} from "../../../../utils/globalStyles";
export const useStyles = makeStyles((theme) => ({
  parentContainer: {
    padding: ".2rem .5rem",
    marginBottom: ".5rem",
    marginRight: ".5rem",
    width: "auto",
    justifyContent: "flex-start",
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
  avatarSize: {
    width: avatarSize.width,
    height: avatarSize.height,
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
