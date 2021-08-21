import { makeStyles } from "@material-ui/core/styles";

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
    position: "absolute",
    width: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    height: "100%",
    overflow: "scroll",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  commentsContainer: {
    display: "flex",
  },
  avatar: {
    marginRight: "20px",
  },
}));
