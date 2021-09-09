import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { paperBackGroundColor } from "../../utils/globalStyles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  },
}));

const routes = [
  { route: "/project/board", title: "Kanban Board" },
  { route: "/project/settings", title: "Project Settings" },
];

const Navbar = (props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const routeHandler = (el, index) => {
    setSelectedIndex(index);
    props.history.push(el.route);
  };
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
