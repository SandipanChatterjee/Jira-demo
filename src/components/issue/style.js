import { makeStyles } from "@material-ui/core/styles";
import {
  cardBackGroundColor,
  paperBackGroundColor,
} from "../../utils/globalStyles";
export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: paperBackGroundColor,
    height: "auto",
    width: "90%",
    padding: "10px",
  },
  control: {
    padding: theme.spacing(2),
  },
  girdDisplay: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap",
  },
  girdDisplaySubElements: {},
  cardDisplay: {
    width: "auto",
    backgroundColor: cardBackGroundColor,
    margin: "1rem",
    padding: "1rem",
  },
  paperBackGroundColor: {
    backgroundColor: paperBackGroundColor,
  },
}));
