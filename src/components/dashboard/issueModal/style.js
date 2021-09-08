import { makeStyles } from "@material-ui/core/styles";
import {
  cardBackGroundColor,
  paperBackGroundColor,
} from "../../../utils/globalStyles";

export const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    width: "1200px",
    backgroundColor: "#fff",
    minHeight: "100%",
    maxHeight: "calc(100vh - 210px)",
    overflowY: "auto",
    padding: theme.spacing(2, 4, 3),
    // margin: theme.spacing(20, 4, 3),
  },
  commentsContainer: {
    display: "flex",
  },
  newComment: {
    display: "flex",
  },
  avatar: {
    marginRight: "20px",
  },
  inputContainer: {
    maxWidth: "1200px",
  },
  input: {
    width: "200%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  modalContainer: {
    position: "absolute",
    width: "auto",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  commentBody: {
    width: "200px",
    wordWrap: "break-word",
  },
  modalStyle: {
    position: "absolute",
    top: "10%",
    left: "10%",
    overflow: "scroll",
    width: "100%",
    height: "100%",
    display: "block",
  },
  titleText: {
    wordWrap: "break-word",
  },
  titleContainer: {
    "&:hover ": {
      cursor: "pointer",
      backgroundColor: paperBackGroundColor,
    },
  },
  descriptionContainer: {
    width: "700px",
    overflow: "auto",
    "&:hover ": {
      cursor: "pointer",
      backgroundColor: paperBackGroundColor,
    },
  },
}));
