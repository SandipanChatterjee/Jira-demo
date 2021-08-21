import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  active: {
    border: "1px solid blue",
    padding: ".2rem",
    borderRadius: "50%",
  },
  inactive: {
    border: "none",
  },
  text: {
    textTransform: "capitalize",
  },
  button: {},
}));
