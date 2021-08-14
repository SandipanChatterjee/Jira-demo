import React, { useEffect } from "react";
import { Grid, Paper, Card } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setIssueTypes } from "../../actions/issues";
import { useStyles } from "./style";
import Header from "../shared/Header";

const Issue = ({ issues }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const backlogIssue = useSelector((state) => state.issueReducer.backlogIssues);
  const inprogressIssues = useSelector(
    (state) => state.issueReducer.inprogressIssues
  );
  const completedIssues = useSelector(
    (state) => state.issueReducer.completedIssues
  );
  const selectedIssue = useSelector(
    (state) => state.issueReducer.selectedIssue
  );
  useEffect(() => {
    console.log("issues#", issues);
    dispatch(setIssueTypes(issues));
  }, []);
  return (
    <div>
      <Header
        name={"Kanban board"}
        title={"Projects / singularity 1.0 vv2 / Kanban Board"}
      />
      <Grid container className="root" spacing={2}>
        <Grid item xs={12}>
          <Grid spacing={2} className={classes.girdDisplay}>
            <Grid container key={0} alignItems="stretch">
              <Paper className={classes.paper}>
                {backlogIssue.map((issue) => {
                  return (
                    <Card className={classes.cardDisplay}>
                      <p>
                        <b>{issue.title}</b>
                      </p>
                    </Card>
                  );
                })}
              </Paper>
            </Grid>
            <Grid container key={1} alignItems="stretch">
              <Paper className={classes.paper}>
                {selectedIssue.map((issue) => {
                  return (
                    <Card className={classes.cardDisplay}>
                      <p>
                        <b>{issue.title}</b>
                      </p>
                    </Card>
                  );
                })}
              </Paper>
            </Grid>
            <Grid container key={2} alignItems="stretch">
              <Paper className={classes.paper}>
                {inprogressIssues.map((issue) => {
                  return (
                    <Card className={classes.cardDisplay}>
                      <p>
                        <b>{issue.title}</b>
                      </p>
                    </Card>
                  );
                })}
              </Paper>
            </Grid>
            <Grid container key={3} alignItems="stretch">
              <Paper className={classes.paper}>
                {completedIssues.map((issue) => {
                  return (
                    <Card className={classes.cardDisplay}>
                      <p>
                        <b>{issue.title}</b>
                      </p>
                    </Card>
                  );
                })}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Issue;
