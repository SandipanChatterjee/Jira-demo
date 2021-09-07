import { makeStyles } from "@material-ui/core/styles";
import {
  primaryButtonColor,
  primaryButtonWidth,
} from "../../../../utils/globalStyles";
export const useStyles = makeStyles((theme) => ({
  button: {
    padding: ".2rem .5rem",
    marginBottom: ".5rem",
    width: "auto",
    justifyContent: "flex-start",
  },
}));
