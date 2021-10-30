import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { paperBackGroundColor } from "../../utils/globalStyles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    zIndex: -1,
    marginLeft: "1rem",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: paperBackGroundColor,
    padding: "1rem",
  },
  listItem: {
    marginBottom: "1rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  listItemProjectSettings: {
    marginBottom: "1rem",
    "&:hover": {
      cursor: "not-allowed",
    },
  },

  "@media (max-width:768px)": {
    root: {
      display: "none",
    },
  },
}));

const routes = [
  { route: "/project/board", title: "Kanban Board" },
  { route: "/project/settings", title: "Project Settings" },
];

const Navbar = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const routeHandler = (el, index) => {
    setSelectedIndex(index);
    props.history.push(el.route);
  };
  useEffect(() => {
    const index = routes.findIndex((el) => el.route === location.pathname);
    setSelectedIndex(index);
  }, [location.pathname]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {routes.map((el, index) => (
            <ListItem
              button
              key={index}
              selected={selectedIndex === index}
              onClick={() => routeHandler(el, index)}
              className={classes.listItem}
            >
              <ListItemText primary={el.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default withRouter(Navbar);
