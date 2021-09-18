import { makeStyles } from "@material-ui/core/styles";
import {
  cardBackGroundColor,
  paperBackGroundColor,
} from "../../../utils/globalStyles";
export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: paperBackGroundColor,
    height: "auto",
    width: "200px",
    padding: "5px",
    minHeight: "300px",
    minWidth: "300px",
    marginRight: "1rem",
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
    position: "relative",
    width: "auto",
    backgroundColor: cardBackGroundColor,
    margin: ".2rem 0",
    padding: "1rem",
    "&:hover": {
      backgroundColor: paperBackGroundColor,
      cursor: "pointer",
    },
    height: "6.5rem",
  },
  cardIconContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardIcon: {
    position: "absolute",
    bottom: 5,
  },
  cardIconAvatar: {
    position: "absolute",
    bottom: 5,
    right: 10,
  },
  paperBackGroundColor: {
    backgroundColor: paperBackGroundColor,
  },
  titleText: {
    wordWrap: "break-word",
  },

  "@media (max-width:768px)": {
    girdDisplay: {
      display: "block",
    },
    grid: {
      margin: "1rem 0",
    },
    paper: {
      backgroundColor: paperBackGroundColor,
      height: "auto",
      width: "1500px",
      padding: "5px",
      minWidth: "200px",
      marginRight: "1rem",
    },
    cardDisplay: {
      width: "auto",
    },
  },
}));
