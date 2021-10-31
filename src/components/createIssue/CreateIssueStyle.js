import { makeStyles } from "@material-ui/core/styles";
import {
  primaryButtonColor,
  primaryButtonWidth,
} from "../../utils/globalStyles";
export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
  },
  btn: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  btnContent: {
    display: "flex",
  },
  btnText: {
    marginLeft: "5px",
    fontSize: "12px",
    marginTop: "auto",
    marginBottom: "auto",
  },
  icon: {
    marginTop: "auto",
    marginBottom: "auto",
    marginTop: "4px",
  },
  textField: {
    width: "100%",
  },
  errorText: {
    color: "#E53C3C",
    fontSize: "12px",
    lineHeight: "0",
    margin: "0",
    padding: "0",
  },
  "@media (max-width:768px)": {
    root: {
      "& br": {
        display: "none",
      },
    },
    button: {
      marginBottom: ".5rem",
      width: "auto",
      maxWidth: "200px",
      justifyContent: "flex-start",
    },
    btnText: {
      fontSize: ".6rem",
    },
  },
}));
