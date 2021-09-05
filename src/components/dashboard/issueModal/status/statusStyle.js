import { makeStyles } from "@material-ui/core/styles";
import {
  primaryButtonColor,
  primaryButtonWidth,
} from "../../../../utils/globalStyles";
export const useStyles = makeStyles((theme) => ({
  button: {
    padding: ".1rem",
    marginBottom: ".5rem",
    width: primaryButtonWidth,
  },
}));
