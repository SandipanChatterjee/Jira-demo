import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  active: {
    border: "2px solid blue",
  },
  inactive: {
    border: "none",
  },
  text: {
    textTransform: "capitalize",
  },
  button: {},
}));
