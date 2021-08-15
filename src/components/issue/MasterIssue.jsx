import React, { useEffect, useState } from "react";
import { Grid, Paper, Card } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  backlog,
  selected,
  inprogress,
  completed,
  setIssueTypes,
} from "../../actions/issues";
import { useStyles } from "./style";
import { move, reorder, issueStatus } from "../../utils/utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Header from "../shared/Header";
import { updateIssueList } from "../../services/updateIssueList";

const MasterIssue = ({ issues }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const backlogIssues = useSelector(
    (state) => state.issueReducer.backlogIssues
  );
  const selectedIssues = useSelector(
    (state) => state.issueReducer.selectedIssue
  );
  const inprogressIssues = useSelector(
    (state) => state.issueReducer.inprogressIssues
  );
  const completedIssues = useSelector(
    (state) => state.issueReducer.completedIssues
  );

  const issueTypes = [
    backlogIssues,
    selectedIssues,
    inprogressIssues,
    completedIssues,
  ];

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result, source, destination);
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      console.log(issueTypes[sInd], sInd);
      const items = reorder(issueTypes[sInd], source.index, destination.index);
      const dispatchArr = [
        () => dispatch(backlog(items)),
        () => dispatch(selected(items)),
        () => dispatch(inprogress(items)),
        () => dispatch(completed(items)),
      ];
      dispatchArr[sInd]();
    } else {
      const result = move(
        issueTypes[sInd],
        issueTypes[dInd],
        source,
        destination
      );
      const dispatchArrForStartIndex = [
        () => dispatch(backlog(result[sInd])),
        () => dispatch(selected(result[sInd])),
        () => dispatch(inprogress(result[sInd])),
        () => dispatch(completed(result[sInd])),
      ];
      const dispatchArrForEndIndex = [
        () => dispatch(backlog(result[dInd])),
        () => dispatch(selected(result[dInd])),
        () => dispatch(inprogress(result[dInd])),
        () => dispatch(completed(result[dInd])),
      ];
      dispatchArrForStartIndex[sInd]();
      dispatchArrForEndIndex[dInd]();
    }

    const payload = {
      listPosition: destination.index,
      status: Object.keys(issueStatus)[parseInt(destination.droppableId)],
    };
    console.log(payload);
    updateIssueList(payload, parseInt(result.draggableId));
  };

  useEffect(() => {
    dispatch(setIssueTypes(issues));
  }, []);

  return (
    <div>
      <Header
        name={"Kanban board"}
        title={"Projects / singularity 1.0 vv2 / Kanban Board"}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container className="root" spacing={2}>
          <Grid item xs={12}>
            <Grid className={classes.girdDisplay}>
              {issueTypes.map((issueType, index) => {
                return (
                  <Droppable droppableId={`${index}`}>
                    {(provided, snapshot) => {
                      return (
                        <Grid
                          container
                          key={0}
                          alignItems="stretch"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <Paper className={classes.paper}>
                            {issueType.map((issue, index) => {
                              const id = issue.id.toString();
                              return (
                                <Draggable
                                  key={id}
                                  draggableId={id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <Card
                                        className={classes.cardDisplay}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <p>
                                          <b>{issue.title}</b>
                                        </p>
                                      </Card>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          </Paper>
                          {provided.placeholder}
                        </Grid>
                      );
                    }}
                  </Droppable>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </DragDropContext>
    </div>
  );
};

export default MasterIssue;
