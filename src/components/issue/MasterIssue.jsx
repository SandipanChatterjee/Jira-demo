import { Card, Grid, Paper } from "@material-ui/core";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  backlog,
  changeIssueStatus,
  completed,
  inprogress,
  selected,
} from "../../actions/issues";
import { updateIssueList } from "../../services/updateIssueList";
import { issueStatus, move, reorder } from "../../utils/utils";
import Header from "../shared/Header";
import { useStyles } from "./style";

const MasterIssue = ({ searchedData }) => {
  console.log("searchedData##", searchedData);
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

  const searchText = useSelector((state) => state.searchReducer.searchValue);

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
      console.log("dInd#", result[dInd]);

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
  const list = [];

  searchText.length > 0
    ? searchedData && searchedData.length > 0
      ? list.push(...searchedData)
      : list.push(...issueTypes)
    : list.push(...issueTypes);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container className="root" spacing={2}>
          <Grid item xs={12}>
            <Grid className={classes.girdDisplay}>
              {list.length > 0
                ? list.map((issueType, index) => {
                    // console.log("issueType#", issueType);
                    return (
                      <Droppable droppableId={`${index}`} key={index}>
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
                                <span>
                                  {Object.keys(issueStatus)[
                                    index
                                  ].toUpperCase()}
                                </span>
                                {issueType.map((issue, index) => {
                                  // console.log("issue#", issue);
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
                                            <p>{issue.title}</p>
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
                  })
                : null}
            </Grid>
          </Grid>
        </Grid>
      </DragDropContext>
    </div>
  );
};

export default MasterIssue;
